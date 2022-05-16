//This is the page which shows the history of which the user receives and sends 


// Libraries
import React, {useState} from "react";
import {
  Typography,
  Box,
  Breadcrumbs,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@material-ui/core";
import { Link } from "react-router-dom";



function TransactionHistoryPage({ account }) {
  const [page, setPage] = useState(0); //the current page of the table
  const [rowsPerPage, setRowsPerPage] = useState(10); //How many rows are there for each of the page
  if (!account) { //If there is no account, then it will display nothing
    return <div></div>;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage); //This sets the page of the table
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value); // A counter of what page the user is at
    setPage(0); 
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex", 
          alignItems: "center",
          justifyContent: "space-between",
        }} /*This is the CSS*/
      >
        <Typography variant="h4">Transaction History</Typography> {/*This is the title*/}
        <Breadcrumbs aria-label="breadcrumb">{/*This is the bread crumbs*/}
          <Link
            style={{ textDecoration: "none", color: "black" }}
            underline="hover"
            color="inherit"
            to="/DashBoard"
          >
            Dashboard
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            underline="hover"
            color="inherit"
            to="/#"
          >
            Transaction History
          </Link>
        </Breadcrumbs>
      </Box> {/*End of Bread Crumbs*/}

      <Paper sx={{ width: "100%" }} style={{ marginTop: "2.5rem" }}> {/*This is the table*/}
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell key={0}>Transaction ID</TableCell>

                <TableCell key={1}>Receiver</TableCell>
                <TableCell key={2}>Sender</TableCell>
                <TableCell key={3}>Quantity</TableCell>
                <TableCell key={4}>CryptoCurrency</TableCell>
                <TableCell key={5}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {account.sendReceiverHistories
                .slice(0, page * rowsPerPage + rowsPerPage) /*Allocates the rows for each page of the table */
                .map((row, idx) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell key={row.id}>{row.id}</TableCell> {/*Elements of the table*/}
                      <TableCell key={row.receiver}>{row.receiver}</TableCell>
                      <TableCell key={row.sender}>{row.sender}</TableCell>
                      <TableCell key={row.quantity}>{row.quantity}</TableCell>
                      <TableCell key={row.name}>{row.name}</TableCell>
                      <TableCell key={row.date}>{row.date}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination 
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={account.sendReceiverHistories.length} /*The bottom part of the table which allows the user to switch pages*/
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default TransactionHistoryPage;
