import React from "react";
import { Paper, Grid, Container, Typography } from "@material-ui/core";

import Chart from "./Chart";

import "./BodySection.css";
import TotalBalance from "./TotalBalance";
import TableCard from "./TableCard";
import TransferCoin from "./TransferCoin";

import BalanceCard from "./BalanceCard";
import RecentTransaction from "./RecentTransaction";
import WalletAddresses from "./WalletAddresses";

const BodySection = () => {
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
                content="1.003747 BTC"
                content2="Wallet BTC balance"
              />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="paper-text--1 card-container">
              <BalanceCard
                image="BitcoinImage.png"
                content="1.003747 BTC"
                content2="Wallet BTC balance"
              />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className="paper-text--1 card-container">
              <BalanceCard
                image="BitcoinImage.png"
                content="1.003747 BTC"
                content2="Wallet BTC balance"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Paper>
              <Chart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper>
              <TableCard />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper>
              <TransferCoin />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper>
              <RecentTransaction />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper>
              <WalletAddresses />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default BodySection;
