//importing libraries
import React, { useState } from "react";
import { IconButton, InputBase, Paper, Grid, Button } from "@material-ui/core";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Tooltip from "@mui/material/Tooltip";
import { useMutation } from "@apollo/client";
//importing components
import { BUY_LIMIT, GET_CURRENT_USER, SELL_LIMIT } from "../../queries";

//this component is responsible for the user to making transactions using limits


function Limit({ limit, coinPrice, coinName, messageSetter, account }) {
  //initialise states
  const [priceValue, setPriceValue] = useState(); //responsible for getting data of the price that is being entered
  const [amountValue, setAmountValue] = useState(); //responsible for getting the amount that is being entered
  const [amountOpen, setAmountOpen] = useState(false); //responsible for displaying the help once the user is entering something in the amount textfield
  const [priceOpen, setPriceOpen] = useState(false);//responsible for displaying the help once the user is entering something in the price textfield
  const [delay, setDelay] = useState(false); //responsible so that the user does not spam

  const [buyLimitCoins] = useMutation(BUY_LIMIT, { //mutation that allows the user to buy the coin with limit
    refetchQueries: [{ query: GET_CURRENT_USER }], //once the mutation executes it will get the information of the current user
    onError: (error) => {
      console.log(error.graphQLErrors[0].message); //displays the error
    },
  });
  const [sellLimitCoins] = useMutation(SELL_LIMIT, { //mutation that allows the user to sell the coin with limit
    refetchQueries: [{ query: GET_CURRENT_USER }], //fetches the information of the current user when it is executed
    onError: (error) => {
      console.log(error.graphQLErrors[0].message); //displays the error
    },
  });
  const handleBuy = (event) => { //executed once the user decides to buy 
    event.preventDefault(); //prevents reloading
    if (delay) { //if there is a delay 
      //display message the user is unable to make transaction too quickly
      messageSetter(
        "Cannot perform transaction with a small time frame, give us 5 seconds please"
      ); 
      return;//return to prevent further action
    } 
    if (!amountValue || !priceValue) {
      //if the user did not enter anything
      //display the following
      messageSetter("sorry, you did not put anything");
    } else if (amountValue * priceValue > account.fiatBalance) {
      //if the user buying that is intotal is greater than their usd balance
      //display the following:
      messageSetter("Sorry, you do not have enough to make this transaction");
    } else {
      //else they should be able to make the transaction
      messageSetter("you have successfully bought coin with limit"); //success message
      //executes the mutation that allows the user to make the transaction
      buyLimitCoins({ 
        variables: {
          name: coinName,
          boughtPrice: Number(priceValue),
          quantity: Number(amountValue),
        },
      });

      setDelay(true); //set the delay to true to prevent spam

      //change the delay to false once it reaches 5000 milliseconds -> 5 seconds
      setTimeout(() => {
        setDelay(false);
      }, 5000);
    }
  };
  const handleSell = (e) => { //executes once the user decides to sell the coin
    e.preventDefault(); //prevents reloading
    const coinAmount = account.portfolioCoins.find( // go through the array and find the coin in the user portfolio that the user is trying to sell and get its quantity
      (el) => el.name === coinName
    ).quantity; 
    if (delay) {
      //if there is a delay display the following: 
      messageSetter(
        "Cannot perform transaction with a small time frame, give us 5 seconds please"
      );
      return; //return to prevent further action
    }
    if (!amountValue || !priceValue) {
      //if the user hasn't entered anything display the following:
      messageSetter("please make sure you enter into all fields");
    } else if (amountValue > coinAmount) {
      // if the amount that is being entered is greater than what the user owns
      //display the following:
      messageSetter("you enter an amount that you do not have");
    } else {
      //else the user is able to successfully make an order
      //display the following:
      messageSetter("you have successfully made a sell limit");
      //executes the mutation that allows the user to make a sell transaction
      sellLimitCoins({
        variables: {
          name: coinName,
          sellPrice: Number(priceValue),
          quantity: Number(amountValue),
        },
      });

      setDelay(true); //sets the delay variable to true
      //sets the delay variable back to false after 5000 milliseconds -> 5 seconds
      setTimeout(() => {
        setDelay(false); 
      }, 5000);
    }
  };

  return (
    <div hidden={limit !== 0}>
      <Paper component="form" elevation={0}>
        <Grid container>
          <Grid item xs={12} className={limit !== 0 ? " " : "chartFormStep8"}>
            <Tooltip
              open={priceOpen} //Tooltip that is actived if the priceOpen is true
              // if user enters something into the price textfield it will display a message of the amount that is being sold or bought else it will display that the user needs to enter something
              title={
                priceValue
                  ? `you are buying or selling at ${
                      priceValue / coinPrice
                    } of the current price of ${coinName}`
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
                step="0.01"
                pattern='d\+\.\d\d$'
                                  sx={{ ml: 1, flex: 1 }}
                  fullWidth
                  placeholder="Enter Price"
                  inputProps={{ "aria-label": "enter amount" }}
                  value={priceValue}
                  onFocus={() => { //when the user clicks on and is in focus to the textfield it will set the priceOpen to true
                    setPriceOpen(true);
                  }}
                  onBlur={() => { //if clicks off it will lose focus and will set the priceOpen to false
                    setPriceOpen(false);
                  }}
                  onChange={(e) => { //called once something changes in the textfield
                    const value = e.target.value //gets the text that is being entered and makes it so that the user is able to enter only numbers no special characters as well as only one dot
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1");
                    const validated = value.match(/^(\d*\.{0,1}\d{0,3}$)/)
                    if (validated) {
                      setPriceValue(value); //sets the price to the value                   }
                    
                    }
                        
                  }}
                />
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={12} className={limit !== 0 ? " " : "chartFormStep9"}>
            <Tooltip
              open={amountOpen}
              // activates once the amountOpen is true
              title={(function () {
                //if the user still haven't entered anything for the price it will provide feedback that the user hasn't entered anything for the price
                // if the user haven't written anything to this textfield it will display that it needs to enter something in this textfield
                //else it will work out the total amount in USD for the user
                if (!priceValue) {
                  return "Please enter an amount for price";
                } else if (!amountValue) {
                  return "Please enter an amount";
                } else {
                  return `your total is at $${priceValue * amountValue} `;
                }
              })()}
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
                  <CreditCardIcon //credit card icon
                  />
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
                  onBlur={() => { //if clicked off it will set the amountOpen to false
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
                  }}
                />
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={6} className={limit !== 0 ? " " : "chartFormStep10"}>
            <Button
              onClick={handleBuy} //calls the handleBuy function oce it is clicked on
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

          <Grid item xs={6} className={limit !== 0 ? " " : "chartFormStep11"}>
            <Button
              fullWidth
              onClick={handleSell} //calls the handleSell function oce it is clicked on
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

export default Limit;
