import React from "react";
import { Typography, Link, Box } from "@material-ui/core";

const TotalBalance = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {" "}
        Total Balance
      </Typography>

      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <Box sx={{ pt: 10 }}>
        <Link color="primary" href="javascript:;">
          View Coin distribution
        </Link>
      </Box>
    </Box>
  );
};

export default TotalBalance;
