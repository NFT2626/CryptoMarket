import React, { useMemo } from "react";
import { Paper, Grid, Container, Typography } from "@material-ui/core";

import Chart from "../Chart";

import "./BodySection.css";
import TotalBalance from "../TotalBalance/TotalBalance";
import TableCard from "../TableCard/TableCard";
import TransferCoin from "../TransferCoin/TransferCoin";

import BalanceCard from "../BalanceCard/BalanceCard";
import RecentTransaction from "../RecentTransaction/RecentTransaction";
import WalletAddresses from "../WalletAddresses/WalletAddresses";

//Importing Graphql

const BodySection = ({ account, coins, allUsers }) => {
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
            <Paper className="paper-text--1 card-container">
              <BalanceCard
                image="BitcoinImage.png"
                content={"$" + account.fiatBalance}
                content2="Total Fiat Balance"
              />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="paper-text--1 card-container">
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
            <Paper className="paper-text--1 card-container">
              <BalanceCard
                image="BitcoinImage.png"
                content={bitcoinTotal}
                content2="Wallet BTC balance"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Paper>
              <Chart data={account.portfolioValueDates} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper>
              <TableCard coins={coins} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper>
              <TransferCoin
                account={account}
                coins={coins}
                allUsers={allUsers}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper>
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
