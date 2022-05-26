import React, { useState } from "react";
import {
  Paper,
  IconButton,
  InputBase,
  TextField,
  MenuItem,
  Divider,
} from "@material-ui/core";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

function InputBox({
  displayCoin,
  isWallet,
  setCurrency,
  currency,
  content,
  handleValue,
  value,
  currencies,
}) {
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 500 }}
    >
      <div style={{ display: "flex" }}>
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          {isWallet ? ""  : <AccountBalanceWalletIcon />}
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          fullWidth
          placeholder={content}
          value={value}
          onChange={handleValue}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <TextField
          id="filled-select-currency"
          select
          value={currency}
          onChange={handleChange}
          variant="filled"
          sx={{ ml: 1, flex: 1 }}
          style={{ display: isWallet ? "" : "none" }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value.name} value={option.value.name}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Paper>
  );
}

export default InputBox;
