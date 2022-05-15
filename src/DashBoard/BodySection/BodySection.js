import React, { useMemo, useEffect } from "react";
import { Paper, Grid, Box, Typography } from "@material-ui/core";

import Chart from "../Chart";

import "./BodySection.css";
import TotalBalance from "../TotalBalance/TotalBalance";
import TableCard from "../TableCard/TableCard";
import TransferCoin from "../TransferCoin/TransferCoin";

import BalanceCard from "../BalanceCard/BalanceCard";
import RecentTransaction from "../RecentTransaction/RecentTransaction";
import WalletAddresses from "../WalletAddresses/WalletAddresses";

//Importing Graphql

const BodySection = ({ account, coins, allUsers, setSteps }) => {
  const calculateTotalBalance = () => {
    console.log(account.portfolioCoins);
    account.portfolioCoins.reduce((total, item) => {
      /*  price = res.data. */
      const coin = coins.find((el) => el.name === item.name);
      return total + coin.current_price * item.quantity;
    }, account.fiatBalance);
  };

  const getBitcoinTotal = () => {
    const bitcoinTotal = account.portfolioCoins.find(
      (el) => el.name === "Bitcoin"
    );
    if (!bitcoinTotal) {
      return 0;
    } else {
      return bitcoinTotal.quantity;
    }
  };
  const totalBalance = useMemo(() => calculateTotalBalance(), []);

  const bitcoinTotal = useMemo(() => getBitcoinTotal(), []);
  useEffect(() => {
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
  /*   console.log(account, "this is the account"); */

  /*  let data = [];
  for (let i = 0; i < account.transactionHistory.length; i++) {
    const idx = data.findIndex((el) => {
      console.log(el);
      return el.date === account.transactionHistory[i].date;
    });
    if (idx === -1) {
      data.push({
        portfolioValue:
          account.transactionHistory[i].type === "Buy"
            ? account.transactionHistory[i].bought_price *
              account.transactionHistory[i].quantity
            : -account.transactionHistory[i].bought_price *
              account.transactionHistory[i].quantity,
        date: account.transactionHistory[i].date,
      });
    } else {
      if (account.transactionHistory[i].type === "Buy") {
        data[idx].portfolioValue +=
          account.transactionHistory[i].bought_price *
          account.transactionHistory[i].quantity;
      } else {
        data[idx].portfolioValue -=
          account.transactionHistory[i].bought_price *
          account.transactionHistory[i].quantity;
      }
    }
  }
  //Sort based on dates
  data.sort((port1, port2) => {
    return new Date(port1.date) - new Date(port2.date);
  });

  // Accumulatively add them
  data[0].portfolioValue += 10000; // This is the fiat balance value
 */
  /*   for (let i = 1; i < data.length; i++) {
    data[i].portfolioValue += data[i - 1].portfolioValue;
  }
  console.log(data); */
  return (
    <>
      <Typography variant="h1" className="body-title">
        {" "}
        DASHBOARD{" "}
      </Typography>
      <div maxWidth="lg" className="container-flex">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="paper-text--1 card-container step3 ">
              <BalanceCard
                image="BitcoinImage.png"
                content={"$" + account.fiatBalance}
                content2="Total Fiat Balance"
              />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="paper-text--1 card-container step4">
              <BalanceCard
                image="BitcoinImage.png"
                content={account.portfolioCoins.reduce((total, item) => {
                  /*  price = res.data. */
                  const coin = coins.find((el) => el.name === item.name);
                  return total + coin.current_price * item.quantity;
                }, account.fiatBalance)}
                content2="Total Asset Balance"
              />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="paper-text--1 card-container step5">
              <BalanceCard
                image="BitcoinImage.png"
                content={bitcoinTotal}
                content2="Wallet BTC balance"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Paper className="step6">
              <Chart data={account.portfolioValueDates} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="step7">
              <TableCard coins={coins} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="step8">
              <TransferCoin
                account={account}
                coins={coins}
                allUsers={allUsers}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="step9">
              <RecentTransaction account={account} />
            </Paper>
          </Grid>
          {/* <Grid item xs={12} md={4} lg={4}>
            <Paper>
              <WalletAddresses />
            </Paper>
          </Grid> */}
        </Grid>
      </div>
    </>
  );
};

export default BodySection;
