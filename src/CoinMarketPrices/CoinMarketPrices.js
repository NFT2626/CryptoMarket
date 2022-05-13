import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Breadcrumbs,
  Grid,
  Toolbar,
  TextField,
  Chip,
} from "@material-ui/core";
import { useQuery } from "@apollo/client";

import { GET_WATCHLIST_COINS } from ".././queries";
import { Link } from "react-router-dom";
import ListPaper from "./ListPaper";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import TableSection from "./TableSection/TableSection";

const CoinMarketPrices = ({ coins, newAddedCoins, biggestGainers }) => {
  const [crypto, setCrypto] = useState("");
  const [isWatchingList, setIsWatchingList] = useState(false);
  const [displayCoins, setDisplayCoins] = useState(coins);
  const result = useQuery(GET_WATCHLIST_COINS);
  console.log(biggestGainers.result);
  useEffect(() => {
    let filterCoins; 
    if (crypto) {
      filterCoins = 
        displayCoins.filter((el) =>
          el.name.toLowerCase().includes(crypto.toLowerCase())
        )
    
    }
    else{
      filterCoins = coins; 
    }
    if (isWatchingList) {
      
      setDisplayCoins(
        filterCoins.filter((el) =>
          result.data.getWatchListCoins.includes(el.name)
        )
      );
    } else {
      setDisplayCoins(filterCoins);
    }
    
  }, [isWatchingList, crypto, coins]);

  if (result.loading) {
    return (
      <div>
        {" "}
        <h1> Loading ... sorry for the lag</h1>{" "}
      </div>
    );
  }
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">CoinMarketPrices</Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
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
              to="/#"
            >
              CoinMarketPrices
            </Link>
          </Breadcrumbs>
        </Box>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ListPaper
              content="Trending"
              isPercentage={true}
              data={biggestGainers.result}
            />
          </Grid>
          <Grid item xs={4}>
            <ListPaper
              content="Biggest Gainers"
              isPercentage={true}
              data={biggestGainers.result}
            />
          </Grid>

          <Grid item xs={4}>
            <ListPaper content="Newly Added" data={newAddedCoins.result} />
          </Grid>
        </Grid>
        <Typography
          variant="h4"
          style={{ marginTop: "5rem", marginLeft: "auto", marginRight: "auto" }}
        >
          Search for Cryptocurrency
        </Typography>

        <TextField
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
          style={{
            color: isWatchingList ? "rgb(56, 97, 251)" : "inherit",
            background: isWatchingList
              ? "rgb(240, 246, 255)"
              : "rgb(239, 242, 245)",
          }}
          label="WatchList"
          component="a"
          href="#basic-chip"
          clickable
          onClick={() => {
            setIsWatchingList(!isWatchingList);
          }}
        />
     
      </Box>
      <TableSection
        watchListCoins={result.data.getWatchListCoins}
        displayCoins={displayCoins}
      />
    </div>
  );
};

export default CoinMarketPrices;
