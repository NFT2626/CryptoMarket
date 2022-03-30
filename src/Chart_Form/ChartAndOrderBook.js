import React, { useState } from 'react';
import { Button, Typography, Box, Container, ButtonGroup } from '@material-ui/core';
import SelectorCoin from './SelectorCoin';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import './ChartAndOrderBook.css';
import { Divider } from '@mui/material';
import NumberCard from './NumberCard';
import Chart from './Chart';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ChartAndOrderBook({coinName}) {
	const [isSectioned, setSectioned] = useState(false);
	return (
		<div>
			{/* <Grid container sx={{pl:30}} spacing={8} alignItems="center" justifyContent="space-around">
                <Grid item xs={4} >
                    <Typography variant="h4" gutterBottom={true} color="textPrimary"> Coin</Typography>
                </Grid>    
                <Grid item xs={8}>
                    <Box sx={{display: 'inline-flex', flexDirection: 'row'}}>
                        <NumberCard content="Daniel" number="1969" variant= "h6" />
                        <NumberCard content="Card1" number="1969" variant= "h6" />
                    </Box>
                </Grid>
            </Grid> */}
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', px: 5 }}>
						<Typography variant='h4' color='textPrimary'>
							{' '}
							{coinName}
						</Typography>
						<KeyboardArrowUpIcon
							sx={{ ml: 3 }}
							className={isSectioned && 'box-keyboard--hover'}
							onMouseEnter={() => {
								console.log(isSectioned);
								setSectioned(true);
							}}
						/>
						<Box
							className='section-box'
							onMouseLeave={() => {
								setSectioned(false);
							}}
							sx={{ display: isSectioned ? 'flex' : 'none', flexDirection: 'column' }}
						>
							<div>
								<Box
									className={isSectioned ? '' : 'outofPage'}
									sx={{ display: 'flex', alignItems: 'flex-end', px: 10, overflow: 'hidden' }}
								>
									<SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
									<TextField id='input-with-sx' label='search' variant='standard' />
								</Box>
							</div>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'baseline',
								}}
							>
								<Button>USDT</Button>
								<Button>BTC</Button>
								<SelectorCoin />
							</Box>
						</Box>
					</Box>
					<Divider
						orientation='vertical'
						flexItem
						sx={{ borderColor: '#252930' }}
						variant='middle'
					/>
					<Container sx={{ flex: 1 }}>
						<Box sx={{ display: 'flex', flexDirection: 'row' }}>
							<NumberCard content='Daniel' number='1969' variant='h6' />
							<NumberCard content='Card1' number='1969' variant='h6' />
						</Box>
					</Container>
				</Box>
				<Box sx={{ borderTop: 'double' }}>
					<Box sx={{ marginLeft: '10vh', marginBottom: '1vh', marginTop: '1vh' }}>
						<ButtonGroup
							sx={{
								border: 'none',
								outline: 'none',
							}}
							aria-label='outlined primary button group'
						>
							<Button>15m</Button>
							<Button>1h</Button>
							<Button>1D</Button>
							<Button>1W</Button>
						</ButtonGroup>
					</Box>
				</Box>
				<Chart />
			</Box>
		</div>
	);
}

export default ChartAndOrderBook;
