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

function CoinDisplayCard({coin, actualCoin}) {
    console.log("this is the coin", coin)
    console.log("this is the actual coin", actualCoin)
  return (
      <Paper style={{width: "25vw", display: "inline-block", marginLeft: '1vw'}}>
    <Card>
              <CardContent>

            <Typography color="primary" variant="h5">{coin.name}</Typography>
        <Avatar src={actualCoin.image} style={{margin: "0 auto", height: 100, width: 100}} />
        <Box style={{marginTop: 10}}>
        <Typography variant="caption" style={{display:"block", fontSize:"1rem"}}> Current Price: {actualCoin.current_price}</Typography>
        <Typography variant="caption" style={{display:"block", fontSize:"1rem"}}> Bought quantity: {coin.quantity}</Typography>
        </Box>
        </CardContent>
        <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Paper>
  )
}

export default CoinDisplayCard