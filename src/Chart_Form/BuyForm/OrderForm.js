//Importing Libraries
import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";

//importing components
import Limit from "./Limit";
import MarketForm from "./MarketForm";
import Notification from "./Notification";

const BuyForm = ({ coinName, coinPrice, account }) => {
  const [limit, setLimit] = useState(0);
  const [currency, setCurrency] = useState("EUR");
  const [message, setMessage] = useState(null);
  const messageSetter = (content) => {
    setMessage(content);
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  };

  console.log(account);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleLimitChange = (event, newValue) => {
    setLimit(newValue);
  };

  return (
    <Box>
      <Box
        style={{ backgroundColor: "grey", paddingLeft: 10, paddingRight: 15 }}
      >
        <Tabs
          value={limit}
          onChange={handleLimitChange}
          indicatorColor="primary"
        >
          <Tab
            tabItemContainerStyle={{ width: "20px" }}
            style={{
              minWidth: 20,
              paddingLeft: 0,
              paddingRight: 0,
              letterSpacing: "-0.1em",
              fontSize: "0.8em",
            }}
            label="Limit"
            index={0}
          />
          <Tab
            style={{
              minWidth: 20,
              paddingLeft: 0,
              paddingRight: 0,
              letterSpacing: "-0.1em",
              fontSize: "0.8em",
              marginLeft: "10px",
            }}
            index={1}
            label="Market"
          />
        </Tabs>
      </Box>
      <Box>
        <Box style={{ marginTop: "10px" }}>
          <caption style={{ display: "inline", fontSize: 12 }}>
            {" "}
            Available Balance: ${account.fiatBalance}
          </caption>
          <caption
            style={{ display: "inline", fontSize: 12, marginLeft: "10px" }}
          >
            {" "}
            {coinName} Balance:{" "}
            {account.portfolioCoins.length
              ? account.portfolioCoins.find((el) => el.name === coinName)
                  .quantity
              : 0}
          </caption>
        </Box>
        <Notification message={message} />
        <Limit limit={limit} coinPrice={coinPrice} coinName={coinName} />
        <MarketForm
          limit={limit}
          coinPrice={coinPrice}
          coinName={coinName}
          account={account}
          messageSetter={messageSetter}
        />
      </Box>
    </Box>
  );
};

export default BuyForm;
