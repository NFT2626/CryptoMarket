import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
              <TableCell width="20%">Name</TableCell>
              <TableCell width="20%">Price</TableCell>
              <TableCell width="20%">Quantity</TableCell>
              <TableCell width="20%">Type</TableCell>
              <TableCell width="20%">date</TableCell>
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
