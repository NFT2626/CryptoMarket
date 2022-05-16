import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";


import TransactionTableRow from "./TransactionTableRow";

function TransactionHistoryTable({ data, idx }) {
  return (
    <Paper
      style={{ overflowY: "scroll" }}
      hidden={idx !== 1}
      className={idx !== 1 ? " " : "chartFormStep14"}
    >
      <TableContainer elevation={0} sx={{ padding: 2, fontSize: 15 }}>
        <Table
          stickyHeader
          sx={{
            height: "max-content",
          }}
        >
          <caption>Transaction history </caption>
          <TableHead>
            <TableRow>
              <Tooltip
                arrow
                title="This is the name of the bitcoin that is used to transact"
              ><TableCell width="20%">Name</TableCell></Tooltip>
              <Tooltip
                arrow
                title="This is the price of the coin when it was bought"
              ><TableCell width="20%">Price</TableCell></Tooltip>
              <Tooltip
                arrow
                title="This the amount that was bought"
              ><TableCell width="20%">Quantity</TableCell></Tooltip>
              <Tooltip
                arrow
                title="The type of transaction that had occurred"
              ><TableCell width="20%">Type</TableCell></Tooltip>
              <Tooltip
                arrow
                title="This is the date at which the transaction was made"
              ><TableCell width="20%">date</TableCell></Tooltip>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((coin, idx) => (
              <TransactionTableRow key={idx} coin={coin} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TransactionHistoryTable;
