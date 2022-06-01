//importing libraries
import React, { useMemo, useEffect } from "react";
import { Paper, Grid, Box, Typography } from "@material-ui/core";



//importing CSS
import "./BodySection.css";
//importing Components
import TableCard from "../TableCard/TableCard";
import TransferCoin from "../TransferCoin/TransferCoin";
import Chart from "../Chart";
import BalanceCard from "../BalanceCard/BalanceCard";
import RecentTransaction from "../RecentTransaction/RecentTransaction";


//This is the main dashboard home page for the user, this is where all relevant data of the user is displayed 

const BodySection = ({ account, coins, allUsers, setSteps }) => {
  const calculateTotalBalance = () => { //calculates the user total balance
    return account.portfolioCoins.reduce((total, item) => { //loops through each of the portfolioCoins the user owns
      const coin = coins.find((el) => el.name === item.name); //finds the name within the actual coins received from the API to find it's current price
      return total + coin.current_price * item.quantity; //adds the coin's current price multiplied by the quantity that the user owns of that coin
    }, account.fiatBalance); //adds them up starting from the user's owned USD dollars
  };

  const getBitcoinTotal = () => { //gets the bitcoin Total
    const bitcoinTotal = account.portfolioCoins.find( //finds a coin name bitcoin within the portfolioCoins
      (el) => el.name === "Bitcoin"
    );
    if (!bitcoinTotal) { //if the user does not own bitcoin
      return 0; //display 0 
    } else { //else just display the bitcoinTotal that was found 
      return bitcoinTotal.quantity;
    }
  };

  const totalBalance = useMemo(() => calculateTotalBalance(), []); //for optimization purposes
  const bitcoinTotal = useMemo(() => getBitcoinTotal(), []); //useMemo allows the results to be cached for optimization
  useEffect(() => {
    //this is the steps for each of the product tour where intro displays the contents
    setSteps([
      {
        element: ".step1",
        intro: "This is where you search for other people's portfolio",
      },
      {
        element: ".step2",
        intro: (
          <div>
            <Box component="img" src="/Images/MenuItemShowcase.png" />
            <Typography>
              Here this is where you would find all account activity, please
              give it a try
            </Typography>
          </div>
        ),
      },
      {
        element: ".step3",
        intro: "This is the amount of USD you have on this account",
      },
      {
        element: ".step4",
        intro:
          "This is the total amount of Asset value you have on this account",
      },
      {
        element: ".step5",
        intro: "This is the amount of bitcoin you have on this account",
      },
      {
        element: ".step6",
        intro:
          "This is the portfolio value of your account across the days you are active using this application",
      },
      {
        element: ".step7",
        intro:
          "You can view live data of cryptocurrency here, which you can make decisions on what to buy",
      },
      {
        element: ".step8",
        intro:
          "This is where you can transfer your coins to other accounts, please do not abuse this and make infinite accounts just to send to your main account",
      },
      {
        element: ".step9",
        intro:
          "This is where you can see the Recent transaction history, click view all to see all the transaction history that has been made",
      },
      {
        element: ".step10",
        intro: "You can quickly navigate here",
      },
    ]);
  }, [setSteps]);

  return (
    <>
      <Typography variant="h1" className="body-title" //the title of the page
      >
        {" "}
        DASHBOARD{" "}
      </Typography>
      <div maxWidth="lg" className="container-flex">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="paper-text--2 card-container step3 ">
              <BalanceCard //displays the data of the user's total USD balance
                image="cash.png"
                content={"$" + account.fiatBalance.toPrecision(4)}
                content2="Total Fiat USD Balance"
              />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="paper-text--2 card-container step4">
              <BalanceCard
                image="cash.png" //displays the total asset balance
                content={
                  parseFloat(totalBalance).toFixed(4)}
                content2="Total USD Asset Balance"
              />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="paper-text--1 card-container step5">
              <BalanceCard //displays the bitcoin total
                image="BitcoinWhite.png"
                content={parseFloat(bitcoinTotal).toFixed(4)}
                content2="Wallet BTC balance"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Paper className="step6">
              <Chart data={account.portfolioValueDates}  //chart to display the portfolio values throughout the dates the user is active
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="step7">
              <TableCard coins={coins} //displays live data to the user
               />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="step8">
              <TransferCoin //provides the user the ability to send coins
                account={account}
                coins={coins}
                allUsers={allUsers}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="step9">
              <RecentTransaction account={account}  //the recent sendAndReceive transaction data
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default BodySection;
