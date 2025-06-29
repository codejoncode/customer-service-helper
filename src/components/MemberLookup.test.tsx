import { render, screen, fireEvent } from "@testing-library/react";
import MemberLookup from "./MemberLookup";
import { jest } from "@jest/globals"; // optional in CRA
import { memberDB } from "../data/members"

const mockUseNavigate = jest.fn();
const mockSetMember = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockUseNavigate
}));

jest.mock("../hooks/CallSessionState", () => ({
  useCallSession: () => ({
    setMember: mockSetMember
  })
}));

describe("MemberLookup", () => {
  it("displays error for invalid ID", () => {
    render(<MemberLookup />);
    fireEvent.change(screen.getByLabelText(/member id/i), { target: { value: "INVALID" } });
    fireEvent.click(screen.getByText(/look up member/i));
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it("opens modal for valid ID", () => {
    render(<MemberLookup />);
    fireEvent.change(screen.getByLabelText(/member id/i), {
      target: { value: memberDB[0].memberId }
    });
    fireEvent.click(screen.getByText(/look up member/i));
    // (match real heading)
    expect(screen.getByText(/start call.*member verification/i)).toBeInTheDocument();

  });
});