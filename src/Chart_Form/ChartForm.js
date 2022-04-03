import React, {useEffect, useState} from 'react';
import ChartAndOrderBook from './ChartAndOrderBook';
import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OrderBook from './OrderBook';
import BuyForm from './BuyForm/BuyForm'
import {
	useParams
  } from "react-router-dom";




function ChartForm() {

	let { coin } = useParams();
	console.log(typeof coin)

	return (
		<Grid
		container
		>
			 <Grid item xs={6}>
			<Box style={{boxSizing:'border-box'}}>
				<ChartAndOrderBook coinName={coin} />
			</Box>
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

			<Grid item xs={4}>
			<Container maxWidth='md' sx={{ flex: 1 }}>
				<BuyForm />
			</Container>

			</Grid>
		</Grid>
	);
}

export default ChartForm;
