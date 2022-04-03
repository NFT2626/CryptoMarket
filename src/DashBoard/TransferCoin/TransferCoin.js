import React from 'react';
import InputBox from '../InputBox';
import { Box, Typography, Button, Divider } from '@material-ui/core';
import './TransferCoin.css';

function TransferCoin() {
	return (
		<Box sx={{ padding: 2 }}>
			<Typography>Transfer Coins</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', mt: 2, pb: 2 }}>
					<Typography variant='h7'>
						{' '}
						Amount{' '}
						<span style={{ color: 'grey', marginLeft: '5px' }}> minimum value "0.001 BTC"</span>
					</Typography>
					<Box sx={{ mt: 2 }}>
						<InputBox displayCoin={true} isWallet={true} />
					</Box>
					<Box sx={{ mt: 2 }}>
						<Typography variant='h7'>wallet address</Typography>
						<Box sx={{ mt: 2 }}>
							<InputBox displayCoin={false} isWallet={false} />
						</Box>
					</Box>{' '}
					<Box sx={{ mt: 2, ml: 2 }} />
					<Button className='transfer-button' variant='contained'>
						<Typography variant='h6' className='btn-text'>
							Transfer Now
						</Typography>
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export default TransferCoin;
