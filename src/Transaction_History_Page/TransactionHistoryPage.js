import React from "react";
import {
  Typography,
  Box,
  Breadcrumbs,
  Paper,
  Toolbar,
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log(account.sendReceiverHistories);
  if (!account) {
    return <div></div>;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Transaction History</Typography>
        <Breadcrumbs aria-label="breadcrumb">
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
      </Box>

      <Paper sx={{ width: "100%" }} style={{ marginTop: "2.5rem" }}>
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
                .slice(0, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell key={row.id}>{row.id}</TableCell>
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
          count={account.sendReceiverHistories.length}
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
