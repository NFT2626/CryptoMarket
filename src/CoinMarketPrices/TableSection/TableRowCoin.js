//Importing react libraries
import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import { Typography, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import Tooltip from "@mui/material/Tooltip";


//this component is responsible for constructing the row for the table section to display the coins
//reasons is because we can see whether that individual row is watched or not 
//and we can make adjustments to that specific row rather than have it within the main component

//Importing components
import MarketChart from "../../DashBoard/MarketChart";

function TableRowCoin({ coin, watchListCoins, favoriteCoin, unFavoriteCoin }) {
  const isWatched = watchListCoins.includes(coin.name); //see if that coin is favourited or not

  return (
    <TableRow
      sx={{
        textDecoration: "none",
      }}
      key={coin.name} //row
    >
      <TableCell component="th" scope="row">
        <Box //holds the image and name
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
          <Avatar alt="Some cryptocurrency icon" src={coin.image}  //image of the coin
          />{" "}
          <Typography style={{ marginLeft: "2.5rem" }} //name of the coin
          >
            {" "}
            {coin.name}{" "}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="right">
        {" "}
        <Typography sx={{ fontFamily: "Times New Roman" }} //price of the coin
        >
          ${coin.current_price}{" "}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <p
          style={{ 
            color: `${ //displays the 24h market cap if it is less than 0 it will display red else it will be green
              coin.market_cap_change_percentage_24h < 0 ? "red" : "green"
            }`,
          }}
        >
          {coin.market_cap_change_percentage_24h}%{" "}
        </p>
      </TableCell>
      <TableCell align="right" //total market cap
      >
        <Typography>{coin.market_cap}</Typography>
      </TableCell>
      <TableCell align="right" //total volume
      >
        <Typography>{coin.total_volume}</Typography>
      </TableCell>
      <TableCell align="right" //cell that displays the chart
      >
        {" "}
        <MarketChart coinName={coin.name} keyNumber={coin.current_price}  //chart
        />{" "}
      </TableCell>
      <TableCell
        component={Button}
        className="stepCoinMarket7" //cell that holds the button to favourite
        onClick={() => {
          if (isWatched) { //if it is watched then it will give the user the option to unfavourite the coin
            unFavoriteCoin(coin.name);
          } else { //else it will allow the user to favourite the coin
            favoriteCoin(coin.name);
          }
        }}
      >
      
        <div style={{ display: isWatched ? "none" : "" }} //displays a tooltip to watchlist the coin? if it is not being watched
        >

        <Tooltip
                arrow
                title="Watchlist this coin? "
              >
          <StarBorderIcon />
          </Tooltip>
        </div>
        <div
          style={{
            color: "yellow",
            display: isWatched ? "" : "none",
          }}
        >
          <Tooltip //displays tool tip if the user ihas already watched the coin that hints "unfavourite this coin"
                arrow
                title="unfavorite this coin? "
              >
          <StarRateIcon  //star icon
          />
          </Tooltip>
        </div>
        
      </TableCell>
    </TableRow>
  );
}

export default TableRowCoin;
