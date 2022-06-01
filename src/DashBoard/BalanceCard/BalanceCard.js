//importing libraries
import React from "react";
import { Box, Avatar, Typography } from "@material-ui/core";
//importing css
import "./BalanceCard.css";

//this component is responsible for displaying the different data for the user eg. total asset and bitcoin balance

const BalanceCard = ({ image, content, content2 }) => {
  return (
    <Box //fancy div to make look nicer
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "20px",
        justifyContent: "space-between"
      }}
    >
      <Avatar //the image to represent what units it is trying to represent
        className="avater-image--size"
        alt="money"
        src={`/Images/${image}`} //source URL 
      />
      <Box
        sx={{
          display: "flex", //make look nicer
          flexDirection: "column",
          ml: 2
        }}
      >
        <Typography className="content-text" //the title eg. Total Asset balance
        >
          {content}</Typography>
        <Typography className="content-text--white" //the numeric data to describe the title eg. 0.001 BTC
        > {content2} </Typography>
      </Box>
      <Avatar //the final image that wraps the texts
        className="avater-image--size"
        alt="Money"
        src={`/Images/${image}`}      />
    </Box>
  );
};

export default BalanceCard;
