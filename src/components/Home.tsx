import React from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/assistant"); // change to your workflow route
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          🛠 Customer Service Helper
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          A streamlined assistant for customer service reps to manage support calls, check mandatory statements, and auto-generate documentation.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🚀 Features:
          </Typography>
          <ul style={{ marginLeft: 16 }}>
            <li>Select a reason for the customer’s call</li>
            <li>Check off all required talking points</li>
            <li>Generate and copy documentation automatically</li>
          </ul>
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Paper>
    </Container>
  );
};

export default Home;