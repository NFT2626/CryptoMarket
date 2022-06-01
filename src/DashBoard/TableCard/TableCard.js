//importing libraries
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

//this component is responsible for displaying the data for which the user can decide straight a way in the dashboard page of the application

const TableCard = ({ coins }) => {
  return (
    <Box style={{ maxHeight: 600, padding: 10 }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom //title of the component
      >
        {" "}
        Live cryptoData
      </Typography>
      <TableContainer style={{ maxHeight: 400 }} component={Paper} //table container
      >
        <Table stickyHeader //table
        > 
          <TableBody>
            {coins.map((coin, idx) => ( //go through each of the coins for it to be constructed as a row
              <TableRow key={idx}  //row
              >
                <TableCell component="th" scope="row" //cell
                >
                  <Avatar //the image of the coin
                    style={{ width: 30, height: 30 }}
                    alt="Some cryptocurrency icon"
                    src={coin.image}
                  />
                </TableCell>
                <TableCell //name of the coin
                >{coin.name}</TableCell>
                <TableCell align="right" //current price of the coin
                >${coin.current_price}</TableCell>
                <TableCell align="right">
                  {" "}
                  <span
                    style={{ //displays the marketcap changes and see if it is lower than 0 if it is then display red else green
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

export default TableCard; //return component
