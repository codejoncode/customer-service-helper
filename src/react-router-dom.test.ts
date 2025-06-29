import { useNavigate } from "react-router-dom";

describe("React Router test", () => {
  it("should import useNavigate", () => {
    expect(typeof useNavigate).toBe("function");
  });
});