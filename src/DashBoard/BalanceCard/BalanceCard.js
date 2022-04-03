import React from "react";
import { Box, Avatar, Typography } from "@material-ui/core";
import "./BalanceCard.css";

const BalanceCard = ({ image, content, content2 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "20px",
        justifyContent: "space-between"
      }}
    >
      <Avatar
        className="avater-image--size"
        alt="Remy Sharp"
        src="/Images/BitcoinWhite.png"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ml: 2
        }}
      >
        <Typography className="content-text">{content}</Typography>
        <Typography className="content-text--white"> {content2} </Typography>
      </Box>
      <Avatar
        className="avater-image--size"
        alt="Remy Sharp"
        src="/Images/GreyBitcoin.png"
      />
    </Box>
  );
};

export default BalanceCard;
