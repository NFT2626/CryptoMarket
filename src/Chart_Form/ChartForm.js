//importing libaries
import React, { useEffect, useState } from "react";
import ChartAndOrderBook from "./ChartAndOrderBook";
import { Box, Container, Grid,Breadcrumbs, } from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom"; //For allowing routes

//importing components
import OrderForm from "./BuyForm/OrderForm";
import HistorySection from "./HistorySection";


function ChartForm({ account, setSteps, coins }) {
  let { coin } = useParams(); //gets the variable from the URL parameter 
  const [OHLC, setOHLC] = useState([]); //sets the data for the OHLC
  const [coinData, setCoinData] = useState([]); //sets the data for the coins
  const [isShowing, setIsShowing] = useState(false); //boolean to see if the data has been loaded
  useEffect(() => {
    //steps that is used to construct the product tour
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
   
      //allocate a promise to get data for the OHLC data of the coin 
    const promise1 = axios.get(
      `	https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}/ohlc?vs_currency=usd&days=max
  `
    );
   //allocate as a promise to get data of the coin
    const promise2 =
      axios.get(`https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}?tickers=true&market_data=true
	`);

  //once all the promise has been settled
    Promise.allSettled([promise1, promise2]).then(function (values) {
      setIsShowing(values.every((el) => el.status === "fulfilled")); //if the status of each of the promises if fulfilled then it will be true else false
      setOHLC( //creates the OHLC data
        values[0].value.data.map((el) => { //loops for each of the data is retrieved from the values of the promise
          const date = new Date(el[0]); //get the data
          return {
            time: date.toISOString().split("T")[0], //the time and change it to YYYY/MM/DD format
            open: el[1], //the open data
            high: el[2], //the high data
            low: el[3], //the low data
            close: el[4], //the close data
          };
        })
      );
      setCoinData(values[1].value.data); //set the coinData to the first element of the values array
    });
  }, []);

  if (!isShowing || OHLC.length === 0 || coinData.length === 0) { //if the promise is not fulfilled or the OHLC has not been allocated or the coindata has not been allocated display that it is still loading
    return (
      <div>
        <h1> Loading... </h1>
      </div>
    );
  }
  return (
    <div>
    <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

    }}
  >
    <Typography variant="h1" style={{fontSize: "3rem", //the title of the page
	fontWeight: 400,
	padding: 0,
	textTransform: "uppercase",
	fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
	color: "rgba(118, 118, 118, 1)",
	marginBottom: 15}}>Trading</Typography>
    <Breadcrumbs aria-label="breadcrumb" //breadcrumbs
    >
      <Link //link that directs to the dashboard
        style={{ textDecoration: "none", color: "black" }}
        underline="hover"
        color="inherit"
        to="/DashBoard"
      >
        Dashboard
      </Link>
      <Link
              style={{ textDecoration: "none", color: "black" }}
              underline="hover"
              color="inherit"
              to="/DashBoard/CoinMarketPrices" //link that directs to the coinmarketprices
            >
              CoinMarketPrices
            </Link>
      <Typography
        style={{ textDecoration: "none", color: "black", cursor: 'pointer' }}
       //link that indicates that the user is on the crypto chart form page
      >
Trading      </Typography>
    </Breadcrumbs>
  </Box>{" "}
    <Grid container style={{marginTop: 5}} //displays the chartAndOrderBook and the orderform that allows the user to make orders to buy or sell coins
    >
         
      <Grid item xs={6}>
        <Box style={{ boxSizing: "border-box" }}>
          <ChartAndOrderBook //Displays the chart and information about the coin
            OHLC={OHLC}
            coinName={coinData.name}
            coinData={coinData}
            coins={coins}
          />
        </Box>
 
      </Grid>

      <Grid item xs={6} style={{ marginTop: "8rem" }}>
        <Container maxWidth="md" sx={{ flex: 1 }}>
          <OrderForm //allows the user to make transactions to buy or sell coins
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
        <HistorySection account={account} coinName={coinData.name} //displays the transaction history as well as order limits to the user
         />
      </Grid>
    </Grid>
    </div>
  );
}

export default ChartForm;
