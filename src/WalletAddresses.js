import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import InputBox from './InputBox';

function WalletAddresses() {
	return (
		<Box sx={{ padding: 2 }}>
			<Typography style={{ marginLeft: '40px', marginTop: '22px' }}>Wallet addresses</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', mt: 2, pb: 2 }}>
					<Typography variant='h7'>Receiving Wallet Address</Typography>
					<Box sx={{ mt: 2 }}>
						<InputBox />
					</Box>
					<Box sx={{ mt: 2 }}>
						<Typography variant='h7'>Sending Wallet Address</Typography>
						<Box sx={{ mt: 2 }}>
							<InputBox />
						</Box>
					</Box>{' '}
					<Box sx={{ mt: 2, ml: 2 }} />
				</Box>
			</Box>
		</Box>
	);
}

export default WalletAddresses;
