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
		<Box styles={{ borderRight: 'double' }}>
			<Typography variant='h4'>Order Book</Typography>
			<TableContainer component={Box}>
				<Table
					style={{ minWidth: 700 }}
					size='large'
					sx={{
						[`& .${tableCellClasses.root}`]: {
							borderBottom: 'none',
						},
					}}
				>
					<TableHead>
						<TableRow>
							<TableCell>Fat&nbsp;(g)</TableCell>
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
