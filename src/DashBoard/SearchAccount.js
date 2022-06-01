//importing libraries
import React, { useState} from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

//this component is responsible for allowing the user to search different user accounts
function SearchAccount({ accounts }) {
  //initialising states 
  const [searchValue, setSearchValue] = useState(); // the search details

  const navigate = useNavigate(); //allows the user to navigate to different pages
  const handleChange = (e, value) => {
    //this is executed whenever the user clicks on the combination box or clicks submit
    // i used ? because value can be null
    if (value ) { // if there is value 
      navigate(`/Dashboard/Portfolio/${value?.label}`); //go to that profile page
    }
  };

  return (
    <Autocomplete //autocompleter
      className="step1"
      sx={{ width: "30%" }}
      style={{ background: "white" }}
      options={accounts.map((account) => ({ 
        //loop through each of the accounts and create the options which are the combination boxes with the account details
        //the label is the account username 
        ...account, 
        label: account.username,
      }))}
      autoHighlight
      variant="filled"
      onChange={handleChange} //handles the changes
      selectOnFocus
      clearOnBlur
      freeSolo
      clearOnEscape={true}
      renderOption={(props, option) => ( //this is how it is rendered
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props} 
        >
          <Avatar sx={{ margin: 1 }} src={`${option.imageProfile}`} alt=""  //the username as well as the image
          />
          {option.username}
        </Box>
      )}
      renderInput={(params) => { 
        return <TextField {...params} label="Look up user portfolio"  //the textfield
        />;
      }}
    />
  );
}

export default SearchAccount;
