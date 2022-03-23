import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Breadcrumbs,
  Grid,
  Toolbar,
  TextField,
  Chip
} from "@material-ui/core";

import axios from "axios";
import "./BodySection.css";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import ListPaper from "./ListPaper";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import TableSection from "./TableSection";

const CoinMarketPrices = () => {
  const [crypto, setCrypto] = useState("");
  const [isWatchingList, setIsWatchingList] = useState(false);

  const [coins, setCoins] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);

      })
      .catch((error) => console.log(error));
  });

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(crypto.toLowerCase())
  );

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="h4">CoinMarketPrices</Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              underline="hover"
              color="inherit"
              to="/"
            >
              Dashboard
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              underline="hover"
              color="inherit"
              to="/#"
            >
              CoinMarketPrices
            </Link>
          </Breadcrumbs>
        </Box>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ListPaper content="Trending" />
          </Grid>
          <Grid item xs={4}>
            <ListPaper content="Biggest Gainers" />
          </Grid>

          <Grid item xs={4}>
            <ListPaper content="Newly Added" />
          </Grid>
        </Grid>
        <Typography
          variant="h4"
          style={{ marginTop: "5rem", marginLeft: "auto", marginRight: "auto" }}
        >
          Search for Cryptocurrency
        </Typography>

        <TextField
          fullWidth
          label="Search for Crypto"
          value={crypto}
          onChange={(event) => {
            setCrypto(event.target.value);
          }}
        />
      </Box>
      <Box style={{ marginTop: "2.5rem" }}>
        <Chip
          avatar={<StarBorderIcon />}
          style ={{color: isWatchingList ? 'rgb(56, 97, 251)' : 'inherit', background: isWatchingList ? 'rgb(240, 246, 255)' : 'rgb(239, 242, 245)'}}
          label="WatchList"
          component="a"
          href="#basic-chip"
          clickable
          onClick={() => {setIsWatchingList(!isWatchingList)}}
        />
        <Chip
          avatar={<MarkunreadMailboxIcon />}
          style={{ marginLeft: 6, background: 'rgb(239, 242, 245)' }}
          label="Portfolio"
          component="a"
          href="#basic-chip"
          clickable
        />
      </Box>
      <TableSection coins={filteredCoins} isWatchingList={isWatchingList} />
    </div>
  );
};

export default CoinMarketPrices;
