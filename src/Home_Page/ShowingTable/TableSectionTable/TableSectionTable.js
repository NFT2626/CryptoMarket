//Importing react libraries
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@material-ui/core";

//Importing css files
import "./TableSectionTable.css";

//Importing components
import MiniChart from "./MiniChart/MiniChart"; 
//This is the actual table that is sed in the showing table to display the different coins 

export default function TableSectionTable({ coins }) {
  return (
    <TableContainer component={Paper} elevation={0}>{/*Make it a paper component so that we get the properties to elevate it to make it look nicer*/}
      <Table aria-label="caption table"> {/*This is the table*/}
        <caption>Check more by logging in</caption> {/*Captions to bring context that if they want to learn more they must login*/}
        <TableHead> {/*The headers of the table*/}
          <TableRow> {/*Row of headers*/}
            <TableCell>Name</TableCell> {/*The header for the name of the coin*/}
            <TableCell align="right">Last Price</TableCell> {/*The header for the current price of the coin*/}
            <TableCell align="right">24h change</TableCell> {/*The header for the last 24 hour change of the coin*/}
            <TableCell align="right">Market</TableCell> {/*The header for the graph*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.slice(0, 20).map((coin) => ( //This loops around 20 times and create rows to be displayed on the table to display 20 coins
            <TableRow key={coin.name}> {/*this is creating the row */}
              <TableCell component="th" scope="row">   {/* first cell */}
                <div style={{display:'flex', alignItems: 'center'}}>
                  <Avatar alt="Some cryptocurrency icon" src={coin.image} style={{display: 'inline-block'}} />{" "} {/*The image of the coin*/}
                  <Typography style={{ display: "inline", marginLeft: '1.5rem' }}> {/*the name of the coin afterwards*/}
                    {" "}
                    {coin.name}{" "}
                  </Typography> {/*The text are inline elements such that they are now next to each other*/}
                </div>
              </TableCell>
              <TableCell align="right"> {/*It is aligned slightly to the right*/}
                {" "}
                <Typography sx={{ fontFamily: "Times New Roman" }}> {/*Displays the price of th coin*/}
                  ${coin.current_price}{" "}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <p //displays the changes to the price of coin since 24 hours
                  style={{ //*If the change in the percentage price change of the coin is smaller than 0 then it must be decreasing so it will appear red
                    color: `${  //else it will just display green
                      coin.market_cap_change_percentage_24h < 0
                        ? "red" // if the change is less than 0 
                        : "green" //if the change is greater or equal to 0 
                    }`,
                  }}
                >
                  {coin.market_cap_change_percentage_24h}{" "} {/*the changes in the price*/}
                </p>
              </TableCell>
              <TableCell align="right">
                {" "}
                <MiniChart  //renders the chart of the graph
                  keyNumber={coin.current_price}  //current price
                  coinName={coin.name} //name of the coin
                />{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
