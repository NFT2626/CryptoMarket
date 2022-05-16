import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

import UserLimitTableRow from "./UserLimitTableRow";

function UserLimitTable({ data, idx }) {
  return (
    <Paper
      style={{ overflowY: "scroll" }}
      hidden={idx !== 0}
      className={idx !== 0 ? " " : "chartFormStep14"}
    >
      <TableContainer elevation={0} sx={{ padding: 2, fontSize: 15 }}>
        <Table
          stickyHeader
          sx={{
            height: "max-content",
          }}
        >
          <caption>User Limits </caption>
          <TableHead>
            <TableRow>
            <Tooltip
                arrow
                title="This is the name of the desired coin"
              >
              
              <TableCell width="17%">Name</TableCell>
              
              </Tooltip>
            <Tooltip
                arrow
                title="This is the price of the desired coin"
              >
              
              <TableCell width="17%">Price</TableCell>
              
              </Tooltip>
              <Tooltip
                arrow
                title="This is the amount the user wished to buy"
              >
              
              <TableCell width="17%">Quantity</TableCell>
              
              </Tooltip>
              <Tooltip
                arrow
                title="The type of transaction"
              >
              
              <TableCell width="17%">Type</TableCell>
              
              </Tooltip>
              <Tooltip
                arrow
                title="When was this transaction made"
              >
              
              <TableCell width="17%">date</TableCell>
           
              
              </Tooltip>
              <Tooltip
                arrow
                title="Do you want to cancel the limit order?"
              >
                
              <TableCell width="17%">Cancel?</TableCell>
              </Tooltip>
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
