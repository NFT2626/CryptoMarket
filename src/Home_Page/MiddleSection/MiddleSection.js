//Importing libraries
import React from "react";
import { Typography, Box } from "@material-ui/core";
//importing components
import WhyCard from "./WhyCard/WhyCard";
//Importing css
import "./MiddleSection.css";

//This is the middle section of the home page, this is where it showcases the 
// features of the application as well as promoting it 
const MiddleSection = () => {
  return (
    <section className="middlesection-canvas"> {/*allocate a section for the home page*/}
      <Typography variant="h3" className="middlesection-h1"> {/*text that displays the title for the section*/}
        What makes us better
      </Typography>
      <Box
        className="touch-container" //css
        sx={{
          display: "flex", //css
          flexDirection: "row",
          minWidth: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WhyCard //this is a component that takes image and content as its parameters to remove repetition for the code, this displays a card that describes the application
          image="Careers" //Describing that the application is able to enhance career opportunities
          content="Start building your career through expanding your portfolio." 
        />
        <WhyCard
          image="Community" //Describes that it promotes community discussion
          content="CrySim is global, get access to a world wide community and discuss."
        />
        <WhyCard
          image="CryptoMarket" //Describes that it provides alot of coins
          content="Get access to hundreds of coins to play with"
        />
        <WhyCard image="Support" content="24/7 support and assistance." //Describes that there will be alot of support
         /> 
      </Box>
    </section>
  );
};

export default MiddleSection; //importing the component
