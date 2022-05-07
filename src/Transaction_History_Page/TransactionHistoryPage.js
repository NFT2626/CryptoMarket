import React from "react";
import {
  Typography,
  Box,
  Breadcrumbs,
  Grid,
  Toolbar,
  TextField,
  Chip,
} from "@material-ui/core";

function TransactionHistoryPage() {
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
      <Toolbar />
    </div>
  );
}

export default TransactionHistoryPage;
