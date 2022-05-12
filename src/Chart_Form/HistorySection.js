import React, { useState } from "react";

import { Box, Tabs, Tab } from "@material-ui/core";
import TransactionHistoryTable from "./TransactionHistoryTable";
import UserLimitTable from "./UserLimitTable";



function HistorySection({ account,coinName }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Tab label="Open Order" />
        <Tab label="Transaction History" />
      </Tabs>

      <TransactionHistoryTable data={account.transactionHistory.filter((coin) => coin.name === coinName)} idx={value} />
      <UserLimitTable data={account.limitCoins.filter((coin) => coin.name === coinName)} idx={value} /> 
      
    </>
  );
}

export default HistorySection;
