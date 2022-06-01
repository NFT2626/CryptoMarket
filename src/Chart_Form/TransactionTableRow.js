//Importing react libraries
import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Typography, Box, Button } from "@material-ui/core";


//this is the row that is used by the transactionhistory table to display the information of the transaction history

function TransactionTableRow({ coin }) {
  return (
    <TableRow //the row
      sx={{
        textDecoration: "none",
      }}
      key={coin.name} //key of the row
    >
      <TableCell component="th" scope="row">
        <Typography //name of the coin
        > {coin.name} </Typography>
      </TableCell>
      <TableCell width="30%">
        {" "}
        <Typography sx={{ fontFamily: "Times New Roman" }} //the price of the coin
        >
          ${coin.bought_price}{" "}
        </Typography>
      </TableCell>
      <TableCell width="30%">
        <Typography //the quantity of the coin that is being bought or sold
        >{coin.quantity} </Typography>
      </TableCell>
      <TableCell width="30%" //the transaction type of the coin
      >
        <Typography>{coin.type}</Typography>
      </TableCell>
      <TableCell width="30%">
        <Typography //the date at which the transaction happened
        >{coin.date}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default TransactionTableRow;
