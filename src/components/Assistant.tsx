import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Paper,
} from "@mui/material";
import { knowledgeBase } from "../data/knowledgeBase";
import copy from "copy-to-clipboard";
import ArticleModal from "./ArticleModal";

const Assistant: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const kbEntry = knowledgeBase.find(
    (entry) => entry.reason === selectedReason
  );

  const handleCheckboxChange = (text: string) => {
    setChecked((prev) =>
      prev.includes(text)
        ? prev.filter((item) => item !== text)
        : [...prev, text]
    );
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (kbEntry) {
      const doc = `Call Reason: ${kbEntry.reason}\nActions Taken:\n${checked
        .map((item) => `- ${item}`)
        .join("\n")}`;
      copy(doc);
      setIsCopied(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          🎧 Customer Call Assistant
        </Typography>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select Call Reason</InputLabel>
          <Select
            value={selectedReason}
            label="Select Call Reason"
            onChange={(e) => {
              setSelectedReason(e.target.value);
              setChecked([]);
              setIsCopied(false);
            }}
          >
            {knowledgeBase.map((entry) => (
              <div>
                <MenuItem key={entry.reason} value={entry.reason}>
                    {entry.reason}
                </MenuItem>
                 <Button onClick={() => setModalOpen(true)} sx={{ mb: 2 }}>
                    View Full Article
                </Button>
                <ArticleModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={entry.reason}
                    content={entry.fullArticle}
                    />

              </div>
            ))}
          </Select>
         

        </FormControl>

        {kbEntry && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📋 Required Statements:
            </Typography>
            <FormGroup sx={{ mb: 3 }}>
              {kbEntry.required.map((item, idx) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  }
                  label={item}
                  key={idx}
                />
              ))}
            </FormGroup>

            <Button
              variant="contained"
              color="primary"
              onClick={handleCopy}
              disabled={checked.length !== kbEntry.required.length}
            >
              📎 Copy Documentation
            </Button>

            {isCopied && (
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                ✅ Documentation copied to clipboard!
              </Typography>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Assistant;
