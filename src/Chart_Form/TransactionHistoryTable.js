//importing libraries
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

//importing components
import TransactionTableRow from "./TransactionTableRow";

//this is the component that displays in table like fashion of the user transaction history
function TransactionHistoryTable({ data, idx }) {
  return (
    <Paper //the paper that holds the table
      style={{ overflowY: "scroll" }}
      hidden={idx !== 1} // it is displayed if it's index is equal to 1
      className={idx !== 1 ? " " : "chartFormStep14"}
    >
      <TableContainer elevation={0} sx={{ padding: 2, fontSize: 15 }} //table container
      >
        <Table //table
          stickyHeader
          sx={{
            height: "max-content",
          }}
        >
          <caption //captions to indicate that it is a transaction history table
          >Transaction history </caption>
          <TableHead>
            <TableRow>
              <Tooltip
                arrow //once the user hovers it will display context of the name
                title="This is the name of the bitcoin that is used to transact"
              ><TableCell width="20%">Name</TableCell></Tooltip>
              <Tooltip
                arrow//once the user hovers it will display context 
                title="This is the price of the coin when it was bought or sold"
              ><TableCell width="20%">Price</TableCell></Tooltip>
              <Tooltip
                arrow//once the user hovers it will display context of the amount bought or sold 
                title="This the amount that was bought or sold"
              ><TableCell width="20%">Quantity</TableCell></Tooltip>
              <Tooltip
                arrow//once the user hovers it will display context of the type of the transaction
                title="The type of transaction that had occurred"
              ><TableCell width="20%">Type</TableCell></Tooltip>
              <Tooltip
                arrow//once the user hovers it will display context of the date
                title="This is the date at which the transaction was made"
              ><TableCell width="20%">date</TableCell></Tooltip>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((coin, idx) => ( //loops each of the data to create the row
              <TransactionTableRow key={idx} coin={coin} //the component to create the row 
               />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TransactionHistoryTable;
