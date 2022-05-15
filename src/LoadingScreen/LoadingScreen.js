import "./LoadingScreen.css";

import React from "react";
import Typography from "@mui/material/Typography";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LoadingScreen() {
  return (
    <Box
      style={{
        marginTop: "50vh",
        marginLeft: "50vw",
      }}
    >
      <Typography variant="h4" style={{ transform: "TranslateY(-5rem)" }}>
        Loading
      </Typography>
      <CircularProgress
        size={80}
        thickness={4}
        style={{ transform: "TranslateY(-3rem)" }}
      />
    </Box>
  );
}

export default LoadingScreen;
