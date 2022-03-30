import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(fat, carbs, protein) {
	return { fat, carbs, protein };
}

const rows = [
	createData('Eclair', 262, 16.0),
	createData('Cupcake', 305, 3.7),
	createData('Gingerbread', 356, 16.0),
];

function OrderBook() {
	return ( 
		<Box styles={{ borderRight: 'double', overflow: 'hidden', maxWidth: '50%', boxSizing: 'border-box' }}>
			<Typography style={{fontSize:'1.5rem'}} variant='h4'>Order Book</Typography>
			<TableContainer component={Box}>
				<Table
					size='large'
					fixedHeader={false}
					sx={{
						[`& .${tableCellClasses.root}`]: {
							borderBottom: 'none',
						},
						tableLayout: 'auto' 
					}}
				>
					<TableHead>
						<TableRow sx={{width: `calc(100% - 100px)`, margin: 0}}>
							<TableCell style={{fontSize:'0.8rem'}}>Fat&nbsp;(g)</TableCell>
							<TableCell>Carbs&nbsp;(g)</TableCell>
							<TableCell>Protein&nbsp;(g)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell>{row.fat}</TableCell>
								<TableCell>{row.carbs}</TableCell>
								<TableCell>{row.protein}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default OrderBook;
