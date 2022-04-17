import React, { useState } from "react";

import { Box, Tabs, Tab } from "@material-ui/core";
import TransactionHistoryTable from "./TransactionHistoryTable";

function HistorySection({ account }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box style={{ position: "fixed" }}>
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

      <TransactionHistoryTable data={account.transactionHistory} idx={value} />
    </Box>
  );
}

export default HistorySection;
