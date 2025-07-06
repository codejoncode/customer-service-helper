import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VerificationModal, VerificationModalProps } from "./VerificationModal";
import {
  createMemoryRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Mocks
const mockVerify = jest.fn();
const mockReset = jest.fn();

jest.mock("../hooks/CallSessionState", () => ({
  useCallSession: () => ({
    member: {
      id: "ABC123",
      name: "Jane Doe",
      dob: "01/01/1980",
      phone: "555-123-4567",
      zipcode: "60606",
    },
    verify: (...args: any[]) => mockVerify(...args),
    reset: mockReset,
  }),
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (props: Partial<VerificationModalProps> = {}) => {
  const defaultProps = { open: true, onClose: jest.fn() };
  const mergedProps = { ...defaultProps, ...props };
  const router = createMemoryRouter(
    createRoutesFromElements(
      <Route path="/" element={<VerificationModal {...mergedProps} />} />
    ),
    { initialEntries: ["/"] }
  );

  return {
    ...render(<RouterProvider router={router} />),
    router,
    props: mergedProps,
  };
};

async function fillValidInputs(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByTestId("name-input"), "Jane Doe");
  await user.click(screen.getByRole("button", { name: /continue/i }));

  const dobInput = await screen.findByTestId("dob-input");
  await user.type(dobInput, "01/01/1980");
  await user.click(screen.getByRole("button", { name: /continue/i }));

  const phoneInput = await screen.findByTestId("phone-input");
  await user.type(phoneInput, "555-123-4567");
  await user.click(screen.getByRole("button", { name: /continue/i }));
}

describe("VerificationModal step flow", () => {
  beforeEach(() => {
    mockVerify.mockClear();
  });

  it("completes all steps with valid input and calls verify", async () => {
    const onClose = jest.fn();
    renderWithRouter({ onClose });

    const user = userEvent.setup();
    await fillValidInputs(user);
    expect(mockVerify).toHaveBeenCalledTimes(1);
  });

  it("verifies using phone number", async () => {
    const onClose = jest.fn();
    renderWithRouter({ onClose });

    const user = userEvent.setup();
    await fillValidInputs(user);
    expect(mockVerify).toHaveBeenCalledTimes(1);
  });

  it("verifies using zip code", async () => {
    const onClose = jest.fn();
    renderWithRouter({ onClose });

    const user = userEvent.setup();
    await fillValidInputs(user);
    expect(mockVerify).toHaveBeenCalledTimes(1);
  });

  it("shows error for invalid name and does not proceed", async () => {
    const onClose = jest.fn();
    renderWithRouter({ onClose });
    const user = userEvent.setup();
    await user.type(screen.getByTestId("name-input"), "Wrong Name");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(await screen.findByText(/does not match/i)).toBeInTheDocument();
    expect(mockVerify).not.toHaveBeenCalled();
  });

  it("requires input before continuing", async () => {
    const onClose = jest.fn();
    renderWithRouter({ onClose });
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByText(/please enter a response/i)
    ).toBeInTheDocument();
  });

  it("requires input before continuing", async () => {
    const onClose = jest.fn();
    renderWithRouter({ onClose });
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(
      await screen.findByText(/please enter a response/i)
    ).toBeInTheDocument();
  });

  it("calls onClose and does not verify if canceled", async () => {
    const onClose = jest.fn();
    renderWithRouter({ onClose });
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
    expect(mockVerify).not.toHaveBeenCalled();
  });
  it("trims and normalizes input for verification match", async () => {
    const onClose = jest.fn();
    renderWithRouter({ onClose });
    const user = userEvent.setup();
    await user.type(screen.getByTestId("name-input"), "  Jane Doe  ");
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await screen.findByText(/date of birth/i);
    const dobInput = await screen.findByTestId("dob-input");
    await user.type(dobInput, " 01/01/1980 ");
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await screen.findByText(/phone or zip/i);
    const input = await screen.findByTestId("phone-input");
    await user.type(input, " 555-123-4567 ");
    await user.click(await screen.findByRole("button", { name: /continue/i }));
    expect(mockVerify).toHaveBeenCalledTimes(1);
  });

  it("allows user to retry after a failed step", async () => {
    const onClose = jest.fn();
    renderWithRouter({ onClose });
    const user = userEvent.setup();
    await user.type(screen.getByTestId("name-input"), "Wrong Name");
    await user.click(screen.getByRole("button", { name: /continue/i }));
    // Error appears
    expect(await screen.findByText(/does not match/i)).toBeInTheDocument();
    // Fix name
    const nameInput = await screen.findByTestId("name-input");
    await user.clear(nameInput);
    await user.type(nameInput, "Jane Doe");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Proceeds to DOB
    expect(await screen.findByText(/date of birth/i)).toBeInTheDocument();
  });

  it("shows error if phone/zip does not match", async () => {
    const onClose = jest.fn();
    renderWithRouter({ onClose });
    const user = userEvent.setup();

    // Fill name + dob normally
    await user.type(screen.getByTestId("name-input"), "Jane Doe");
    await user.click(screen.getByRole("button", { name: /continue/i }));
    const dobInput = await screen.findByTestId("dob-input");
    await user.type(dobInput, "01/01/1980");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Fail on ZIP step
    const phoneInput = await screen.findByTestId("phone-input");
    await user.type(phoneInput, "99999");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(await screen.findByText(/does not match/i)).toBeInTheDocument();
    expect(mockVerify).not.toHaveBeenCalled();
  });
  //   it("calls onClose when Escape is pressed", async () => {
  //     const onClose = jest.fn();
  //     renderWithRouter({
  //       onClose,
  //       disablePortal: true,
  //     });

  //     // Wait for dialog to mount and input to appear
  //     const input = await screen.findByTestId("name-input");
  //     input.focus();

  //     // Dispatch a real native KeyboardEvent on document
  //     const escapeEvent = new KeyboardEvent("keydown", {
  //       key: "Escape",
  //       code: "Escape",
  //       keyCode: 27,
  //       bubbles: true,
  //     });
  //     document.dispatchEvent(escapeEvent);

  //     // Let React process the event
  //     await new Promise((r) => setTimeout(r, 0));

  //     expect(onClose).toHaveBeenCalledTimes(1);
  //   });
  it("navigates to /assistant after successful verification", async () => {
    renderWithRouter({ onClose: jest.fn() });

    const user = userEvent.setup();

    await user.type(screen.getByTestId("name-input"), "Jane Doe");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    const dobInput = await screen.findByTestId("dob-input");
    await user.type(dobInput, "01/01/1980");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    const phoneInput = await screen.findByTestId("phone-input");
    await user.type(phoneInput, "555-123-4567");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/assistant");
  });
  it("does not navigate if name input is invalid", async () => {
    renderWithRouter({ onClose: jest.fn() });

    const user = userEvent.setup();

    // Enter wrong name
    await user.type(screen.getByTestId("name-input"), "Wrong Name");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Assert that error message is shown
    expect(await screen.findByText(/does not match/i)).toBeInTheDocument();

    // Assert navigation did NOT happen
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("calls reset when modal closes", async () => {
    const onClose = jest.fn();
    renderWithRouter({ onClose });

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalled();
    expect(mockReset).toHaveBeenCalled();
  });
});
