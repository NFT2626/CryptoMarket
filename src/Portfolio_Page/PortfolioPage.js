//This is the page that displays other people portfolio or the users own portfolio

//Importing libraries
import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Avatar,
  Grid,
  Breadcrumbs,
  Paper,
} from "@material-ui/core"; //For styling like bootstrap
import { Link } from "react-router-dom"; //For allowing routes
import { useParams } from "react-router-dom"; //Gets the variable from the URL header 

//Importing components
import CoinDisplayCard from "./CoinDisplayCard.js";

function PortfolioPage({ allUsers, coins, setSteps }) {
  let { account } = useParams(); //get the account name from the URL params
  const userFound = allUsers.find((el) => el.username === account); //finds the account within the array of users so that we can get the details of that account
  useEffect(() => {
    //sets up the steps for the product tour
    setSteps([
      {
        element: ".profilePageStep1",
        intro:
          "This is where you can view the image of the searched account or your own portfolio",
      },
      {
        element: ".profilePageStep2",
        intro: "If you have written something, it would display here",
      },
      {
        element: ".profilePageStep3",
        intro:
          "Here you can view the coins that is owned by the searched account or your own portfolio",
      },
    ]);
  }, [setSteps]);
  if (!userFound) { //if the user does not exist display the following:
    return (
      <div>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" style={{	fontWeight: 400,
	padding: 0,
	textTransform: "uppercase",
	fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
	color: "rgba(118, 118, 118, 1)",}} //displays that the usr does not exist
  >User does not exist</Typography>
          <Breadcrumbs aria-label="breadcrumb" //breadcrumbs
          >
            <Link
              style={{ textDecoration: "none", color: "black" }}
              underline="hover"
              color="inherit"
              to="/DashBoard" //link to go to the dashboard
            >
              Dashboard
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              underline="hover"
              color="inherit" //shows that the user is at the account page of that account
              to={`/DashBoard/Portfolio/${account}`}
            >
              Profile Page
            </Link>
          </Breadcrumbs>
        </Box>{" "}
      </div>
    );
  }
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" style={{	fontWeight: 400,
	padding: 0,
	textTransform: "uppercase", //page to show the name and lastName of the profile
	fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
	color: "rgba(118, 118, 118, 1)",}}>
          {userFound.name} {userFound.lastName}
          {" Portfolio Page"}
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" //breadcrumbs
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            underline="hover"
            color="inherit" //link that directs user to the dashboard
            to="/DashBoard"
          >
            Dashboard
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            underline="hover"
            color="inherit" //show they are art the profile page
            to={`/DashBoard/Portfolio/${account}`}
          >
            Profile Page
          </Link>
        </Breadcrumbs>
      </Box>
      <Box flexGrow={1} />
      <Grid container style={{ marginTop: "10vh" }}>
        <Grid item xs={6}>
          <Avatar //image of the user
            style={{ height: "25rem", width: "25rem" }}
            src={userFound.imageProfile}
            className="profilePageStep1"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography style={{ fontSize: "2rem" }} color="primary" //the user's about me 
          >
            {" "}
            About me:
          </Typography>
          <Paper //this displays the user's aboutme details
            className="profilePageStep2"
            style={{
              background: "#e5e4e2",
              padding: "1rem",
              height: "40vh",
              fontFamily:
                "Big Caslon,Book Antiqua,Palatino Linotype,Georgia,serif",
            }}
          >
            <Typography style={{ display: "block" }} variant="body1">
              {" "} {/* if the user does not have an about me then it will display a placeholder else it will display the user's aboutme */}
              {!userFound.aboutMe
                ? "We are sure this guy is really good, it is just that he is a little too shy to talk about himself"
                : userFound.aboutMe}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography style={{ marginTop: "10vh" }} variant="h4" color="primary" //the portfolio coins
      >
        Portfolio Coins
      </Typography>
      <Box style={{ marginTop: "10vh" }} className="profilePageStep3">
        {userFound.portfolioCoins.map((coin) => {
          //loop through the portfolioCoins and have it be displayed within a card
          return (
            <CoinDisplayCard
              coin={coin}
              actualCoin={coins.find((el) => el.name === coin.name)}
            />
          );
        })}
      </Box>
    </div>
  );
}

export default PortfolioPage;
