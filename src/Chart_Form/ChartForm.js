import React, { useEffect, useState } from "react";
import ChartAndOrderBook from "./ChartAndOrderBook";
import { Box, Container, Grid } from "@material-ui/core";
import OrderBook from "./OrderBook";
import OrderForm from "./BuyForm/OrderForm";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";

import HistorySection from "./HistorySection";
import axios from "axios";

function ChartForm({ account, setSteps }) {
  let { coin } = useParams();
  const [OHLC, setOHLC] = useState([]);
  const [coinData, setCoinData] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  console.log(coinData);
  useEffect(() => {
    setSteps([
      {
        element: ".chartFormStep1",
        intro: "Hover on the book to learn more about the coin",
      },
      {
        element: ".chartFormStep2",
        intro:
          "Relevant information about the coin found here, to learn more about them hover over each of them",
      },
      {
        element: ".chartFormStep3",
        intro:
          "Information about the open, high, low and close can be found here",
      },
      {
        element: ".chartFormStep4",
        intro:
          "Graph of the trends of the coin can be found here, the purple represents the derivative of the trend, the green line dotted line represents the current high point of the coin whereas the purple line is associated with its derivative ",
      },
      {
        element: ".chartFormStep5",
        intro:
          "Click here if you want to purchase or sell using limit, the blue line indicates which option you have selected. If you are to sell or buy with limit, you must input values on either field. To learn more about it, please go to the Help page on this application to learn how to make a limit",
      },
      {
        element: ".chartFormStep6",
        intro:
          "Click here if you want to purchase or sell using market, if you are buying or selling with, you can only input either fields. To learn more, please go to the help page",
      },
      {
        element: ".chartFormStep7",
        intro:
          "Information about the amount of fiat you own as well as the amount of coins you own can be found here",
      },
      {
        element: ".chartFormStep8",
        intro:
          "If you are buying with limit, this is where you would enter the amount of money you would want to purchase or sell. If you are buying with market, this is where you would enter the dollars in total you want to buy that particular coin, the total amount would be converted into bitcoins from the market price.",
      },
      {
        element: ".chartFormStep9",
        intro:
          "If you are buying with limit, this is where you enter the amount of that coin you want to buy taking account of the price you've entered from above. If you are buying with market, this is the amount of that particular coin you want to buy at the current market price",
      },
      {
        element: ".chartFormStep10",
        intro: "This is where you submit to buy that coin",
      },
      {
        element: ".chartFormStep11",
        intro: "This is where you submit to sell that coin",
      },
      {
        element: ".chartFormStep12",
        intro:
          "Click here if you want to view your current limit orders, to find information on how to cancel a limit order, please go to our help page",
      },
      {
        element: ".chartFormStep13",
        intro:
          "Click here if you want to go to view your transaction history with the coin",
      },
      {
        element: ".chartFormStep14",
        intro:
          "This is where you can view a table of your transaction of the coin",
      },
    ]);
  }, [setSteps]);
  useEffect(() => {
    const promise1 = axios.get(
      `	https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}/ohlc?vs_currency=usd&days=max
  `
    );
    const promise2 =
      axios.get(`https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}?tickers=true&market_data=true
	`);

    Promise.allSettled([promise1, promise2]).then(function (values) {
      setIsShowing(values.every((el) => el.status === "fulfilled"));
      setOHLC(
        values[0].value.data.map((el) => {
          const date = new Date(el[0]);
          return {
            time: date.toISOString().split("T")[0],
            open: el[1],
            high: el[2],
            low: el[3],
            close: el[4],
          };
        })
      );
      setCoinData(values[1].value.data);
    });
  }, []);

  if (!isShowing || OHLC.length === 0 || coinData.length === 0) {
    return (
      <div>
        <h1> Loading... sorry for the lag</h1>
      </div>
    );
  }
  return (
    <Grid container>
      <Grid item xs={6}>
        <Box style={{ boxSizing: "border-box" }}>
          <ChartAndOrderBook
            OHLC={OHLC}
            coinName={coinData.name}
            coinData={coinData}
          />
        </Box>
      </Grid>

      <Grid item xs={6} style={{ marginTop: "8rem" }}>
        <Container maxWidth="md" sx={{ flex: 1 }}>
          <OrderForm
            coinName={coinData.name}
            coinPrice={coinData.market_data.current_price.usd}
            account={account}
          />
        </Container>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          marginTop: 15,
          flexGrow: 1,
          overflow: "visible",
          borderTop: "1px solid black",
        }}
      >
        <HistorySection account={account} coinName={coinData.name} />
      </Grid>
    </Grid>
  );
}

export default ChartForm;
