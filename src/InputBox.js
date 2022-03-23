import React from 'react';
import { Paper, IconButton, InputBase, TextField, MenuItem, Divider } from '@material-ui/core';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const currencies = [
	{
		value: 'USD',
		label: '$',
	},
	{
		value: 'EUR',
		label: '€',
	},
	{
		value: 'BTC',
		label: '฿',
	},
	{
		value: 'JPY',
		label: '¥',
	},
];

function InputBox({ displayCoin, isWallet }) {
	const [currency, setCurrency] = React.useState('EUR');

	const handleChange = (event) => {
		setCurrency(event.target.value);
	};
	return (
		<Paper
			component='form'
			sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}
		>
			<div style={{ display: 'flex' }}>
				<IconButton sx={{ p: '10px' }} aria-label='menu'>
					{isWallet ? <AttachMoneyIcon /> : <AccountBalanceWalletIcon />}
				</IconButton>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					fullWidth
					placeholder='Enter Amount'
					inputProps={{ 'aria-label': 'enter amount' }}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
				<TextField
					id='filled-select-currency'
					select
					value={currency}
					onChange={handleChange}
					variant='filled'
					sx={{ ml: 1, flex: 1, display: displayCoin ? '' : 'none' }}
				>
					{currencies.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			</div>
		</Paper>
	);
}

export default InputBox;
