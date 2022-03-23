import React from 'react';
import { Box, Divider, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import RecentTransactionCard from './RecentTransactionCard';

function RecentTransaction() {
	return (
		<Box>
			<Typography>Recent Transaction</Typography>
			<Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
				<RecentTransactionCard />
				<Box sx={{ mt: 2, mb: 2 }} />
				<Divider light sx={{ width: '80%' }} />
				<Box sx={{ mt: 2, mb: 2 }} />
				<RecentTransactionCard />
				<Box sx={{ mt: 2, mb: 2 }} />
				<Divider light sx={{ width: '80%' }} />
				<Box sx={{ mt: -1, mb: 2 }} />
				<Button>
					{' '}
					<span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>+ </span> View All
				</Button>
			</Box>
		</Box>
	);
}

export default RecentTransaction;
