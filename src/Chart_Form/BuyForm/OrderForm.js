//Importing Libraries
import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";
import Tooltip from "@mui/material/Tooltip";


//importing components
import Limit from "./Limit";
import MarketForm from "./MarketForm";
import Notification from "../../Notification/Notification";

const BuyForm = ({ coinName, coinPrice, account }) => {
  //initialise states
  const [limit, setLimit] = useState(0); //the indexes of the tabs
  const [message, setMessage] = useState(null); //the message
  const messageSetter = (content) => { //this is responsible for setting the message
    setMessage(content); //sets the message
    //after 6 seconds it will remove the message
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  };


  const handleLimitChange = (event, newValue) => {
    //changes the index of the tabs 
    setLimit(newValue); //sets the tab to the new value
  };

  return (
    <Box>
      <Box
        style={{ backgroundColor: "grey", paddingLeft: 10, paddingRight: 15 }}
      >
        <Tabs
          value={limit} //handles the tabs
          onChange={handleLimitChange} //whenever the tab changes it will execute the handleLimitChange function
          indicatorColor="primary"
        >
            <Tooltip
                arrow //tooltip once hovered would allow the user to understand that this is where the user is able to make limits
                title="This is where the user is able to make limits to the crypto market"
              >
            
          <Tab //the first tab
            tabItemContainerStyle={{ width: "20px" }}
            style={{
              minWidth: 20,
              paddingLeft: 0,
              paddingRight: 0,
              letterSpacing: "-0.1em",
              fontSize: "0.8em",
            }}
            label="Limit" //label of limit
            index={0} //has index of 0 
            className="chartFormStep5"
          />
    
          </Tooltip>
          <Tooltip //tooltip once hovered shows that this is where the user is able to make transactions with limits
                arrow
                title="This is where the user is able to make limits to the crypto market"
              >
           
          <Tab //second tab
            style={{
              minWidth: 20,
              paddingLeft: 0,
              paddingRight: 0,
              letterSpacing: "-0.1em",
              fontSize: "0.8em",
              marginLeft: "10px",
            }}
            index={1} //index of 0 
            label="Market" //label of market
            className="chartFormStep6"
          />
      
  </Tooltip>
        </Tabs>

      </Box>
      <Box>
        <Box style={{ marginTop: "10px" }} className="chartFormStep7">
          <caption style={{ display: "inline", fontSize: 12 }}
          //displays the amount of balance the user owns in USD
          >
            {" "}
            Available Balance: ${account.fiatBalance}
          </caption>
          <caption //displays the balance of that particular coin if they have it else it will just be 0
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
        <Notification message={message} //component to show messages
        />
        <Limit
          account={account}
          limit={limit} //tab 0
          coinPrice={coinPrice} //component for the user to do limit transactions
          coinName={coinName}
          messageSetter={messageSetter}
        />
        <MarketForm
          limit={limit} //tab 1
          coinPrice={coinPrice} //component that allows user to buy or sell at market price
          coinName={coinName}
          account={account}
          messageSetter={messageSetter}
        />
      </Box>
    </Box>
  );
};

export default BuyForm;
