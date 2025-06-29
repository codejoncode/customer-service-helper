import { useNavigate } from "react-router-dom";

describe("React Router DOM Import", () => {
  it("should import useNavigate without crashing", () => {
    expect(typeof useNavigate).toBe("function");
  });
});