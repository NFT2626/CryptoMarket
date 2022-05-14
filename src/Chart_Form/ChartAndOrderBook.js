import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  ButtonGroup,
} from "@material-ui/core";
import SelectorCoin from "./SelectorCoin";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import "./ChartAndOrderBook.css";
import { Divider } from "@mui/material";
import NumberCard from "./NumberCard";
import Chart from "./Chart";
import Tooltip from "@mui/material/Tooltip";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function ChartAndOrderBook({ OHLC, coinName, coinData }) {
  const [isSectioned, setSectioned] = useState(false);

  console.log(coinData);
  return (
    <div style={{ marginTop: "-0.5rem" }}>
      {/* <Grid container sx={{pl:30}} spacing={8} alignItems="center" justifyContent="space-around">
                <Grid item xs={4} >
                    <Typography variant="h4" gutterBottom={true} color="textPrimary"> Coin</Typography>
                </Grid>    
                <Grid item xs={8}>
                    <Box sx={{display: 'inline-flex', flexDirection: 'row'}}>
                        <NumberCard content="Daniel" number="1969" variant= "h6" />
                        <NumberCard content="Card1" number="1969" variant= "h6" />
                    </Box>
                </Grid>
            </Grid> */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" color="textPrimary">
                {" "}
                {coinName}
              </Typography>
              <Tooltip
                title={coinData.description?.en.replace(/<\/?[^>]+(>|$)/g, "")}
              >
                <MenuBookIcon />
              </Tooltip>
            </Box>
  
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "#252930", ml: 2 }}
            variant="middle"
          />
          <Container sx={{ flex: 1 }}>
            <Box style={{ display: "flex", flexDirection: "row" }}>
              <Tooltip
                arrow
                title="This is the price of the coin, the price is in usd, you use the price to assist in making market decisions"
              >
                <div>
                  <NumberCard
                    content="Price"
                    number={"$" + coinData.market_data.current_price.usd}
                    variant="h8"
                  />
                </div>
              </Tooltip>
              <Tooltip
                arrow
                title="This is the 24h Highest price of the coin, this is the peak price of the coin in 24 hours"
              >
                <div>
                  <NumberCard
                    content="24h High"
                    number={"$" + coinData.market_data.high_24h.usd}
                    variant="h7"
                  />
                </div>
              </Tooltip>
              <NumberCard
                content="24h Low"
                number={"$" + coinData.market_data.low_24h.usd}
                variant="h7"
              />
              <NumberCard
                content="Total Volume"
                number={coinData.market_data.total_volume.usd}
                variant="h7"
              />
              <NumberCard
                content="24h MarketCap"
                number={
                  "$" +
                  coinData.market_data.market_cap_change_24h_in_currency.usd
                }
                variant="h7"
              />
            </Box>
          </Container>
        </Box>
        <Box sx={{ borderTop: "double", marginLeft: "-20px", width: "100%" }}>
          <Box
            sx={{ marginLeft: "5vh", marginBottom: "1vh", marginTop: "1vh" }}
          >
           
          </Box>
        </Box>
        <Box sx={{ maxWidth: "100%", marginLeft: "-2.5rem" }}>
          <Chart data={OHLC} />
        </Box>
      </Box>
    </div>
  );
}

export default ChartAndOrderBook;
