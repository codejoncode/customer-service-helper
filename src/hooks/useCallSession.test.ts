import { act } from "react";
import { renderHook } from "@testing-library/react";
import { useCallSession } from "./CallSessionState";

describe("useCallSession", () => {
  it("sets member correctly", () => {
    const { result } = renderHook(() => useCallSession());
    const mockMember = { memberId: "123", name: "Test" } as any;

    act(() => result.current.setMember(mockMember));
    expect(result.current.member).toEqual(mockMember);
  });

  it("marks as verified", () => {
    const { result } = renderHook(() => useCallSession());

    act(() => result.current.verify());
    expect(result.current.isVerified).toBe(true);
  });
  it("does not mark as verified if member is undefined", () => {
    const { result } = renderHook(() => useCallSession());

    act(() => {
      result.current.reset(); // ensure member is undefined
      result.current.verify();
    });

    expect(result.current.isVerified).toBe(false);
  });
  it("resets session state", () => {
    const { result } = renderHook(() => useCallSession());

    act(() => {
      result.current.setMember({ memberId: "1" } as any);
      result.current.verify();
      result.current.reset();
    });

    expect(result.current.member).toBeUndefined();
    expect(result.current.isVerified).toBe(false);
  });
  it("resets all state after multiple updates", () => {
    const { result } = renderHook(() => useCallSession());

    act(() => {
      result.current.setMember({ memberId: "A", name: "Alice" } as any);
      result.current.verify();
      result.current.setMember({ memberId: "B", name: "Bob" } as any);
      result.current.verify();
      result.current.reset(); // 🔄 reset everything
    });

    expect(result.current.member).toBeUndefined();
    expect(result.current.isVerified).toBe(false);
  });
});
