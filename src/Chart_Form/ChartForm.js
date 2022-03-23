import React from 'react';
import ChartAndOrderBook from './ChartAndOrderBook';
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OrderBook from './OrderBook';
import { AddBoxRounded } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem',
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: '5rem',
		},
		[theme.breakpoints.up('lg')]: {
			fontSize: '7rem',
		},
	},
}));

function ChartForm() {
	const classes = useStyles();
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				minWidth: '100%',
				minHeight: '100%',
				overflow: 'visible',
			}}
		>
			<Container sx={{ flex: 1, flexBasis: '30vw' }} fixed>
				<ChartAndOrderBook />
			</Container>
			<Box
				maxWidth='md'
				sx={{
					borderStyle: 'double',
					flex: 1,
				}}
			>
				<OrderBook />
			</Box>
			<Container maxWidth='md' sx={{ flex: 1 }}>
				Hello world
			</Container>
		</Box>
	);
}

export default ChartForm;
