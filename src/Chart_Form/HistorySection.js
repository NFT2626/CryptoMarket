//importing libraries
import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
//importing components
import TransactionHistoryTable from "./TransactionHistoryTable";
import UserLimitTable from "./UserLimitTable";
//this is the component that displays the history and the orders for limits for the user 

function HistorySection({ account, coinName }) {
  const [value, setValue] = useState(0); // the index to indicate what tab the user is at to decide whether it is an open order or transaction history
  const handleChange = (event, newValue) => { //once the user changes tab it will get the new value
    setValue(newValue); //assign the newvalue to the value variable
  };
  return (
    <>
      <Tabs //tabs to indicate which tab the user is at
        value={value}
        onChange={handleChange}
        sx={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Tab label="Open Order" className="chartFormStep12" 
        // tab to display the limits of the coin that the user has that is still in the process
       />
        <Tab label="Transaction History" className="chartFormStep13"  
        //tab to display the transaction history of the coin that the user has made with this coin
        />
      </Tabs>

      <TransactionHistoryTable
        data={account.transactionHistory.filter( //filters the data based on the name of the coin
          //filters to reveal the transaction history that only concerns this specific type of coin
          (coin) => coin.name === coinName
        )}
        idx={value}
      />
      <UserLimitTable
        data={account.limitCoins.filter((coin) => coin.name === coinName)}
        idx={value}
      />
    </>
  );
}

export default HistorySection;
