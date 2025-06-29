import { render, screen, fireEvent } from "@testing-library/react";
import { VerificationModal } from "./VerificationModal";

const mockUseNavigate = jest.fn();
// ✅ Use Jest mocking here
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate
}));

const mockSetMember = jest.fn();

jest.mock("../hooks/CallSessionState", () => ({
  useCallSession: () => ({
    member: {
      name: "John Doe",
      dob: "01/15/1982",
      phone: "555-123-9876",
      zipcode: "60610"
    },
    verify: mockSetMember
  })
}));

describe("VerificationModal", () => {
  it("validates correct name and shows next step", () => {
    render(<VerificationModal open={true} onClose={() => {}} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "John Doe" } });
    fireEvent.click(screen.getByText("Continue"));
    expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
  });

  it("rejects incorrect name", () => {
    render(<VerificationModal open={true} onClose={() => {}} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Wrong Name" } });
    fireEvent.click(screen.getByText("Continue"));
    expect(screen.getByText(/does not match/i)).toBeInTheDocument();
  });
});