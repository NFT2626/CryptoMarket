import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectorCoin() {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <FormControl
      variant="standard"
      sx={{ m: 1, minWidth: 50, boxSizing: "border-box" }}
    >
      <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
      <Select value={age} onChange={handleChange} label="Age">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectorCoin;
