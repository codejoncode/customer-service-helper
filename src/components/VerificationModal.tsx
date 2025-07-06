import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  DialogProps,
} from "@mui/material";
import { useCallSession } from "../hooks/CallSessionState";
import { useNavigate } from "react-router-dom"; // at top of file

export interface VerificationModalProps {
  open: boolean;
  onClose: (event: object, reason: string) => void;
  disablePortal?: boolean;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  open,
  onClose,
  disablePortal,
}) => {
  const { member, verify } = useCallSession();
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  if (!member) return null;

  const steps = [
    {
      label: "Please enter caller's full name",
      field: "name",
      actual: member.name,
    },
    {
      label: "Please enter caller's Date of Birth (MM/DD/YYYY)",
      field: "dob",
      actual: member.dob,
    },
    {
      label: "Please enter Phone or ZIP code",
      field: "phoneOrZip",
      actuals: [member.phone, member.zipcode],
    },
  ];

  const current = steps[step];

  const isMatch = (input: string, expected: string) =>
    input.trim().toLowerCase() === expected.trim().toLowerCase();

  const isPhoneOrZipValid = (input: string) =>
    [member.phone, member.zipcode].some((val) => isMatch(input, val));

  const navigate = useNavigate(); // inside component

  const handleNext = () => {
    let valid = false;

    if (!input.trim()) {
      setError("Please enter a response.");
      return;
    }

    if (step === 2) {
      valid = [member.phone, member.zipcode].some(
        (val) => input.trim().toLowerCase() === val.trim().toLowerCase()
      );
    } else {
      const expected = current.actual ?? "";
      valid = input.trim().toLowerCase() === expected.trim().toLowerCase();
    }

    if (valid) {
      setError("");
      setInput("");
      if (step === steps.length - 1) {
        verify(); // ✅ mark session as verified
        onClose({}, "manual"); // ✅ close modal
        navigate("/assistant"); // ✅ go to assistant flow
      } else {
        setStep(step + 1);
      }
    } else {
      setError("That does not match our records.");
    }
  };
  const { reset } = useCallSession();

  const handleCancel = (e: React.MouseEvent) => {
    reset();
    onClose(e, "cancelButton");
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      disablePortal={disablePortal}
      disableEscapeKeyDown={false}
      data-testid="verification-modal"
    >
      <DialogTitle>Caller Verification</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {current.label}
        </Typography>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={!!error}
          helperText={error}
          slotProps={{
            htmlInput: {
              "data-testid":
                current.field === "dob"
                  ? "dob-input"
                  : current.field === "name"
                    ? "name-input"
                    : current.field === "phoneOrZip"
                      ? "phone-input"
                      : undefined,
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleNext} variant="contained">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
