//importing libraries
import React from "react";
import {
  Paper,
  IconButton,
  InputBase,
  TextField,
  MenuItem,
  Divider,
} from "@material-ui/core";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
//the inputbox is the textfield that is compotentisd which is modular that allows the user to enter information ie. the walletaddress or the amount they are going to send
function InputBox({
  isWallet,
  setCurrency,
  currency,
  content,
  handleValue,
  value,
  currencies,
}) {
  const handleChange = (event) => { // event listener that allows the user to select currency
    setCurrency(event.target.value); //sets the currency
  };
  return (
    <Paper
      component="form" 
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 500 }}
    >
      <div style={{ display: "flex" }}>
        <IconButton sx={{ p: "10px" }} aria-label="menu" //Does nothing but is an icon that displays an image to indicate the coin
        >
          {isWallet ? ""  : <AccountBalanceWalletIcon />} {/* it will display a wallet if the input box is for inputting the wallet address else it will not display anything */}
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          fullWidth //the input is provided context by the content that is passed into whether it is for wallet address or entering the amount of a cryptocurrency
          placeholder={content}
          value={value}
          onChange={handleValue}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical"  //divides 
        />
        <TextField //this is the selector that allows the user to select currency
          id="filled-select-currency"
          select
          value={currency}
          onChange={handleChange}
          variant="filled"
          sx={{ ml: 1, flex: 1 }}
          style={{ display: isWallet ? "" : "none" }} //this is only displayed if this is not for inputting the wallet address
        >
          {currencies.map((option) => ( //loops the currencies 
            <MenuItem key={option.value.name} value={option.value.name} //allocated menuitem as the name and the value once clicked as the name as well
            >
              {option.label}
            </MenuItem> //displays the label ie. the name as well

          ))}
        </TextField>
      </div>
    </Paper>
  );
}

export default InputBox;
