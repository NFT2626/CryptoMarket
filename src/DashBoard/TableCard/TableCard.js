import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Typography,
  Avatar,
} from "@material-ui/core";

const TableCard = ({ coins }) => {
  return (
    <Box style={{ maxHeight: 600 }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {" "}
        Live cryptoData
      </Typography>
      <TableContainer style={{ maxHeight: 400 }} component={Paper}>
        <Table stickyHeader>
          <TableBody>
            {coins.map((coin, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  <Avatar
                    style={{ width: 30, height: 30 }}
                    alt="Some cryptocurrency icon"
                    src={coin.image}
                  />
                </TableCell>
                <TableCell>{coin.name}</TableCell>
                <TableCell align="right">${coin.current_price}</TableCell>
                <TableCell align="right">
                  {" "}
                  <span
                    style={{
                      color: `${
                        coin.market_cap_change_percentage_24h < 0
                          ? "red"
                          : "green"
                      }`,
                    }}
                  >
                    {coin.market_cap_change_percentage_24h}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableCard;
