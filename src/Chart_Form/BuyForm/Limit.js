import React, { useState } from "react";
import { IconButton, InputBase, Paper, Grid, Button } from "@material-ui/core";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Tooltip from "@mui/material/Tooltip";

function Limit({ limit, coinPrice, coinName }) {
  const [priceValue, setPriceValue] = useState();
  const [amountValue, setAmountValue] = useState();
  const [amountOpen, setAmountOpen] = useState(false);
  const [priceOpen, setPriceOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  console.log("this is the price", amountValue);
  return (
    <div hidden={limit !== 0}>
      <Paper component="form" elevation={0} onSubmit={handleSubmit}>
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
