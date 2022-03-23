//Importing react libraries
import React, {useState} from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import { Typography, Box, Button} from "@material-ui/core";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from '@mui/icons-material/StarRate';

//Importing components
import MarketChart from "./MarketChart";

function TableRowCoin({coin, isWatchingList}) {
   const [isStar, setIsStar] = useState(false)
   console.log(isWatchingList);

  return (
    <TableRow
              sx={{ textDecoration: "none", display: (!isWatchingList) || (isWatchingList && isStar) ? '' : 'none' }
            
            }

              key={coin.name}
            >
              <TableCell component="th" scope="row">
                <Box component={Link} to="#" sx={{display:'flex', textDecoration: 'none', color: "black", marginTop:'auto', marginBottom: 'auto', alignItems: 'center'}}>
                  <Avatar alt="Some cryptocurrency icon" src={coin.image} />{" "}
                  <Typography style={{marginLeft: '2.5rem'}} >
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
                <p1
                  style={{
                    color: `${
                      coin.market_cap_change_percentage_24h < 0
                        ? "red"
                        : "green"
                    }`
                  }}
                >
                  {coin.market_cap_change_percentage_24h}{" "}
                </p1>
              </TableCell>
              <TableCell align="right">
                <Typography>{coin.market_cap}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{coin.total_volume}</Typography>
              </TableCell>
              <TableCell align="right">
                {" "}
                <MarketChart coinName={coin.name} />{" "}
              </TableCell>
              <TableCell component={Button} onClick={() =>{setIsStar(!isStar)}}>
                <div style={{ display: isStar ? 'none' : ''}}>
                <StarBorderIcon />
                </div>
                <div style={{color: 'yellow', display: isStar ? '' : 'none'}}>
                <StarRateIcon />
                </div>
              </TableCell>
            </TableRow>
  )
}

export default TableRowCoin