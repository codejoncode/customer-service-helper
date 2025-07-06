import { render, screen, fireEvent } from "@testing-library/react";
import { VerificationModal } from "./VerificationModal";
import userEvent from "@testing-library/user-event";

const mockUseNavigate = jest.fn();
// ✅ Use Jest mocking here
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

const mockSetMember = jest.fn();

jest.mock("../hooks/CallSessionState", () => ({
  useCallSession: () => ({
    member: {
      name: "John Doe",
      dob: "01/15/1982",
      phone: "555-123-9876",
      zipcode: "60610",
    },
    verify: mockSetMember,
  }),
}));

describe("VerificationModal", () => {
  it("validates correct name and shows next step", () => {
    render(<VerificationModal open={true} onClose={() => {}} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "John Doe" },
    });
    fireEvent.click(screen.getByText("Continue"));
    expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
  });

  it("rejects incorrect name", () => {
    render(<VerificationModal open={true} onClose={() => {}} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Wrong Name" },
    });
    fireEvent.click(screen.getByText("Continue"));
    expect(screen.getByText(/does not match/i)).toBeInTheDocument();
  });

  it("shows an error and blocks progression if input is empty", async () => {
    render(<VerificationModal open={true} onClose={() => {}} />);
    const user = userEvent.setup();

    // Step 1: Try to click Continue without entering a name
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByText(/please enter a response/i)
    ).toBeInTheDocument();

    // Confirm input is still visible (didn't advance to DOB)
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
  });
  it("rejects partial matches for name step", async () => {
    render(<VerificationModal open={true} onClose={() => {}} />);// modal open with member.name = "Jane Doe"
    const user = userEvent.setup();

    await user.type(screen.getByTestId("name-input"), "Doe");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(await screen.findByText(/does not match/i)).toBeInTheDocument();
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
  });
});
