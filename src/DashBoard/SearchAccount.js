import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";



function SearchAccount({accounts}) {
  const [searchValue, setSearchValue] = useState();
  const navigate = useNavigate()
  const handleChange = (e, value) => {
    // what to do here?
    console.log(value)
    if(value && !accounts.some((el) => el?.label === value?.label)) {
      navigate(`/Dashboard/Portfolio/${value?.label}`)
    }
  };
  
  return (
    <Autocomplete
    sx={{ width: 600}}
    style={{background: "white"}}
    options={accounts.map((account) => ({...account, label: account.username}))}
    autoHighlight
    variant="filled"
    onChange={handleChange}
    selectOnFocus
    clearOnBlur
    freeSolo
    clearOnEscape={true}
    renderOption={(props, option) => (
      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
        <Avatar
        sx={{margin:1}}
          src={`${option.imageProfile}`}
          alt=""
        />
        {option.username} 
      </Box>
    )}
    renderInput={(params) => {
        return (
      <TextField
        {...params}
        label="Look up user portfolio"
  
  />)}
    }
/>

  )

}

export default SearchAccount