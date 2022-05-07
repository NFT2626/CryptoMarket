import React from "react";
import "./RecentTransactionCard.css";
import { Avatar, Box, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function RecentTransactionCard({ transaction, accountName }) {
  if (!transaction) {
    return <div></div>;
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        className="card-border--rounded"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Avatar className="avatar-responsive" src="/Images/Face.jpeg" />
        <Typography className="text-margin">
          {" "}
          {transaction.quantity} {transaction.name}
        </Typography>
      </Box>
      <ArrowForwardIcon
        sx={{
          transform: "translateY(1.5rem)",
          color: accountName === transaction.sender ? "red" : "green",
        }}
      />
      <Box
        className="card-border--rounded"
        sx={{ display: "flex", alignItems: "center", mr: 1 }}
      >
        <Avatar className="avatar-responsive" src="/Images/Face.jpeg" />
        <Typography className="text-margin">
          {" "}
          {accountName === transaction.sender
            ? transaction.receiver
            : transaction.sender}
        </Typography>
      </Box>
    </Box>
  );
}

export default RecentTransactionCard;
