//importing libraries
import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Avatar,
  Badge,
  Grid,
  Breadcrumbs,
  Fab,
  Paper
} from "@material-ui/core";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from "react-router-dom";

//this component is responsible for displaying each of the coins that the user owns on te profile

function CoinDisplayCard({coin, actualCoin}) { 
    const navigate = useNavigate(); //allows the user to nvaigate
    const handleMove =(e) => { //whenever the user cleans on the learn me they would be able to redirect to the chartform page of that particular coin
        e.preventDefault(); //prevents reloading
    
        navigate(`/Dashboard/ChartForm/${actualCoin.id}`) //goes to the chartform page of that coin
    }

  return (
      <Paper style={{width: "25vw", display: "inline-block", marginLeft: '1vw'}}>
    <Card>
              <CardContent>

            <Typography color="primary" variant="h5" //name of the coin
            >{coin.name}</Typography>
        <Avatar src={actualCoin.image} style={{margin: "0 auto", height: 100, width: 100}}  //image of the coin
        />
        <Box style={{marginTop: 10}}>
        <Typography variant="caption" style={{display:"block", fontSize:"1rem"}} //price of the cin
        > Current Price: {actualCoin.current_price}</Typography>
        <Typography variant="caption" style={{display:"block", fontSize:"1rem"}} //quantity that has been bought
        > Bought quantity: {coin.quantity}</Typography>
        </Box>
        </CardContent>
        <CardActions>
        <Button size="small" onClick={handleMove} //the button that allows the user to explore the coin in the chartform page
        >Learn More</Button>
      </CardActions>
    </Card>
    </Paper>
  )
}

export default CoinDisplayCard