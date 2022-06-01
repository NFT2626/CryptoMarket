//importing libraries
import React, { useState } from "react";
import {
  IconButton,
  InputBase,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Tooltip from "@mui/material/Tooltip";
import { useMutation } from "@apollo/client";
//importing queries
import {
  BUY_MARKET_COIN,
  GET_CURRENT_USER,
  SELL_MARKET_COIN,
} from "../../queries";
//This component allows the user to buy and sell coins at a marketprice for transaction

function MarketForm({ limit, coinPrice, coinName, account, messageSetter }) {
    //initialise states
    const [priceValue, setPriceValue] = useState(); //responsible for getting data of the price that is being entered
    const [amountValue, setAmountValue] = useState(); //responsible for getting the amount that is being entered
    const [amountOpen, setAmountOpen] = useState(false); //responsible for displaying the help once the user is entering something in the amount textfield
    const [priceOpen, setPriceOpen] = useState(false);//responsible for displaying the help once the user is entering something in the price textfield
    const [delay, setDelay] = useState(false); //responsible so that the user does not spam

  const [buyMarketCoin] = useMutation(BUY_MARKET_COIN, { //mutation that allows the user to buy the coin at market price
    refetchQueries: [{ query: GET_CURRENT_USER }],//fetches the information of the current user when it is executed
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);//displays the error
    },
  });

  const [sellMarketCoin] = useMutation(SELL_MARKET_COIN, { //mutation that allows the user to sell the coin at market price
    refetchQueries: [{ query: GET_CURRENT_USER }],//fetches the information of the current user when it is executed
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);//displays the error
    },
  });

  const handleSell = (event) => { //executes once the user decides to sell the coin
    event.preventDefault(); //prevent reloading
    const coinAmount = account.portfolioCoins.find( //find the amount of the coin the user ownsthrough the user portfolio and gets its quantity
      (el) => el.name === coinName //comparing the name of the coin the portfoliovalue coins
    ).quantity; 
 
    if (delay) { //if there is a delay to prevent spam
      //display the following
      messageSetter(
        "Cannot perform transaction with a small time frame, give us 5 seconds please"
      );
      return;
    }

    if (!amountValue && !priceValue) {
      // if the user did not enter anything
      //display the following
      messageSetter("sorry, you did not put anything");
    } else if (
      amountValue &&
      amountValue > 0.001 / coinPrice &&
      amountValue <= coinAmount
    ) {
      //if the user enters an amount and that the amount is greater than 0.001 divide by the price of the coin as well as the amount being entered is less than or equal to the amount of the coin that the user owns
      //the user is successful to make the transaction
      setDelay(true); //set the delay to true
      //set it back to false after 5 seconds
      setTimeout(() => {
        setDelay(false);
      }, 5000);
      //displays a success message
      messageSetter(`you have successfully sold ${amountValue} of ${coinName}`);
      sellMarketCoin({ //executes the mutation to sell the coin
        variables: {
          name: coinName,
          sellPrice: coinPrice,
          quantity: Number(amountValue),
        },
      });
    } else if ( 
      priceValue &&
      priceValue > 0.001 &&
      coinAmount * coinPrice >= priceValue
    ) {
      //if the user enters a price and the price is greater than 0.001 and the coin the user owns times by the current price of the coin is greater or equal to the price that the user entered for the amount they want to bie
      //the user is able to buy the coin using the price

      //set the delay to be true
      setDelay(true);
      //set it back to false after 5 seconds
      setTimeout(() => {
        setDelay(false);
      }, 5000);
      //display succcess message
      messageSetter(
        `you have successfully sold ${priceValue / coinPrice} of ${coinName}`
      );
      sellMarketCoin({ //execute the mutation that allows the user to sell the coin
        variables: {
          name: coinName,
          sellPrice: coinPrice,
          quantity: priceValue / coinPrice, // the quantity would just be the price of coin divided by the current price of the coin
        },
      });
    } else if (amountValue && amountValue <= 0.001 / coinPrice) {
      //if the user enters an amount below the required 0.001 / coin price
      //display an error and assist them with correcting it
      messageSetter(
        `Sorry, you must put more than ${
          0.001 / coinPrice
        } to make the transaction`
      );
    } else if (priceValue && priceValue <= 0.001) {
      //this is for when the user choose to buy with the price
      //if the priceValue entered is less than 0.001
      //display the following error message
      messageSetter(
        "Sorry, you must put more than $0.001 to make the transaction"
      );
    } else {
      //else display a message to indicate the user does not haven enough to make the transaction
      messageSetter(
        "sorry, we cannot perform your transaction, as you do not have enough fiat balance"
      );
    }
  };

  const handleBuy = (event) => { //this is called once the user clicked the buy button
    event.preventDefault(); //prevent reloading
    if (delay) { //if there is a delay to prevent spam
      //display the following
      messageSetter(
        "Cannot perform transaction with a small time frame, give us 5 seconds please"
      );
      return;
    }
    if (!amountValue && !priceValue) {
         // if the user did not enter anything
      //display the following
      messageSetter("sorry, you did not put anything");
    } else if (
      amountValue &&
      amountValue > 0.01 / coinPrice &&
      account.fiatBalance >= amountValue * coinPrice
    ) {
       //If the user enters an amount that is greater than 0.01 /price and the user owns enough USD when compared to the amount being entered * the current price of the coin to make the transaction
      //the user is successful to make the transaction
      setDelay(true);
      setTimeout(() => {
        setDelay(false);
      }, 5000);
      buyMarketCoin({ //executes the mutation to buy coins
        variables: {
          name: coinName,
          bought_price: coinPrice,
          quantity: Number(amountValue),
        },
      });
      //success message
      messageSetter(
        `you have successfully bought ${amountValue} of ${coinName}`
      );
    } else if (
      priceValue &&
      priceValue > 0.01 &&
      account.fiatBalance >= priceValue
    ) {
      //if the user enters a price > 0.01 and has enough USD to make the transaction when comparing to the price that is being entered
      //set the delay to be true
      setDelay(true);
      //after 5 seconds set the delay to be false
      setTimeout(() => {
        setDelay(false);
      }, 5000);
      buyMarketCoin({ //execute the buy function
        variables: {
          name: coinName,
          bought_price: coinPrice,
          quantity: priceValue / coinPrice, //the quantity would just be the price entered divided by the price of the current coin
        },
      });
      //display success message
      messageSetter(
        `you have successfully bought ${priceValue / coinPrice} of ${coinName}`
      );
    } else if (amountValue && amountValue <= 0.01 / coinPrice) {
      //if the user does not enter an amount that greater than 0.01 divided by the price of the current coin
      //display error message
      messageSetter(
        `Sorry, you must put more than ${
          0.01 / coinPrice
        } to make the transaction`
      );
    } else if (priceValue && priceValue <= 0.01) {
      //if the user enters a price that is less than 0.01 usd
      //display the following message
      messageSetter(
        "Sorry, you must put more than 0.01 to make the transaction"
      );
    } else {
      //else the user does not have enough to make the transaction
      messageSetter(
        "sorry, we cannot perform your transaction, as you do not have enough fiat balance"
      );
    }
  };

  return (
    <div hidden={limit !== 1}  //is displayed if the index is equal to 1
    >
      <Paper component="form" elevation={0}>
        <Grid container>
          <Grid item xs={12} className={limit !== 1 ? " " : "chartFormStep8"}>
            <Tooltip
              open={priceOpen} //this is opened if the priceOpen is true
                    // if user enters something into the price textfield it will display a message of the amount that is being sold or bought else it will display that the user needs to enter something
              title={
                priceValue
                  ? `you are buying or selling ${
                      priceValue / coinPrice
                    } of ${coinName}`
                  : "please enter an amount"
              }
              placement="top"
              arrow
            >
              <div
                style={{
                  display: "flex",
                  backgroundColor: "grey",
                  marginTop: "1.5rem",
                }}
              >
                <IconButton aria-label="menu">
                  <AttachMoneyIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  fullWidth
                  placeholder="Enter Price"
                  inputProps={{ "aria-label": "enter amount" }}
                  value={priceValue}
                  onFocus={() => {//when the user clicks on and is in focus to the textfield it will set the priceOpen to true
                    setPriceOpen(true);
                  }}
                  onBlur={() => { //if clicks off it will lose focus and will set the priceOpen to false
                    setPriceOpen(false);
                  }}
                  onChange={(e) => { //changes once something changes in the textfield
                    const value = e.target.value //gets the text that is being entered and makes it so that the user is able to enter only numbers no special characters as well as only one dot
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1");
                      const validated = value.match(/^(\d*\.{0,1}\d{0,3}$)/)
                      if (validated) {
                        setPriceValue(value); //sets the price to the value                   }
                      
                      }
                    
                    if (amountValue > 0) { //if the user enters something in the amount textfield
                      //set it to 0 
                      //we want to set it to a string because the textfield would display "0" and not an empty ""
                      setAmountValue("");
                    }
                  }}
                />
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={12} className={limit !== 1 ? " " : "chartFormStep9"}>
            <Tooltip
              open={amountOpen}  // activates once the amountOpen is true
                    //If the user enters something then it will display information in regards to the amount else it will tell the user to enter something in
              title={
                amountValue
                  ? `you are buying or selling ${amountValue} of ${coinName}`
                  : "please enter an amount"
              }
              placement="top"
              arrow
            >
              <div
                style={{
                  display: "flex",
                  backgroundColor: "grey",
                  marginTop: "2rem",
                }}
              >
                <IconButton aria-label="menu">
                  <CreditCardIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  fullWidth
                  placeholder="Amount"
                  inputProps={{ "aria-label": "enter amount" }}
                  value={amountValue}
                  onFocus={() => {
                        // once in focus or clicked on it will set the amountOpen to true
                    setAmountOpen(true);
                  }}
                  onBlur={() => {//if clicked off it will set the amountOpen to false
                    setAmountOpen(false);
                  }}
                  onChange={(e) => {//get the content that is being written in the textfield
                    const value = e.target.value //get rid of the special characters and texts, make sure it is able to write floating numbers only
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1");
                      const validated = value.match(/^(\d*\.{0,1}\d{0,4}$)/)

                      if(validated){
                        setAmountValue(value); //set the amount to the value
                          }
                    if (priceValue > 0) {
                      //if the user enters something in the price textfield
                      //set the textfield to nothing
                      setPriceValue("");
                    }
                  }}
                />
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={6} className={limit !== 1 ? " " : "chartFormStep10"}>
            <Button
              onClick={handleBuy} //button that allows the user to execute the buy function
              fullWidth
              style={{
                backgroundColor: "#32CD32",
                maxWidth: "70%",
                maxHeight: "25vh",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              {" "}
              Buy Now{" "}
            </Button>
          </Grid>

          <Grid item xs={6} className={limit !== 1 ? " " : "chartFormStep11"}>
            <Button
              fullWidth
              onClick={handleSell} //button that allows the user to sell
              style={{
                backgroundColor: "red",
                maxWidth: "70%",
                maxHeight: "25vh",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              {" "}
              Sell Now
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default MarketForm;
