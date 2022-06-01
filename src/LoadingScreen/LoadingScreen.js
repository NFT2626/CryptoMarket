//importing css
import "./LoadingScreen.css";
//importing libraries
import React from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

//this component is responsible for displaying the loading screen 
function LoadingScreen() {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50vh',

      }}
    >
      <Typography variant="h4" style={{ transform: "TranslateY(-10rem) TranslateX(6.5rem)", }} //loading
      >
        Loading
      </Typography>
      <CircularProgress //the circle 
        size={80}
        thickness={4}
        style={{color: "orange"}}
      />
    </Box>
  );
}

export default LoadingScreen;
