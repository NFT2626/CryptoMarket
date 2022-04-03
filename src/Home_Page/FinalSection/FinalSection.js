import React from "react";
import { Box, Typography, Button } from "@material-ui/core";

const FinalSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(250,250,250)",
        padding: "3rem",
        display: "flex",
        flexDirection: "column"
      }}
      fullWidth
    >
      <Typography style={{ margin: "0 auto" }} variant="h4">
        Start your journey now
      </Typography>

      <Button
        style={{
          margin: "0 auto",
          marginTop: "2.5rem",
          padding: "1rem",
          width: "30%",
          backgroundColor: "rgb(52,162,235)",
          color: 'white'
        }}
      >
        {" "}
        Sign Up Now{" "}
      </Button>
    </Box>
  );
};

export default FinalSection;
