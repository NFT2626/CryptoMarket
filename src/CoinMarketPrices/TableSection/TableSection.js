//Importing react libraries
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableRowCoin from "./TableRowCoin";
import { useMutation } from "@apollo/client";
import Tooltip from "@mui/material/Tooltip";

//importing Queries
import {
  ADD_WATCHLIST,
  GET_WATCHLIST_COINS,
  REMOVE_WATCHLIST,
} from "../../queries";


export default function TableSection({ displayCoins, watchListCoins }) {
  const [addWatchList] = useMutation(ADD_WATCHLIST, { //requests that allows the user to watch coins in the backend
    refetchQueries: [{ query: GET_WATCHLIST_COINS }], //once executed it will get the watchlist data again
    onError: (error) => { 
      console.log(error.graphQLErrors[0].message); //displays error message
    },
  });
  const [removeWatchList] = useMutation(REMOVE_WATCHLIST, { //send a request to backend to unwatch the coin
    refetchQueries: [{ query: GET_WATCHLIST_COINS }],  //fetches the watchlist data again
    onError: (error) => {
      console.log(error.graphQLErrors[0].message); //displays error
    },
  });

  const favoriteCoin = (name) => { //allows the user to favourite the coin once executed
    addWatchList({ variables: { coin: name } }); //sends the name to the backend
  };
  const unFavoriteCoin = (name) => { //allows the user to remove the coin from their favourites
    removeWatchList({ variables: { coin: name } }); //sends the name to the backend
  };

  {
    return (
      <TableContainer component={Paper} elevation={0} //container to hold the table
      >
        <Table //table
        >
          <caption //provides context as a mini title
          >Coin Market Prices </caption>
          <TableHead>
            <TableRow className="stepCoinMarket6">
                <Tooltip //tip when hovered to show help
                arrow
                title="This the name of the coin"
              ><TableCell>Name</TableCell></Tooltip>
                <Tooltip
                arrow //tip when hovered to show help
                title="This is the latest price of the coin"
              ><TableCell align="right">Last Price</TableCell></Tooltip>
                <Tooltip
                arrow //tip when hovered to show help
                title="How much it has changed since 24 hours"
              ><TableCell align="right">24h change</TableCell></Tooltip>
                <Tooltip
                arrow //tip when hovered to show help
                title="Crypto market capitalization is the total value of a cryptocurrency."
              ><TableCell align="right">Market Cap </TableCell></Tooltip>
                <Tooltip
                arrow //tip when hovered to show help
                title="Crypto trading volume measures how many times a coin changes hands over a given time frame."
              ><TableCell align="right">Volume(24h)</TableCell></Tooltip>
                <Tooltip
                arrow //tip when hovered to show help
                title="Graph to indicate how much has changed"
              ><TableCell>Last 7 days</TableCell></Tooltip>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayCoins.map((coin, idx) => ( //loops through each of the coins that is being displayed and is used by the 
            //TableRowCoin component to render each of the rows
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
