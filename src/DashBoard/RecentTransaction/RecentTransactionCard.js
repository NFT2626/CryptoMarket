//importing libraries
import React from "react";
import "./RecentTransactionCard.css";
import { Avatar, Box, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

//this is responsible for displaying the row of each of the recentTransactionTable 

function RecentTransactionCard({ transaction, accountName }) {
  if (!transaction) { //if the transaction details do not exist return nothing
    return <div></div>;
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        className="card-border--rounded"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Avatar //the image of the user
          className="avatar-responsive"
          src="/Images/default_profile.png"
        />
        <Typography className="text-margin">
          {" "}
          {transaction.quantity} {transaction.name}
        </Typography>
      </Box>
      <ArrowForwardIcon
        sx={{
          transform: `translateY(1.5rem) ${ accountName !== transaction.sender ? "rotate(-180deg)" : ""}`,
          color: accountName === transaction.sender ? "red" : "green",
        }} //if the accountName is the same as the transacting sender display red else display green
      />
      <Box
        className="card-border--rounded"
        sx={{ display: "flex", alignItems: "center", mr: 1 }}
      >
        <Avatar
          className="avatar-responsive"
          src="/Images/default_profile.png" //image of the receiver
        />
        <Typography className="text-margin">
          {" "}
          {accountName === transaction.sender //if the accountName is the sender then the other side is the receiver else the other side would just be sender
            ? transaction.receiver
            : transaction.sender}
        </Typography>
      </Box>
    </Box>
  );
}

export default RecentTransactionCard;
