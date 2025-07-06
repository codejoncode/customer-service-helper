import { render, screen, fireEvent } from "@testing-library/react";
import MemberLookup from "./MemberLookup";
import { jest } from "@jest/globals"; // optional in CRA
import { memberDB } from "../data/members";

const mockUseNavigate = jest.fn();
const mockSetMember = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate,
}));

jest.mock("../hooks/CallSessionState", () => ({
  useCallSession: () => ({
    setMember: mockSetMember,
  }),
}));

describe("MemberLookup", () => {
  it("displays error for invalid ID", () => {
    render(<MemberLookup />);
    fireEvent.change(screen.getByLabelText(/member id/i), {
      target: { value: "INVALID" },
    });
    fireEvent.click(screen.getByText(/look up member/i));
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it("opens modal for valid ID", () => {
    render(<MemberLookup />);
    fireEvent.change(screen.getByLabelText(/member id/i), {
      target: { value: memberDB[0].memberId },
    });
    fireEvent.click(screen.getByText(/look up member/i));
    // (match real heading)
    expect(
      screen.getByText(/start call.*member verification/i)
    ).toBeInTheDocument();
  });
  it("renders the initial prompt", () => {
    render(<MemberLookup />);
    expect(screen.getByLabelText(/member id/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /look up member/i })
    ).toBeInTheDocument();
  });
  it("does not call setMember if input is blank", () => {
    render(<MemberLookup />);
    fireEvent.click(screen.getByText(/look up member/i));
    expect(mockSetMember).not.toHaveBeenCalled();
    expect(screen.getByText(/member id not found/i)).toBeInTheDocument();
  });
});
