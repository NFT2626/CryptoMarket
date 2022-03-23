import React from 'react';
import './RecentTransactionCard.css';
import { Avatar, Box, Typography } from '@material-ui/core';

function RecentTransactionCard({ user, transferer }) {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<Box className='card-border--rounded' sx={{ display: 'flex', alignItems: 'center' }}>
				<Avatar className='avatar-responsive' src='/Images/Face.jpeg' />
				<Typography className='text-margin'> 1.33 BTC</Typography>
			</Box>
			<Box sx={{ width: 30 }} component='img' src='/Images/negativeArrow.png' />
			<Box className='card-border--rounded' sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
				<Avatar className='avatar-responsive' src='/Images/Face.jpeg' />
				<Typography className='text-margin'> 1.33 BTC</Typography>
			</Box>
		</Box>
	);
}

export default RecentTransactionCard;
