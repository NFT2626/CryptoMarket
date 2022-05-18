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


function SwapCoin({coins}) {
    const [isSectioned, setSectioned] = useState(false);
    const [crypto, setCrypto] = useState("");
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
      };

    console.log(coins)
  return (
        <>
    <KeyboardArrowUpIcon
    className={isSectioned && "box-keyboard--hover"}
    onMouseEnter={() => {
      console.log(isSectioned);
      setSectioned(true);
    }}
  />
  <Box
    className="section-box"
    onMouseLeave={() => {
      setSectioned(false);
    }}
    sx={{
      display: isSectioned ? "flex" : "none",
      flexDirection: "column",
    }}
  >
    <div>
      <Box
        className={isSectioned ? "" : "outofPage"}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          overflow: "contained",
        }}
      >
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="search"
          variant="standard"
          fullWidth
          value={crypto}
          onChange={(event) => {
            setCrypto(event.target.value);
          }}
        />
      </Box>
    </div>
    <Box
    sx={{ flexGrow: 1, paddingTop: 20 }}

    >
        <Grid container justifyContent="space-around"
  alignItems="center" spacing={0}>
       {coins.filter((el) =>
        el.name.toLowerCase().includes(crypto.toLowerCase())
      ).slice(10*(page-1),10*page).map((coin) => {
           return (
               <Grid item xs={3}>
                   <Button key={coin.id} onClick={(event) => {
                           event.preventDefault();
                           navigate(`/DashBoard/CoinMarketPrices`)
                        setTimeout(() => {
                            navigate(`/DashBoard/ChartForm/${coin.id}`)

                        }, 1)
                        }}>{coin.name}</Button>
                   </Grid>
           )
       })}
      </Grid>
      <Box style={{paddingTop: 2, backgroundColor: 'grey'}}>
      <Pagination count={ Math.ceil(coins.filter((el) =>
        el.name.toLowerCase().includes(crypto.toLowerCase()
      )).length / 10)
       } page={page} onChange={handleChange} siblingCount={10} variant="outlined" shape="rounded" />
       </Box>
    </Box>
  </Box>
  </>
  )
}

export default SwapCoin