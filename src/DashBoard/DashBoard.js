//importing libraries
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
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import Avatar from "@mui/material/Avatar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Button from "@mui/material/Button";
import { IconButton, Badge } from "@material-ui/core";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Paper } from "@material-ui/core";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//importing components
import SearchAccount from "./SearchAccount";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
//importing css
import "./dashboard.css";

const drawerWidth = 240; //the drawer width

export default function DashBoard(props) { //as this is a parent component it will take props as it's parameters
  const [open, setOpen] = useState(false); //if the combination box is open or not
  const client = useApolloClient(); //used for logging out to erase the data from the apolloclient
  const navigate = useNavigate() // allows the user to navigate to different pages

  const anchorRef = useRef(null); //this sets the anchor so that the user is able to see a dropdown

  const handleToggle = () => { //sets the dropdown display
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => { //handles whenever the user closes the dropdown
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const logOut = (event) => { //once the user logs out
    event.preventDefault();  //prevents reloading
    props.setToken(null); //sets the token to be null
    localStorage.clear(); //clears the localStorage
    client.resetStore(); //rests the apollo client
    navigate("/"); //navigate back to the landing page
  };
  const handleOnlineHelp = (event) => {//navigates to the online help 
    event.preventDefault();
    navigate("/DashBoard/Help");
  };
  const handleOpenAccount = (event) => { 
    //navigates to the porofile page of the user
    event.preventDefault();
    navigate(`/DashBoard/Portfolio/${props.name.me.username}`);
  };

  function handleListKeyDown(event) {
    //if the user enters the the tab key
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false); //removes the menu dropdown
    } else if (event.key === "Escape") {
      //if enters escape
      setOpen(false); //removes the menu dropdown
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  if (!props.name.me) { //if the user data has yet to be loaded display it is still loading
    return (
      <div>
        {" "}
        <LoadingScreen />
      </div>
    );
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`, //calculates the amount that the content can be displayed
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar sx={{ backgroundColor: "orange" }}>
          <Typography
            sx={{ color: "white" }}
            variant="h6"
            noWrap
            component="div" //the title of the page
          >
            DashBoard
          </Typography>
          <Box sx={{ flexGrow: 0.5 }} //centers the search bar for the accounts
          />
          <SearchAccount accounts={props.accounts}  //allows the user to search other people's profile
          />
          <Box sx={{ flexGrow: 0.5 }} />
          <Button
            variant="contained" //button that allows the user to activate the product tour
            style={{ display: props.setStepsEnabled ? "" : "none",backgroundColor: "orange" }}
            onClick={() => {
              props.setStepsEnabled(true); //sets the product tour to be active
            }}
          >
            {" "}
            Overview tour{" "}
          </Button>
          <div>
            <IconButton //this is the button that allows the user to see a menu dropdown
              className="step2"
              color="inherit"
              ref={anchorRef} //get access to that component
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle} //activates this function once clicked
            >
              <Box sx={{ display: "flex", alignItems: "center" }} //styling
              >
                <Avatar alt="image" src={props.name.me.imageProfile}  //the image of the user
                />
                <Typography //the name and lastname of the user
                  sx={{ marginLeft: "10px !important", color: "white" }}
                >
                  {" "}
                  {props.name.me.name + " " + props.name.me.lastName}
                </Typography>
                <ArrowDropDownIcon style={{ color: "white" }}  //icon to represent the dropdown
                />
              </Box>
            </IconButton>
            <Popper
              open={open} //the actual dropdown and is active if the open is true
              anchorEl={anchorRef.current} //the anchorRef prop that provides access
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
              sx={{ ml: 3 }}
            >
              {({ TransitionProps, placement }) => (
                <Grow //transitionProps are just styling defined in the Popper component
                  {...TransitionProps} 
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom", //placement 
                  }}
                >
                  <Paper
                    style={{
                      transform: "translateX(30px)",
                      alignItems: "center",
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClose} //listens to whenever the user clicks away if so activates the handlClose function
                    >
                      <MenuList //the UI representation of the menu
                        autoFocusItem={open} //it is focused if open is true
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          paddingLeft: 8,
                          transform: "translateX(-20%)",
                        }}
                      >
                        <MenuItem 
                        >
                          <Link //clicks and directs to the profile page to allow user to edit profile 
                            style={{ textDecoration: "none" }}
                            to="/DashBoard/Profile"
                          >
                            Edit your Portfolio
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleOpenAccount} //clicks and directs user to the account page
                        >
                          My account
                        </MenuItem>
                        <MenuItem onClick={handleOnlineHelp} //clicks and directs user to the online help page
                        >
                          Online help
                        </MenuItem>

                        <MenuItem onClick={logOut} //clicks to logout the user
                        >LogOut</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,//the left hand side of the screen that displays the different menus
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth, //it's width
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left" //placement
      >
        <Toolbar />
        <List className="step10">
        <Button to="/DashBoard" //Icon button that allows the user to direct to the dashboard
            component={Link} variant="contained" style={{ fontWeight: 900, letterSpacing: "2px", color: "black", backgroundColor: 'white', marginLeft: "22.5%", marginTop: "-25%", fontSize: 20}}> CrySim. </Button>
          <Divider />
          <Typography variant="h6" sx={{ paddingLeft: 2, paddingTop: 2, pb: 2 }}
          //provides context of the following sets of buttons
          >
            {" "}
            Personal{" "}
          </Typography>
          <ListItem
          style={{paddingLeft: 20}}
            button ///button that directs user to the dashboard
            to="/DashBoard"
            component={Link}
            button
            key="dashboard"
            sx={{ '&.Mui-selected': {
              backgroundColor: "orange",
              fontWeight: 600
          },}}
            selected={props.route === "dashboard"} //highlights it whether it is on that page 
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button //button that directs the user to the coinmarket price page
            style={{paddingLeft: 20}}
            component={Link}
            to="/DashBoard/CoinMarketPrices"
            key={"coinmarketprices"}
            sx={{
        // this is to refer to the prop provided by M-UI
                '&.Mui-selected': {
                  backgroundColor: "orange",
                  fontWeight: 600
              },
            }}
            selected={props.route === "coinmarketprices"}//highlights it whether it is on that page 

          >
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Coin Market Prices" />
          </ListItem>
          <ListItem
            button //button that directs the user to the trading page IE. bitcoin 
            style={{paddingLeft: 20}}
            sx={{ '&.Mui-selected': {
              backgroundColor: "orange",
              fontWeight: 600
          },}}
            selected={props.route === "trading"} //highlights it whether it is on that page 
            component={Link}
            to="/DashBoard/ChartForm/bitcoin" 
            key={"trading"}
          >
            <ListItemIcon>
              <CatchingPokemonIcon />
            </ListItemIcon>
            <ListItemText primary="Trading"
                       
                        />
          </ListItem>
        </List>
        {/* <Divider /> */}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {props.children} {/* everything that is wrapped between dashboard is displayed here */}
      </Box>
    </Box>
  );
}
