import React, {useEffect, useState} from 'react';
import ChartAndOrderBook from './ChartAndOrderBook';
import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OrderBook from './OrderBook';
import BuyForm from './BuyForm/BuyForm'
import {
	useParams
  } from "react-router-dom";


// useEffect(() => {
//     axios
//       .get(
//         "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
//       )
//       .then((res) => {
//         setCoins(res.data);

//       })
//       .catch((error) => console.log(error));
//   });

function ChartForm() {

	let { coin } = useParams();

	return (
		<Grid
		container
		>
			 <Grid item xs={8}>
			<Container sx={{ flex: 1, flexBasis: '30vw' }} fixed>
				<ChartAndOrderBook coinName={coin} />
			</Container>
			</Grid>

			<Grid item xs={2}>
			<Box
				maxWidth='md'
				sx={{
					borderStyle: 'double',
					flex: 1,
				}}
			>
				<OrderBook />
			</Box>
			</Grid>

			<Grid item xs={2}>
			<Container maxWidth='md' sx={{ flex: 1 }}>
				<BuyForm />
			</Container>

			</Grid>
		</Grid>
	);
}

export default ChartForm;
