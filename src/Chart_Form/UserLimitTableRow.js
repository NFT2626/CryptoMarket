//Importing react libraries
import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Typography, Box, Button } from "@material-ui/core";
import {
    GET_CURRENT_USER,
    CANCEL_LIMIT
  } from "../queries";

  import { useMutation } from "@apollo/client";

//Importing components

function UserLimitTableRow({ coin }) {
    const [cancelLimit] = useMutation(  CANCEL_LIMIT
        , {
        refetchQueries: [{ query: GET_CURRENT_USER }],
        onError: (error) => {
          console.log(error.graphQLErrors[0].message);
        },
      });
    const handleCancel = (e) => {
            e.preventDefault();
            console.log(coin.id)
            cancelLimit({variables:{cancelLimitCoinId: coin.id}})
    }
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
      <TableCell width="20%">
        {" "}
        <Typography sx={{ fontFamily: "Times New Roman" }}>
          ${coin.bought_price}{" "}
        </Typography>
      </TableCell>
      <TableCell width="20%">
        <Typography>{coin.quantity} </Typography>
      </TableCell>
      <TableCell width="20%">
        <Typography>{coin.type}</Typography>
      </TableCell>
      <TableCell width="20%">
        <Typography>{coin.date}</Typography>
      </TableCell>
      <TableCell width="20%">
        <Button onClick={handleCancel} color="secondary" variant="contained">Cancel</Button>
      </TableCell>
    </TableRow>
  );
}

export default UserLimitTableRow;
