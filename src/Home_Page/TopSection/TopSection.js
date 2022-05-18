import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import "./TopSection.css";
import { useNavigate } from "react-router-dom";

const TopSection = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Box className="video-container">
        <video
          src="/videos/Video1.mp4"
          className="filter"
          autoPlay
          loop
          muted
        />
        <Typography variant="h2" className="header-text">
          Begin your journey with crypto now
        </Typography>
    
        <Button
        onClick={() => {
          navigate("/SignUp");
        }}
          className="explore-button"
          style={{ marginTop: 10, backgroundColor: 'orange', color: "white" }}
          variant="contained"
          disableElevation
        >
          {" "}
          Register Now
        </Button>
      </Box>
    </div>
  );
};

export default TopSection;
