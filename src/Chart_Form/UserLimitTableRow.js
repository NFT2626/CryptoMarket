//Importing react libraries
import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Typography, Box, Button } from "@material-ui/core";
import { useMutation } from "@apollo/client";
//importing queries
import {
    GET_CURRENT_USER,
    CANCEL_LIMIT
  } from "../queries";

//This is the row of the user limit table that is used to make the process of handling the creation of the table modular 

function UserLimitTableRow({ coin }) {
    const [cancelLimit] = useMutation(  CANCEL_LIMIT //mutation that allows the user to cancel the limit
        , {
        refetchQueries: [{ query: GET_CURRENT_USER }], //once the mutation is activated it will fetch information about the user again
        onError: (error) => {
          console.log(error.graphQLErrors[0].message); //displays the error if there is an error
        },
      });
    const handleCancel = (e) => { //activates if the user decides to want to cancel the limit
            e.preventDefault(); //prevents the page from reloading
            cancelLimit({variables:{cancelLimitCoinId: coin.id}}) //executes the mutation with the parameters of the coin id 
    }
  return (
    <TableRow
      sx={{ 
        textDecoration: "none",
      }} 
      key={coin.name}
    >
      <TableCell component="th" scope="row">
        <Typography //cell that displays the name
        > {coin.name} </Typography>
      </TableCell>
      <TableCell width="20%">
        {" "}
        <Typography sx={{ fontFamily: "Times New Roman" }}
        //cell that displays the price 
        >
          ${coin.bought_price}{" "}
        </Typography>
      </TableCell>
      <TableCell width="20%">
        <Typography
        //cell that displays the quanity
        >{coin.quantity} </Typography>
      </TableCell>
      <TableCell width="20%">
        <Typography
        //cell that displays the transaction type
        >{coin.type}</Typography>
      </TableCell>
      <TableCell width="20%">
        <Typography
        //cell that displays the date
        >{coin.date}</Typography>
      </TableCell>
      <TableCell width="20%">
        <Button onClick={handleCancel} color="secondary" variant="contained"
        //button that allows the user to cancel the order, once clicked it will execute the handleCancel function
        >Cancel</Button>
      </TableCell>
    </TableRow>
  );
}

export default UserLimitTableRow;
