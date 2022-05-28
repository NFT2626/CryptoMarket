//importing libraries
import React from "react";
import { Box, Typography, Button } from "@material-ui/core";

//This is the final section of the home page 
//when the user scrolls down to the page, instead of having to scroll up
//they can click the button that is at the bottom of the page

const FinalSection = () => {
  return (
    <Box //specifies a fancy div
      sx={{
        backgroundColor: "rgb(250,250,250)", //css
        padding: "3rem",
        display: "flex",
        flexDirection: "column"
      }}
      fullWidth //css
    >
      <Typography style={{ margin: "0 auto" }} //css
       variant="h4" //specifies that it is an h4
       >
        Start your journey now {/* The title of the section */}
      </Typography>

      <Button //the button component
        style={{ //css
          margin: "0 auto",
          marginTop: "2.5rem",
          padding: "1rem",
          width: "30%",
          backgroundColor: "rgb(52,162,235)",
          color: 'white'
        }}
      >
        {" "} 
        Sign Up Now{" "} {/* the label for the button*/}
      </Button>
    </Box>
  );
};

export default FinalSection;
