//Importing react libraries
import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import { Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";

//Importing components

import MarketChart from "../../DashBoard/MarketChart";

function TableRowCoin({ coin, watchListCoins, favoriteCoin, unFavoriteCoin }) {
  const isWatched = watchListCoins.includes(coin.name);

  return (
    <TableRow
      sx={{
        textDecoration: "none",
      }}
      key={coin.name}
    >
      <TableCell component="th" scope="row">
        <Box
          component={Link}
          onClick={() => handleClick()}
          to={`/DashBoard/ChartForm/${coin.id}`}
          sx={{
            display: "flex",
            textDecoration: "none",
            color: "black",
            marginTop: "auto",
            marginBottom: "auto",
            alignItems: "center",
          }}
        >
          <Avatar alt="Some cryptocurrency icon" src={coin.image} />{" "}
          <Typography style={{ marginLeft: "2.5rem" }}>
            {" "}
            {coin.name}{" "}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="right">
        {" "}
        <Typography sx={{ fontFamily: "Times New Roman" }}>
          ${coin.current_price}{" "}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <p
          style={{
            color: `${
              coin.market_cap_change_percentage_24h < 0 ? "red" : "green"
            }`,
          }}
        >
          {coin.market_cap_change_percentage_24h}%{" "}
        </p>
      </TableCell>
      <TableCell align="right">
        <Typography>{coin.market_cap}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>{coin.total_volume}</Typography>
      </TableCell>
      <TableCell align="right">
        {" "}
        <MarketChart coinName={coin.name} keyNumber={coin.current_price}/>{" "}
      </TableCell>
      <TableCell
        component={Button}
        onClick={() => {
          if (isWatched) {
            unFavoriteCoin(coin.name);
          } else {
            favoriteCoin(coin.name);
          }
        }}
      >
        <div style={{ display: isWatched ? "none" : "" }}>
          <StarBorderIcon />
        </div>
        <div
          style={{
            color: "yellow",
            display: isWatched ? "" : "none",
          }}
        >
          <StarRateIcon />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default TableRowCoin;
