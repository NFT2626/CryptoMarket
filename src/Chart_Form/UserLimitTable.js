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
import UserLimitTableRow from "./UserLimitTableRow";

//this component is responsible for displaying the user limits of the user while it is processed where they are able to cancel the order 

function UserLimitTable({ data, idx }) {
  return (
    <Paper
      style={{ overflowY: "scroll" }}
      hidden={idx !== 0} // it is displayed if the index is equal to 0 
      className={idx !== 0 ? " " : "chartFormStep14"}
    >
      <TableContainer elevation={0} sx={{ padding: 2, fontSize: 15 }}>
        <Table //the table
          stickyHeader
          sx={{
            height: "max-content",
          }}
        >
          <caption //provides context that this is the user limit
          >User Limits </caption>
          <TableHead>
            <TableRow //these are the headers of the table
            >
            <Tooltip 
                arrow //this is activated on ce hovers and displays the following content below
                title="This is the name of the desired coin"
              >
              
              <TableCell width="17%">Name</TableCell>
              
              </Tooltip>
            <Tooltip
                arrow  //this is activated on ce hovers and displays the following content below
                title="This is the price of the desired coin"
              >
              
              <TableCell width="17%">Price</TableCell>
              
              </Tooltip>
              <Tooltip
                arrow  //this is activated on ce hovers and displays the following content below
                title="This is the amount the user wished to buy"
              >
              
              <TableCell width="17%">Quantity</TableCell>
              
              </Tooltip>
              <Tooltip
                arrow //this is activated on ce hovers and displays the following content below
                title="The type of transaction"
              >
              
              <TableCell width="17%">Type</TableCell>
              
              </Tooltip>
              <Tooltip
                arrow//this is activated on ce hovers and displays the following content below
                title="When was this transaction made"
              >
              
              <TableCell width="17%">date</TableCell>
           
              
              </Tooltip>
              <Tooltip
                arrow//this is activated on ce hovers and displays the following content below
                title="Do you want to cancel the limit order?"
              >
                
              <TableCell width="17%">Cancel?</TableCell>
              </Tooltip>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((coin, idx) => ( // loops for the array and passes information of the coin for it to be displayed in a row
              <UserLimitTableRow key={idx} coin={coin}  //the row of each of the table
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default UserLimitTable;
