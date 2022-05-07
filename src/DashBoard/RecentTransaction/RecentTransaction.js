import React from "react";
import { Box, Divider, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import RecentTransactionCard from "./RecentTransactionCard";

function RecentTransaction({ account }) {
  console.log(account);
  return (
    <Box>
      <Typography>Recent Transaction</Typography>
      <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <RecentTransactionCard
          transaction={
            account.sendReceiverHistories[
              account.sendReceiverHistories.length - 1
            ]
          }
          accountName={account.name + " " + account.lastName}
        />
        <Box sx={{ mt: 2, mb: 2 }} />
        <Divider light sx={{ width: "80%" }} />
        <Box sx={{ mt: 2, mb: 2 }} />
        <RecentTransactionCard
          transaction={
            account.sendReceiverHistories[
              account.sendReceiverHistories.length - 2
            ]
          }
          accountName={account.name + " " + account.lastName}
        />
        <Box sx={{ mt: 2, mb: 2 }} />
        <Divider light sx={{ width: "80%" }} />
        <Box sx={{ mt: -1, mb: 2 }} />
        <Button component={Link} to="/DashBoard/TransactionHistory">
          {" "}
          <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            +{" "}
          </span>{" "}
          View All
        </Button>
      </Box>
    </Box>
  );
}

export default RecentTransaction;
