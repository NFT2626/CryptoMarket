//import libraries
import React from "react";
import {

  Typography,
  Box,
  Container,
} from "@material-ui/core";
import "./ChartAndOrderBook.css";
import { Divider } from "@mui/material";
import NumberCard from "./NumberCard";
import Chart from "./Chart";
import Tooltip from "@mui/material/Tooltip";
import MenuBookIcon from "@mui/icons-material/MenuBook";
//import components
import SwapCoin from "./SwapCoin"

//This is responsible for displaying the chart and all neccessary data of the coin


function ChartAndOrderBook({ OHLC, coinName, coinData, coins }) {

  return (
    <div style={{ marginTop: "-0.5rem" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box
              className="chartFormStep1"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" color="textPrimary" //the name of the coin
              >
                {" "}
                {coinName}
              </Typography>
              <Tooltip //filters out the href and link tags from the description and displays the description as a tool tip
                title={coinData.description?.en.replace(/<\/?[^>]+(>|$)/g, "")}
              >
                <MenuBookIcon //the image to represent the tooltip
                 />
              </Tooltip>
              </Box>
             <SwapCoin coins={coins} //the component that allows the user to switch to different coins
             />
            </Box>
        
          <Divider
            orientation="vertical" //divides the name and the other descriptions
            flexItem
            sx={{ borderColor: "#252930", ml: 2 }}
            variant="middle"
          />
          <Container sx={{ flex: 1 }} //the container that holds the descriptions of the coin
          >
            <Box
              style={{ display: "flex", flexDirection: "row" }}
              className="chartFormStep2"
            >
              <Tooltip
                arrow //the tip for the price of the coin
                title="This is the price of the coin, the price is in usd, you use the price to assist in making market decisions"
              >
                <div>
                  <NumberCard //a card component that displays the price
                    content="Price"
                    number={"$" + coinData.market_data.current_price.usd}
                    variant="h8"
                  />
                </div>
              </Tooltip>
              <Tooltip //tool tip that provides context of the Highest price
                arrow
                title="This is the 24h Highest price of the coin, this is the peak price of the coin in 24 hours"
              >
                <div>
                  <NumberCard
                    content="24h High" //a card component that displays the 24h High
                    number={"$" + coinData.market_data.high_24h.usd}
                    variant="h7"
                  />
                </div>
              </Tooltip>
              <Tooltip
                arrow  //tool tip that provides context of the lowest since 24 hours
                title="This is the price of when it is at it's lowest since 24 hours"
              >
                <div>
              <NumberCard
                content="24h Low" //a card component that displays the 24h Low
                number={"$" + coinData.market_data.low_24h.usd}
                variant="h7"
              />
              </div>
              </Tooltip>
                   <Tooltip
                arrow //tool tip that provides context of the volume
                title="Volume is the sum total of actual trades taking place"
              >
                <div>
              <NumberCard
                content="Total Volume" //a card component that displays the total volume
                number={coinData.market_data.total_volume.usd}
                variant="h7"
              />
              </div>
              </Tooltip>
              <Tooltip
                arrow //tool tip that provides context of the marketCap
                title="Crypto market capitalization is the total value of a cryptocurrency. Where stock market capitalization is calculated by multiplying share price times shares outstanding, crypto market capitalization is calculated by multiplying the price of the cryptocurrency with the number of coins in circulation."
              >
                <div>
              <NumberCard
                content="24h MarketCap" //a card component that displays the 24h MarketCap
                number={
                  "$" +
                  coinData.market_data.market_cap_change_24h_in_currency.usd
                }
                variant="h7"
              />
              </div>
              </Tooltip>
            </Box>
          </Container>
        </Box>
        <Box sx={{ borderTop: "double", marginLeft: "-20px", width: "100%" }} //all of the things below a css that displays the chart in a reasonable size on the screen
        >
          <Box
            sx={{ marginLeft: "5vh", marginBottom: "1vh", marginTop: "1vh" }}
          ></Box>
        </Box>
        <Box sx={{ maxWidth: "100%", marginLeft: "-2.5rem" }}>
          <Chart data={OHLC} />
        </Box>
      </Box>
    </div>
  );
}

export default ChartAndOrderBook;
