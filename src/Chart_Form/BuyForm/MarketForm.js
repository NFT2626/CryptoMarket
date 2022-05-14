import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  TextField,
  MenuItem,
  Divider,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Tooltip from "@mui/material/Tooltip";
import {
  BUY_MARKET_COIN,
  GET_CURRENT_USER,
  SELL_MARKET_COIN,
} from "../../queries";
import { useMutation } from "@apollo/client";

function MarketForm({ limit, coinPrice, coinName, account, messageSetter }) {
  const [priceValue, setPriceValue] = useState();
  const [amountValue, setAmountValue] = useState();
  const [priceOpen, setPriceOpen] = useState(false);
  const [amountOpen, setAmountOpen] = useState(false);
  const [delay, setDelay] = useState(false);
  
  const [buyMarketCoin] = useMutation(BUY_MARKET_COIN, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [sellMarketCoin] = useMutation(SELL_MARKET_COIN, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const handleSell = (event) => {
    event.preventDefault();
    const coinAmount = account.portfolioCoins.find(
      (el) => el.name === coinName
    ).quantity;

    if (delay) {
      messageSetter(
        "Cannot perform transaction with a small time frame, give us 5 seconds please"
      );
      return;
    }

    if (!amountValue && !priceValue) {
      messageSetter("sorry, you did not put anything");
    } else if (
      amountValue &&
      amountValue > 0.001 / coinPrice &&
      amountValue <= coinAmount
    ) {
      setDelay(true);
      setTimeout(() => {
        setDelay(false);
      }, 5000);
      messageSetter(`you have successfully sold ${amountValue} of ${coinName}`);
      sellMarketCoin({
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
      setDelay(true);
      setTimeout(() => {
        setDelay(false);
      }, 5000);
      messageSetter(
        `you have successfully sold ${priceValue / coinPrice} of ${coinName}`
      );
      sellMarketCoin({
        variables: {
          name: coinName,
          sellPrice: coinPrice,
          quantity: priceValue / coinPrice,
        },
      });
    } else if (amountValue && amountValue <= 0.001 / coinPrice) {
      messageSetter(
        `Sorry, you must put more than ${
          0.001 / coinPrice
        } to make the transaction`
      );
    } else if (priceValue && priceValue <= 0.001) {
      messageSetter(
        "Sorry, you must put more than $0.001 to make the transaction"
      );
    } else {
      messageSetter(
        "sorry, we cannot perform your transaction, as you do not have enough fiat balance"
      );
    }
  };

  const handleBuy = (event) => {
    event.preventDefault();
    if (delay) {
      messageSetter(
        "Cannot perform transaction with a small time frame, give us 5 seconds please"
      );
      return;
    }
    if (!amountValue && !priceValue) {
      messageSetter("sorry, you did not put anything");
    } else if (
      amountValue &&
      amountValue > 0.01 / coinPrice &&
      account.fiatBalance >= amountValue * coinPrice
    ) {
      setDelay(true);
      setTimeout(() => {
        setDelay(false);
      }, 5000);
      buyMarketCoin({
        variables: {
          name: coinName,
          bought_price: coinPrice,
          quantity: Number(amountValue),
        },
      });
      messageSetter(
        `you have successfully bought ${amountValue} of ${coinName}`
      );
    } else if (
      priceValue &&
      priceValue > 0.01 &&
      account.fiatBalance >= priceValue
    ) {
      setDelay(true);
      setTimeout(() => {
        setDelay(false);
      }, 5000);
      buyMarketCoin({
        variables: {
          name: coinName,
          bought_price: coinPrice,
          quantity: priceValue / coinPrice,
        },
      });
      messageSetter(
        `you have successfully bought ${priceValue / coinPrice} of ${coinName}`
      );
    } else if (amountValue && amountValue <= 0.01 / coinPrice) {
      messageSetter(
        `Sorry, you must put more than ${
          0.01 / coinPrice
        } to make the transaction`
      );
    } else if (priceValue && priceValue <= 0.01) {
      messageSetter(
        "Sorry, you must put more than 0.01 to make the transaction"
      );
    } else {
      messageSetter(
        "sorry, we cannot perform your transaction, as you do not have enough fiat balance"
      );
    }
  };

  return (
    <div hidden={limit !== 1}>
      <Paper component="form" elevation={0}>
        <Grid container>
          <Grid item xs={12}>
            <Tooltip
              open={priceOpen}
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

                    console.log(amountValue);
                    if (amountValue > 0) {
                      setAmountValue("");
                    }
                  }}
                />
              </div>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              open={amountOpen}
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

                    if (priceValue > 0) {
                      setPriceValue("");
                    }
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

          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={handleSell}
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
