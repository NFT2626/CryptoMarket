import React, { useEffect, useState } from "react";
import ChartAndOrderBook from "./ChartAndOrderBook";
import { Box, Container, Grid } from "@material-ui/core";
import OrderBook from "./OrderBook";
import OrderForm from "./BuyForm/OrderForm";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";

import HistorySection from "./HistorySection";
import axios from "axios";

function ChartForm({ account }) {
  let { coin } = useParams();
  const [OHLC, setOHLC] = useState([]);
  const [coinData, setCoinData] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
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
          <ChartAndOrderBook OHLC={OHLC} coinName={coin} coinData={coinData} />
        </Box>
      </Grid>

      <Grid item xs={2}>
        <Box
          maxWidth="md"
          sx={{
            borderStyle: "double",
            flex: 1,
          }}
        >
          <OrderBook />
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Container maxWidth="md" sx={{ flex: 1 }}>
          <OrderForm
            coinName={coin}
            coinPrice={coinData.market_data.current_price.usd}
            account={account}
          />
        </Container>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 15 }}>
        <Paper elevation={1} style={{ borderTop: "1px solid black" }}>
          <HistorySection account={account} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ChartForm;
