import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import UserLimitTableRow from "./UserLimitTableRow";

function UserLimitTable({ data, idx }) {
  return (
    <Paper style={{  overflowY: "scroll"}} hidden={idx !== 0}>
      <TableContainer elevation={0} sx={{ padding: 2, fontSize: 15 }}>
        <Table stickyHeader sx={{
      height: "max-content"
    }}>
          <caption>Coin Market Prices </caption>
          <TableHead>
            <TableRow>
              <TableCell width="17%">Name</TableCell>
              <TableCell width="17%">Price</TableCell>
              <TableCell width="17%">Quantity</TableCell>
              <TableCell width="17%">Type</TableCell>
              <TableCell width="17%">date</TableCell>
              <TableCell width="17%">Cancel?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((coin, idx) => (
              <UserLimitTableRow key={idx} coin={coin} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default UserLimitTable;
