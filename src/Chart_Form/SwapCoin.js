//importing libraries
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import "./ChartAndOrderBook.css";
import { Divider } from "@mui/material";
import NumberCard from "./NumberCard";
import Chart from "./Chart";
import Tooltip from "@mui/material/Tooltip";
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from "react-router-dom";

//This component is responsible for allowing the user to be able to swap to different coins while they are trading

function SwapCoin({coins}) {
  //initiialising states
    const [isSectioned, setSectioned] = useState(false); // boolean to indicate whether the arrow is being hovered or not
    const [crypto, setCrypto] = useState(""); //the search details to filter out the coins that the user wants to switched to
    const navigate = useNavigate(); //allows the user to navigate to differnt pages

    const [page, setPage] = useState(1); //the page number of the coins
    const handleChange = (event, value) => { //allows the user to change to different pages
      //activates once the user decides to change pages
        setPage(value);  //change the value to that page that the user wants to see
      };

  return (
        <>
    <KeyboardArrowUpIcon //arrow key up 
    className={isSectioned && "box-keyboard--hover"} //displays once it is hovered ie. the issectioned is true
    onMouseEnter={() => {
      setSectioned(true); //once hovered it will set the sectioned to true which will display the contents to allow the user to swap coins
    }}
  />
  <Box
    className="section-box"
    onMouseLeave={() => {
      setSectioned(false); //once it has left the box it will make the contents of the box invisible
    }}
    sx={{
      display: isSectioned ? "flex" : "none", //if the isSectioned variable is true then it will display the content
      flexDirection: "column",
    }}
  >
    <div>
      <Box
        className={isSectioned ? "" : "outofPage"} //if the isSectioned variable is true then it will activate the css
        sx={{
          display: "flex",
          alignItems: "flex-end",
          overflow: "contained",
        }}
      >
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} //icon to describe the textfield
         />
        <TextField
          id="input-with-sx"
          label="search"
          variant="standard"
          fullWidth //textfield that allows the user to search and filter the coin
          value={crypto} //the search data
          onChange={(event) => { //whenever the user types something in the search bar
            setCrypto(event.target.value); //it will set the the variable to the search information
          }}
        />
      </Box>
    </div>
    <Box
    sx={{ flexGrow: 1, paddingTop: 20 }}

    >
        <Grid container justifyContent="space-around"
  alignItems="center" spacing={0}>
       {coins.filter((el) => //loops for each of the coin 
        el.name.toLowerCase().includes(crypto.toLowerCase()) // filter them based on the details of crypto by seeing if it is included in the name of the coins
        //if crypto is null then it is just an empty string as such an empty string would be anywhere in this string and as such will filter nothing out
      ).slice(10*(page-1),10*page).map((coin) => { //cuts out a portion of the coins based on the pages and maps them for it to be displayed to allow the user to see what can be selected
           return (
               <Grid item xs={3}>
                   <Button key={coin.id} onClick={(event) => { //button triggered if clicked
                           event.preventDefault(); //prevents reloading
                           //there is a bug where if i just have navigate to the dashboard/chartform/nameofthecoin page
                           //it will not change
                           //as such i will then firstly navigate to the coinmarketprice and then trigger a rerender
                           navigate(`/DashBoard/CoinMarketPrices`) //navigates to the coinmarketprice page

                        setTimeout(() => {
                            navigate(`/DashBoard/ChartForm/${coin.id}`) //navigates to the chartform page of that coin

                        }, 1)
                        }}>{coin.name}</Button> 
                   </Grid>
           )
       })}
      </Grid>
      <Box style={{paddingTop: 2, backgroundColor: 'grey'}}>
      <Pagination count={ Math.ceil(coins.filter((el) =>
        el.name.toLowerCase().includes(crypto.toLowerCase()
      )).length / 10) //the pagination which is the number that is displayed underneath the box that holds the information of the coins that allows to the user to decide what to select
        // ie. 1 2 3 4
        //here it is firstly filtering the coins and then calculating its length and then dividing 10 since we want to display 10 coins per page 
       } page={page} onChange={handleChange} siblingCount={10} variant="outlined" shape="rounded" />
       </Box>
    </Box>
  </Box>
  </>
  )
}

export default SwapCoin //exports the component