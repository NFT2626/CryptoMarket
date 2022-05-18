//Importing Libraries
import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import Tooltip from "@mui/material/Tooltip";


//importing components
import Limit from "./Limit";
import MarketForm from "./MarketForm";
import Notification from "../../Notification/Notification";

const BuyForm = ({ coinName, coinPrice, account }) => {
  const [limit, setLimit] = useState(0);
  const [message, setMessage] = useState(null);
  const messageSetter = (content) => {
    setMessage(content);
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  };

  console.log(account);

  const handleLimitChange = (event, newValue) => {
    console.log(newValue);
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
            <Tooltip
                arrow
                title="This is where the user is able to make limits to the crypto market"
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
            className="chartFormStep5"
          />
    
          </Tooltip>
          <Tooltip
                arrow
                title="This is where the user is able to make limits to the crypto market"
              >
           
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
            className="chartFormStep6"
          />
      
  </Tooltip>
        </Tabs>

      </Box>
      <Box>
        <Box style={{ marginTop: "10px" }} className="chartFormStep7">
          <caption style={{ display: "inline", fontSize: 12 }}>
            {" "}
            Available Balance: ${account.fiatBalance}
          </caption>
          <caption
            style={{ display: "inline", fontSize: 12, marginLeft: "10px" }}
          >
            {" "}
            {coinName} Balance:{" "}
            {account.portfolioCoins.find((el) => el.name === coinName)
              ? account.portfolioCoins.find((el) => el.name === coinName)
                  .quantity
              : 0}
          </caption>
        </Box>
        <Notification message={message} />
        <Limit
          account={account}
          limit={limit}
          coinPrice={coinPrice}
          coinName={coinName}
          messageSetter={messageSetter}
        />
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
