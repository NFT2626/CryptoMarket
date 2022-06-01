//importing Libraries
import React from "react";
import { Box, Divider, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
//importing components
import RecentTransactionCard from "./RecentTransactionCard";

//this component is responsible for displaying the recent transactions the user has made to different Users 
//this component is a short showcase of the recent transactions

function RecentTransaction({ account }) {
  return (
    <Box style={{padding: 10}}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom //title of the card
      >Recent Transaction</Typography>
      <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <RecentTransactionCard
          transaction={
            account.sendReceiverHistories[ //gets the last transaction AKA the recent transaction
              account.sendReceiverHistories.length - 1
            ]
          }
          accountName={account.name + " " + account.lastName //the name and lastname of the user
        }
        />
        <Box sx={{ mt: 2, mb: 2 }} />
        <Divider light sx={{ width: "80%" }} />
        <Box sx={{ mt: 2, mb: 2 }} />
        <RecentTransactionCard
          transaction={
            account.sendReceiverHistories[ //the second most recent user 
              account.sendReceiverHistories.length - 2
            ]
          }
          accountName={account.name + " " + account.lastName //name of the user
        }
        />
        <Box sx={{ mt: 2, mb: 2 }} />
        <Divider light sx={{ width: "80%" }} />
        <Box sx={{ mt: -1, mb: 2 }} />
        <Button component={Link} to="/DashBoard/TransactionHistory" //if clicked directs to the TransactionHistory page
        >
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
