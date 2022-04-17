//Importing react libraries
import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Typography, Box, Button } from "@material-ui/core";

//Importing components

function TransactionTableRow({ coin }) {
  return (
    <TableRow
      sx={{
        textDecoration: "none",
      }}
      key={coin.name}
    >
      <TableCell component="th" scope="row">
        <Typography> {coin.name} </Typography>
      </TableCell>
      <TableCell width="30%">
        {" "}
        <Typography sx={{ fontFamily: "Times New Roman" }}>
          ${coin.bought_price}{" "}
        </Typography>
      </TableCell>
      <TableCell width="30%">
        <Typography>{coin.quantity} </Typography>
      </TableCell>
      <TableCell width="30%">
        <Typography>{coin.type}</Typography>
      </TableCell>
      <TableCell width="30%">
        <Typography>{coin.date}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default TransactionTableRow;
