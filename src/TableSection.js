//Importing react libraries
import React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Typography, Box, Button} from "@material-ui/core";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TableRowCoin from './TableRowCoin'

//Importing css files



export default function AcccessibleTable({ coins, isWatchingList }) {
  
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table aria-label="caption table">
        <caption>Coin Market Prices </caption>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Last Price</TableCell>
            <TableCell align="right">24h change</TableCell>
            <TableCell align="right">Market Cap </TableCell>
            <TableCell align="right">Volume(24h)</TableCell>
            <TableCell>Last 7 days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRowCoin coin={coin} isWatchingList={isWatchingList}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
// market_cap: 896106818
// market_cap_rank: 101
// fully_diluted_valuation: null
// total_volume: 14128875
