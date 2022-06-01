//importing libraries
import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Breadcrumbs,
  Grid,
  Toolbar,
  TextField,
  Chip,
} from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ListPaper from "./ListPaper";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Tooltip from "@mui/material/Tooltip";
import TableSection from "./TableSection/TableSection";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
//importing queries
import { GET_WATCHLIST_COINS } from ".././queries";

//This is the component that is responsible for displaying the coins for the user
//such that the user is able to decide which coins to buy 


const CoinMarketPrices = ({
  coins,
  newAddedCoins,
  biggestGainers,
  setSteps,
}) => {
  //initialising states
  const [crypto, setCrypto] = useState(""); //variable for which the enter searches coins to filter them
  const [isWatchingList, setIsWatchingList] = useState(false); //whether the user decides to filter the coin based on favourite
  const [displayCoins, setDisplayCoins] = useState(coins); //the coins that are currently displayed to the user
  const result = useQuery(GET_WATCHLIST_COINS); //Gets what the user has favourited
  useEffect(() => {
    //These are steps for the product tour 
    //When displaying to help them understand the application better
    setSteps([
      {
        element: ".stepCoinMarket1",
        intro:
          "This is the trending data of the user coins that is obtained from the coin gecko api",
      },
      {
        element: ".stepCoinMarket2",
        intro: "These are one of the biggest gainers of the market right now",
      },
      {
        element: ".stepCoinMarket3",
        intro: "These are newly added coins to the current crypto market",
      },
      {
        element: ".stepCoinMarket4",
        intro: "Here you can filter the coins based on your search data",
      },
      {
        element: ".stepCoinMarket5",
        intro: "Filter your coins based on your watchlist here",
      },
      {
        element: ".stepCoinMarket6",
        intro: "Hover onto these headers for more information ",
      },
      {
        element: ".stepCoinMarket7",
        intro:
          "This is where you can favourite your coins and add them to your watchlist",
      },
    ]);
  }, [setSteps]); //dependency to this function
  useEffect(() => {
    let filterCoins; //initialise the coins that have been filtered to null
    if (crypto) { //if the user has searched for something

      filterCoins = coins.filter((el) => //loop through them and filter them and allocate it tothe filterCoins variable
        el.name.toLowerCase().includes(crypto.toLowerCase()) //see if the coin's name includes what the user searches for and returns a boolean
      );
    } else { //if they haven't searched for anything
      filterCoins = coins; //let the filterCoins variable be the coins that is retrieved from the api
      //because we haven't filter them
    }
    if (isWatchingList) { //if the user filters based on their favorite 
      setDisplayCoins(  //set the coins that is being displayed to the user's favorites
        filterCoins.filter((el) => //loop and filter them
          result.data.getWatchListCoins.includes(el.name) //see if the watchlist name includes the name of the coin
        )
      );
    } else { //if not 
      setDisplayCoins(filterCoins); //set the coins to the filterCoins which is obtained from the first binary selection
    }
  }, [isWatchingList, crypto, coins,result]); //if the user favorites changes, the user search details and coins changes activate this function again

  if (result.loading) { //if the user favorite is still being retrieved
    //displays that the retrieving is still loading
    return (
      <div>
        {" "}
        <LoadingScreen />{" "}
      </div>
    );
  }
  return (
    <div>
      <Box  
        sx={{
          display: "flex",
          flexDirection: "column",
        }} //each element are stacked together like an element
      > 
        <Box
          sx={{ //group them together as a flex 
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" style={{	fontWeight: 400, //the title of the page
	padding: 0,
	textTransform: "uppercase",
	fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
	color: "rgba(118, 118, 118, 1)",}}>CoinMarketPrices</Typography>
          <Breadcrumbs aria-label="breadcrumb" //breadcrumbs
          >
            <Link //Link that directs the user to the dashboard
              style={{ textDecoration: "none", color: "black" }}
              underline="hover"
              color="inherit" 
              to="/DashBoard"
            >
              Dashboard
            </Link>
            <Link //link that does nothing, but allows the user to know they are at the coinmarketprices
              style={{ textDecoration: "none", color: "black" }}
              underline="hover"
              color="inherit"
              to="/DashBoard/CoinMarketPrices"
            >
              CoinMarketPrices
            </Link>
          </Breadcrumbs>
        </Box>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={4} className="stepCoinMarket1">
            <ListPaper //component that displays the trending data
              content="Trending"
              isPercentage={true}
              toolTipContent="These are the most trending coins"
              data={biggestGainers}
            />
          </Grid>
          <Grid item xs={4} className="stepCoinMarket2">
            <ListPaper //component that displays the biggest gainers
              content="Biggest Gainers"
              toolTipContent="These are the biggest gainers"
              isPercentage={true}
              data={biggestGainers}
            />
          </Grid>

          <Grid item xs={4} className="stepCoinMarket3">
            <ListPaper //component that displays the newly added coins to the crypto market NOT this simulator
             content="Newly Added" toolTipContent="Newly added coins to the Cryptomarket" data={newAddedCoins} />
          </Grid>
        </Grid>
        <Typography //title to indicate that this is where the user is able to search for the coin
          variant="h4"
          style={{ marginTop: "5rem", marginLeft: "auto", marginRight: "auto" }}
        >
          Search for Cryptocurrency
        </Typography>



        <TextField //textfield that allows the user to filter the coins based on their search details
         InputProps={{
          startAdornment: (
            <InputAdornment position="start" //CSS for the icon
            >
              <SearchIcon //magnifying glass that is displayed next to the textfield
               />
            </InputAdornment>
          ),
        }}

          label="Search for Crypto" //label
          className="stepCoinMarket4"
          value={crypto} //the value
          onChange={(event) => { //once change, get the event
            setCrypto(event.target.value); //assign the value from the text to the variable called crypto
          }}
        />

      </Box>
      <Box style={{ marginTop: "2.5rem" }} 
      >
      <Tooltip
                arrow //Tooltip once the user hovers on the watchlist coin
                title= {isWatchingList ? "stop filtering?" : "filter based on watchlist?"} //If the user hasn't watched list for the coin and hovers on it will display "filter based on watchlist" else it will just display "stop filtering"
              >
        <Chip // the button that allows the user to watchlist
          className="stepCoinMarket5"
          avatar={<StarBorderIcon />} //the image to represent it
          style={{
            color: isWatchingList ? "rgb(56, 97, 251)" : "inherit", //If the user is filtering based on watchlist it will be a blue color else it will just be a white
            background: isWatchingList //if the user is filtering based on watchlist it will be slightly greyish else it will just be white
              ? "rgb(240, 246, 255)" 
              : "rgb(239, 242, 245)",
          }}
          label="WatchList" //label
          component="a" //what type of component it is 
          clickable //indicate it is clickable
          onClick={() => {
            setIsWatchingList(!isWatchingList); //once clicked it will switch it true if false and false if true
          }}
        />
        </Tooltip>
      </Box>
      <TableSection //displays the table of the coins
        watchListCoins={result.data.getWatchListCoins} 
        displayCoins={displayCoins}
      />
    </div>
  );
};

export default CoinMarketPrices;
