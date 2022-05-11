import React, { useState } from "react";
import { IconButton, InputBase, Paper, Grid, Button } from "@material-ui/core";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Tooltip from "@mui/material/Tooltip";
import {
  BUY_LIMIT,
  GET_CURRENT_USER,

} from "../../queries";
import { useMutation } from "@apollo/client";

function Limit({ limit, coinPrice, coinName,messageSetter, account }) {
  const [priceValue, setPriceValue] = useState();
  const [amountValue, setAmountValue] = useState();
  const [amountOpen, setAmountOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [delay, setDelay] = useState(false);

  const [buyLimitCoins] = useMutation(BUY_LIMIT, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const handleBuy = (event) => {
    event.preventDefault();
    if (delay) {
      messageSetter(
        "Cannot perform transaction with a small time frame, give us 5 seconds please"
      );
      return;
    }
    if (delay) {
      messageSetter(
        "Cannot perform transaction with a small time frame, give us 5 seconds please"
      );
      return;
    }
    if (!amountValue || !priceValue) {
      messageSetter("sorry, you did not put anything");
    } 
    else if (amountValue * priceValue > account.fiatBalance) {
      messageSetter("Sorry, you do not have enough to make this transaction");

    }
    else{
      messageSetter("you have successfully bought coin with limit");
      console.log( {
        name: coinName,
        boughtPrice: Number(priceValue),
        quantity: Number(amountValue),
      })
      buyLimitCoins({
        variables: {
          name: coinName,
          boughtPrice: Number(priceValue),
          quantity: Number(amountValue),
        },
      });

      setDelay(true);
      setTimeout(() => {
        setDelay(false);
      }, 5000);

    }
  };
  return (
    <div hidden={limit !== 0}>
      <Paper component="form" elevation={0} >
        <Grid container>
          <Grid item xs={12}>
            <Tooltip
              open={priceOpen}
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
                  sx={{ ml: 1, flex: 1 }}
                  fullWidth
                  placeholder="Enter Price"
                  inputProps={{ "aria-label": "enter amount" }}
                  value={priceValue}
                  onFocus={() => {
                    setPriceOpen(true);
                  }}
                  onBlur={() => {
                    setPriceOpen(false);
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1");

                    setPriceValue(value);
                  }}
                />
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              open={amountOpen}
              title={(function () {
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
                  <AttachMoneyIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  fullWidth
                  placeholder="Amount"
                  inputProps={{ "aria-label": "enter amount" }}
                  value={amountValue}
                  onFocus={() => {
                    setAmountOpen(true);
                  }}
                  onBlur={() => {
                    setAmountOpen(false);
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1");
                    console.log(value);

                    setAmountValue(value);
                  }}
                />
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Button
            onClick={handleBuy}
              fullWidth
              style={{
                backgroundColor: "green",
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

          <Grid item xs={6}>
            <Button
              fullWidth
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
