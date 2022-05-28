//importing libraries
import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
//importing css
import "./TopSection.css";
//This is the hero section that tries to make it look very authentic for when to user is first at the landing page


const TopSection = () => {
  let navigate = useNavigate();  //allows the user to navigate to a different page 

  return (
    <div>
      <Box className="video-container"> {/* Container to display the video*/}
        <video
          src="/videos/Video1.mp4" //This is where it it displays the video
          className="filter" 
          autoPlay //automatically without click play the video
          loop //loop the video
          muted // no sound
        />
        <Typography variant="h2" className="header-text"> {/*Text to bring out context*/}
          Begin your journey with crypto now
        </Typography>
    
        <Button //Button where the user is directed to the sign up page
        onClick={() => { //event listener that listens to when the user clicks on this button
          navigate("/SignUp"); //Redirects to the sign up page
         
       
        }}
          className="explore-button" // class css 
          style={{ marginTop: 10, backgroundColor: 'orange', color: "white" }} //css
          variant="contained" //css
          disableElevation //css
        >
          {" "}
          Register Now {/*Text to bring context*/}
        </Button>
      </Box>
    </div>
  );
};

export default TopSection; //export it so that it can be used by other components
