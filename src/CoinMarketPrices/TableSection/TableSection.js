//Importing react libraries
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TableRowCoin from "./TableRowCoin";
import { useMutation } from "@apollo/client";

import {
  ADD_WATCHLIST,
  GET_WATCHLIST_COINS,
  REMOVE_WATCHLIST,
} from "../../queries";

//Importing css files

export default function TableSection({ displayCoins, watchListCoins }) {
  const [addWatchList] = useMutation(ADD_WATCHLIST, {
    refetchQueries: [{ query: GET_WATCHLIST_COINS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const [removeWatchList] = useMutation(REMOVE_WATCHLIST, {
    refetchQueries: [{ query: GET_WATCHLIST_COINS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const favoriteCoin = (name) => {
    addWatchList({ variables: { coin: name } });
  };
  const unFavoriteCoin = (name) => {
    removeWatchList({ variables: { coin: name } });
  };

  {
    return (
      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="caption table">
          <caption>Coin Market Prices </caption>
          <TableHead>
            <TableRow className="stepCoinMarket6">
              <TableCell>Name</TableCell>
              <TableCell align="right">Last Price</TableCell>
              <TableCell align="right">24h change</TableCell>
              <TableCell align="right">Market Cap </TableCell>
              <TableCell align="right">Volume(24h)</TableCell>
              <TableCell>Last 7 days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayCoins.map((coin, idx) => (
              <TableRowCoin
                key={idx}
                coin={coin}
                favoriteCoin={favoriteCoin}
                unFavoriteCoin={unFavoriteCoin}
                watchListCoins={watchListCoins}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
// market_cap: 896106818
// market_cap_rank: 101
// fully_diluted_valuation: null
// total_volume: 14128875
