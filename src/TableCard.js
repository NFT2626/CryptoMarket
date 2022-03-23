import {
	Table,
	TableContainer,
	TableBody,
	TableRow,
	TableCell,
	Paper,
	Box,
	Typography,
} from '@material-ui/core';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const TableCard = () => {
	return (
		<Box style={{ maxHeight: 600 }}>
			<Typography component='h2' variant='h6' color='primary' gutterBottom>
				{' '}
				Live cryptoData
			</Typography>
			<TableContainer style={{ maxHeight: 400 }} component={Paper}>
				<Table stickyHeader aria-label='simple table'>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.name}>
								<TableCell component='th' scope='row'>
									{row.name}
								</TableCell>
								<TableCell align='right'>{row.calories}</TableCell>
								<TableCell align='right'>{row.fat}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default TableCard;
