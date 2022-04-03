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

import axios from "axios";

const drawerWidth = 240;

export default function DashBoard(props) {

  const [open, setOpen] = useState(false);

  const [coins, setCoins] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);

      })
      .catch((error) => console.log(error));
  });
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

  return (
    <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`
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
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon style={{ color: "white" }} />
              </Badge>
            </IconButton>
            <div>
              <IconButton
                color="inherit"
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar alt="Cindy Baker" src="/Images/Face.jpeg" />
                  <Typography
                    sx={{ marginLeft: "10px !important", color: "white" }}
                  >
                    {" "}
                    Harry Guan
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
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom"
                    }}
                  >
                    <Paper
                      style={{
                        transform: "translateX(30px)",
                        alignItems: "center"
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
                            pl: 8,
                            transform: "translateX(-20%)"
                          }}
                        >
                          <MenuItem onClick={handleClose}>
                            <Link
                              style={{ textDecoration: "none" }}
                              to="/DashBoard/Profile"
                            >
                              Profile
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>Settings</MenuItem>
                          <MenuItem onClick={handleClose}>My account</MenuItem>
                          <MenuItem onClick={handleClose}><Link
                              style={{ textDecoration: "none" }}
                              to="/"
                            >
                              Logout
                            </Link></MenuItem>
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
              boxSizing: "border-box"
            }
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <List>
            <Divider />
            <Typography sx={{ paddingLeft: 2, paddingTop: 2, pb: 2 }}>
              {" "}
              Personal{" "}
            </Typography>
            <ListItem button key="dashboard">
              <Divider
                sx={{ borderRightWidth: 5, ml: -2, background: "#1776D1" }}
                orientation="vertical"
                flexItem
              />
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="dashboard" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/DashBoard/CoinMarketPrices"
              key={"coinmarketprices"}
            >
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="coinmarketprices" />
            </ListItem>

            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
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
