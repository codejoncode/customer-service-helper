import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import MemberLookup from "./MemberLookup";
import userEvent from "@testing-library/user-event";
import { useCallSession } from "../hooks/CallSessionState";
import { MemberProfile } from "../data/members";
import { MemoryRouter } from "react-router-dom";

let member: MemberProfile | undefined = undefined; // 👈 shared across tests
// 🔧 Mocks
const mockSetMember = jest.fn((val) => {
  member = val;
});
const mockUseNavigate = jest.fn();
const mockVerify = jest.fn();
const mockReset = jest.fn();

const mockMember = {
  memberId: "ABC123456",
  name: "Jane Doe",
  dob: "01/01/1980",
  phone: "555-123-4567",
  zipcode: "60606",
  streetAddress: "123 Elm St",
  city: "Chicago",
  state: "IL",
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

jest.mock("../hooks/CallSessionState", () => ({
  useCallSession: () => ({
    setMember: mockSetMember,
    member: mockMember,
    verify: mockVerify,
    reset: mockReset,
  }),
}));

describe("Integration: MemberLookup → VerificationModal", () => {
  beforeEach(() => {
    member = undefined;
    mockSetMember.mockClear();
    mockUseNavigate.mockClear();
    mockVerify.mockClear();
    mockReset.mockClear();
  });

  it("opens modal when valid member ID is entered and clicked", () => {
    render(<MemberLookup />);

    // simulate entering a member ID
    const input = screen.getByLabelText(/enter member id/i);
    fireEvent.change(input, { target: { value: "ABC123456" } });

    // simulate clicking "Look Up Member"
    const button = screen.getByRole("button", { name: /look up member/i });
    fireEvent.click(button);

    // assert modal opens with proper heading
    expect(
      screen.getByText(/start call.*member verification/i)
    ).toBeInTheDocument();

    // assert store was updated
    expect(mockSetMember).toHaveBeenCalledWith(
      expect.objectContaining({ memberId: "ABC123456" })
    );
  });
  it("completes full verification flow and navigates to /assistant", async () => {
    // Inject mock member into memberDB or ensure it's present
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <MemberLookup />
      </MemoryRouter>
    );

    // Step 1: Lookup member ID
    await user.type(screen.getByLabelText(/member id/i), "ABC123456");
    await user.click(screen.getByRole("button", { name: /look up member/i }));

    // Confirm modal opens
    expect(screen.getByTestId("verification-modal")).toBeInTheDocument();

    // Step 2: Name
    await user.type(screen.getByTestId("name-input"), "Jane Doe");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Step 3: DOB
    await user.type(screen.getByTestId("dob-input"), "01/01/1980");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Step 4: Phone or ZIP
    await user.type(screen.getByTestId("phone-input"), "555-123-4567");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Confirm navigation triggered
    expect(mockUseNavigate).toHaveBeenCalledWith("/assistant");
  });

  it("stays in modal and blocks verification on invalid input", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <MemberLookup />
      </MemoryRouter>
    );

    // Step 1: Lookup member ID
    await user.type(screen.getByLabelText(/member id/i), "ABC123456");
    await user.click(screen.getByRole("button", { name: /look up member/i }));

    // Confirm modal opens
    expect(screen.getByTestId("verification-modal")).toBeInTheDocument();

    // Step 2: Incorrect Name
    await user.type(screen.getByTestId("name-input"), "Wrong Name");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Still on step 0 (name), with error visible
    expect(
      await screen.findByText(/does not match our records/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("name-input")).toBeInTheDocument();

    // ⛔ No verify or navigate calls
    expect(mockVerify).not.toHaveBeenCalled();
    expect(mockUseNavigate).not.toHaveBeenCalled();
  });
});
