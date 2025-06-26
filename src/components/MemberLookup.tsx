import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { memberDB } from "../data/members";
import { useCallSession } from "../hooks/CallSessionState";
import { VerificationModal } from "./VerificationModal";

const MemberLookup: React.FC = () => {
  const [inputId, setInputId] = useState("");
  const [error, setError] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const { setMember } = useCallSession();

  const handleLookup = () => {
    const found = memberDB.find(
      (m) => m.memberId.toLowerCase() === inputId.trim().toLowerCase()
    );
    if (found) {
      setMember(found);
      setShowVerify(true);
      setError("");
    } else {
      setError("Member ID not found.");
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        🏥 Start Call — Member Verification
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        “Thank you for calling ABC Medical. My name is Jonathan. May I have your member ID number?”
      </Typography>

      <TextField
        fullWidth
        label="Enter Member ID"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={handleLookup}>
        Look Up Member
      </Button>

      <VerificationModal open={showVerify} onClose={() => setShowVerify(false)} />
    </Paper>
  );
};

export default MemberLookup;