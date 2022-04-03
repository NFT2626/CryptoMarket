import React, {useState} from 'react';
import {Box, IconButton, InputBase, TextField, MenuItem, Divider, Typography, Tabs, Tab, Paper, Grid, Button} from "@material-ui/core"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


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

const BuyForm = () => {
    const [limit, setLimit] = useState(0)
    const [currency, setCurrency] = useState('EUR');

	const handleCurrencyChange = (event) => {
		setCurrency(event.target.value);
	};
    
    const handleLimitChange = (event,newValue) => {
        setLimit(newValue);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
          email: data.get("email"),
          password: data.get("password")
        });
      };

	return <Box>
        <Box style={{backgroundColor: 'grey', paddingLeft: 10, paddingRight: 15}}>
         <Tabs
        value={limit}
        onChange={handleLimitChange}
        indicatorColor="primary"
      >
        <Tab tabItemContainerStyle={{width: '20px'}}
  style={ {minWidth: 20,
    paddingLeft: 0,
    paddingRight: 0,
letterSpacing: '-0.1em', fontSize: '0.8em'}}
   label="Limit" index={0}/>
        <Tab style={ {minWidth: 20,
    paddingLeft: 0,
    paddingRight: 0,
letterSpacing: '-0.1em', fontSize: '0.8em', marginLeft: '10px'}} index={1} label="Market" />
      </Tabs>

</Box>
            <Box >
                <caption style={{display:"inline", fontSize: 10}}> Available Balance: 9.9999 USDT</caption>
                <Paper
			component='form'
            elevation={0}
            onSubmit={handleSubmit}
		>
			<Grid container>
                <Grid item xs={12}>
                <div style={{display:'flex',  backgroundColor: 'grey', marginTop: '1.5rem'}}>
				<IconButton aria-label='menu'>
					<AttachMoneyIcon /> 
				</IconButton>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					fullWidth
					placeholder='Enter Price'
					inputProps={{ 'aria-label': 'enter amount' }}
				/>
                </div>
                </Grid>
                <Grid item xs={12}>
                <div style={{display:'flex',  backgroundColor: 'grey', marginTop: '2rem'}}>
				<IconButton aria-label='menu'>
					<AttachMoneyIcon /> 
				</IconButton>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					fullWidth
					placeholder='Amount'
					inputProps={{ 'aria-label': 'enter amount' }}
				/>
                </div>
                </Grid>
                <Grid item xs={6}>
                        <Button fullWidth style={{backgroundColor: 'green', maxWidth: '70%', maxHeight: '25vh', marginLeft: '10px', marginTop: '10px'}}> Buy Now </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button fullWidth style={{backgroundColor: 'red', maxWidth: '70%', maxHeight: '25vh', marginLeft: '10px', marginTop: '10px'}}> Sell Now</Button>
                    </Grid>
                </Grid>
		</Paper>
                </Box>

    </Box>
};

export default BuyForm;
