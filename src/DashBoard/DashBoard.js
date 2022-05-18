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

import SearchAccount from "./SearchAccount";
import Button from "@mui/material/Button";

import { IconButton, Badge } from "@material-ui/core";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Paper } from "@material-ui/core";
import "./dashboard.css";
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

const drawerWidth = 240;

export default function DashBoard(props) {
  const [open, setOpen] = useState(false);
  const client = useApolloClient();
  const navigate = useNavigate()

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const logOut = (event) => {
    event.preventDefault();
    props.setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate("/");
  };
  const handleOnlineHelp = (event) => {
    event.preventDefault();
    navigate("/DashBoard/Help");
  };
  const handleOpenAccount = (event) => {
    event.preventDefault();
    console.log("this should be working");
    navigate(`/DashBoard/Portfolio/${props.name.me.username}`);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  if (!props.name.me) {
    return (
      <div>
        {" "}
        <h1>loading... sorry for the lag</h1>
      </div>
    );
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar sx={{ backgroundColor: "#4050B5" }}>
          <Typography
            sx={{ color: "white" }}
            variant="h6"
            noWrap
            component="div"
          >
            DashBoard
          </Typography>
          <Box sx={{ flexGrow: 0.5 }} />
          <SearchAccount accounts={props.accounts} />
          <Box sx={{ flexGrow: 0.5 }} />
          <Button
            variant="contained"
            style={{ display: props.setStepsEnabled ? "" : "none",backgroundColor: "orange" }}
            onClick={() => {
              props.setStepsEnabled(true);
            }}
          >
            {" "}
            Overview tour{" "}
          </Button>
          <div>
            <IconButton
              className="step2"
              color="inherit"
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar alt="Cindy Baker" src={props.name.me.imageProfile} />
                <Typography
                  sx={{ marginLeft: "10px !important", color: "white" }}
                >
                  {" "}
                  {props.name.me.name + " " + props.name.me.lastName}
                </Typography>
                <ArrowDropDownIcon style={{ color: "white" }} />
              </Box>
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
              sx={{ ml: 3 }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper
                    style={{
                      transform: "translateX(30px)",
                      alignItems: "center",
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
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
                        <MenuItem onClick={handleClose}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to="/DashBoard/Profile"
                          >
                            Edit your Portfolio
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleOpenAccount}>
                          My account
                        </MenuItem>
                        <MenuItem onClick={handleOnlineHelp}>
                          Help & Services
                        </MenuItem>

                        <MenuItem onClick={logOut}>LogOut</MenuItem>
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
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List className="step10">
        <Button to="/DashBoard"
            component={Link} variant="contained" style={{ fontWeight: 900, letterSpacing: "2px", color: "black", backgroundColor: 'white', marginLeft: "22.5%", marginTop: "-25%", fontSize: 20}}> CrySim. </Button>
          <Divider />
          <Typography variant="h6" sx={{ paddingLeft: 2, paddingTop: 2, pb: 2 }}>
            {" "}
            Personal{" "}
          </Typography>
          <ListItem
          style={{paddingLeft: 10}}
            button
            to="/DashBoard"
            component={Link}
            button
            key="dashboard"
            selected={props.route === "dashboard"}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="dashboard" />
          </ListItem>
          <ListItem
            button
            style={{paddingLeft: 10}}
            component={Link}
            to="/DashBoard/CoinMarketPrices"
            key={"coinmarketprices"}
            selected={props.route === "coinmarketprices"}

          >
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="coinmarketprices" />
          </ListItem>
          <ListItem
            button
            style={{paddingLeft: 10}}
            selected={props.route === "trading"}
            component={Link}
            to="/DashBoard/ChartForm/bitcoin"
            key={"trading"}
          >
            <ListItemIcon>
              <CatchingPokemonIcon />
            </ListItemIcon>
            <ListItemText primary="trading"
                       
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
        {props.children}
      </Box>
    </Box>
  );
}
