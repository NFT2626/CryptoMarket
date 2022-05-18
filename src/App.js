//This is the main driver of the application
//This is where routes are initialised and global variables are declared
// such that it removes the need to re-render and execute the functions everytime to get the desired value

// Importing Libraries
import React, { Suspense, useEffect, useState } from "react"; // framework used for the agile approach
import axios from "axios"; // This is used to communicate with the backend
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // set up routes for the components
import { Steps } from "intro.js-react"; // Helps to construct the product tour for the application

//Importing CSS
import "./App.css";
import "intro.js/introjs.css";

//Importing components
import LoginPage from "./Login_Page/LoginPage";
import BodySection from "./DashBoard/BodySection/BodySection";
import DashBoard from "./DashBoard/DashBoard";
import HomePage from "./Home_Page/HomePage";
import ChartForm from "./Chart_Form/ChartForm";
import CoinMarketPrices from "./CoinMarketPrices/CoinMarketPrices";
import EditPortfolioPage from "./Edit_Portfolio_Page/EditPortfolioPage";
import SignUpPage from "./SignUp_Page/SignUpPage";
import PortfolioPage from "./Portfolio_Page/PortfolioPage";

import NotFoundPage from "./Not_Found_Page/NotFoundPage";
import TransactionHistoryPage from "./Transaction_History_Page/TransactionHistoryPage";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import HelpPage from "./Help_Page/HelpPage";

import {
  GET_CURRENT_USER,
  ADD_PORTFOLIO_DATE_VALUE,
  GET_ALL_USERS,
  NOW_BUY_LIMIT,
  NOW_SELL_LIMIT,
  GET_NEWLY_ADDED_COINS,
  GET_BIGGEST_GAINER_COINS,
} from "./queries"; // requests to the backend i've constructed
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"; // different function allows for

export default function App() {
  //Usestates would cause rerenders of the page only if the date has been changed using the hooks
  const [coins, setCoins] = useState([]); // The coins from the coin gecko api
  const [token, setToken] = useState(null); // User token used for verification and user identification
  const [steps, setSteps] = useState(); // steps for the tour

  const [stepsEnabled, setStepsEnabled] = useState(false); //If the tour is active or not
  const [initialStep, setInitialStep] = useState(0); //The beginning of the product tour
  const [getUser, { loading, error, data }] = useLazyQuery(GET_CURRENT_USER, { // Gets the user data only if the function gets executed
    pollInterval: 300000, //It gets the user data every 3 minutes
  });
  const onExit = () => {
    setStepsEnabled(false); //Once the user clicks outside, the tour is no longer active. 
  };
  const userAllRes = useQuery(GET_ALL_USERS); //Gets all the data of all users on this platform
  const newAddedCoinsRes = useQuery(GET_NEWLY_ADDED_COINS); // gets the newly added coins that are scrapped from coinmarketcap
  const biggestGainersRes = useQuery(GET_BIGGEST_GAINER_COINS); // gets the biggest gained coins that are scrapped from coinmarketcap
  const [addPortfolioDateValue] = useMutation(ADD_PORTFOLIO_DATE_VALUE, { //This is a function that adds a date of a particular portfolio value into my api
    refetchQueries: [{ query: GET_CURRENT_USER }], //Once the function has been executed it will then retrieve the data for the current user
    onError: (error) => {
      console.log(error.graphQLErrors[0].message); //If there is an error, it will be outputted here
    },
  });
  const [nowBuyLimit] = useMutation(NOW_BUY_LIMIT, { //This function is used to make a buy limit transaction
    refetchQueries: [{ query: GET_CURRENT_USER }], //Once the function has been executed, it will get the data for the current user
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const [nowSellLimit] = useMutation(NOW_SELL_LIMIT, { //This function is used to make a sell limit transaction
    refetchQueries: [{ query: GET_CURRENT_USER }], // Once its been executes, get the data for the user
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => { //The Use Effect will not cause rerenders and as such it will only be executed once when the function is called.
    if (localStorage.getItem("user-token")) { //Check if there is a token of the user in the local storage
      setToken(localStorage.getItem("user-token")); // If there is then it will set the token as the user token stored in the local storage
    }
  }, []);

  useEffect(() => { 
    //OVERALL
    //The user gets the coinmarket data for it to be rendered in the homepage
    //If the user is indeed logged in, then the data is then used to be used to add portfolio dates as well as 
    // making sure that the limit of either the buy and sell has been evaluated 
    if (!data) { // The data refers to the data of the current user, and checks if it has the data for the user
      axios
        .get(
          'axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        ) //Gets the data of all the coins in the coingecko api 
        .then((res) => { //The callback function would have the result as its parameter
          setCoins(res.data); //The result would have multiple fields and the data would be in the data field, and sets the coins of the coinmarketcap
        });
      return; //Once finished execution, it will return
    }
    if (!data) { //Checks if there is no data
      return; //Just returns
    }
    axios //Gets data from the coingecko api 
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {  //res refers the data of the coins from the coin market 
        const totalAsset = data.me?.portfolioCoins.reduce((total, item) => {  //Calculates the total asset value through looping through the coins from the user portfolio and adding them altogether
          const coin = res.data.find((el) => el.name === item.name); //Finds the coin that has the name identical to the coin from the user portfolio from the coins that are obtained from the api request 
          return total + coin.current_price * item.quantity; // Returns the total calculated throughout the loop + the current price of the coin multiplied by the amount of that coin that is owned by the user
        }, data.me.fiatBalance); //Adds the total asset from the amount of fiat the user owns NOTE: Fiat is in terms of USD and it is the amount of flat dollars the user owns, I will not be referring to this again
        setCoins(res.data); //Updates the coin market data by setting it again
        addPortfolioDateValue({ variables: { assetValueTotal: totalAsset } }); // Sends a requests to be added as part of the portfolio of that date
        data.me.limitCoins.forEach((coin) => { //Loops through the limit Coins so that it can be evaluated using the current market data
          const priceOfCoin = res.data.find(
            (el) => el.name === coin.name 
          ).current_price; // Finds the current Price of the coin
          if (priceOfCoin <= coin.bought_price && coin.type === "BuyLimit") { //Check if it the limit's bought price is less than or equal to the current market prices as well as if it is buying the limit
            nowBuyLimit({
              variables: {
                name: coin.name,
                boughtPrice: coin.bought_price,
                quantity: coin.quantity,
                id: coin.id,
              }, // Sends a request to execute the buying limit
            });
          } else if (
            priceOfCoin >= coin.bought_price && 
            coin.type === "SellLimit" //Check if the price of the coin is greater or equal and the user is putting a selling limit
          ) {
            nowSellLimit({
              variables: {
                name: coin.name,
                sellPrice: coin.bought_price,
                quantity: coin.quantity,
                id: coin.id,
              },
            }); // Sends a request to execute the selling limit
          }
        });
      });
  }, [data]); //The UseEffect is dependent on the data of the user, if it changes, the hook will be executed again
  // Referring upwards
  //The hook will update the portfolio value Everytime the user data changes through refetching eg. (Buy a coin, sell a coin, etc....)

  useEffect(() => {
    getUser(); //Gets the data of the user
  }, [token]); //This hook is executed everytime the token of the user changes

  if (
    loading ||
    userAllRes.loading ||
    !coins ||
    !data ||
    newAddedCoinsRes.loading ||
    biggestGainersRes.loading
  ) { //Checks if the data has been loaded
    return (
      <div>
        <LoadingScreen /> 
      </div>
    ); //Loads the loading screen
  }


//If the user doesn't have the token which means that the user haven't logged in, it will display the homepage for them
//If the user haven't logged in, then the user is able to gain the ability to login and signup through going to either of the routes
  if (!token) {
    return (
      <>
      {/* In the last element, the user if the user goes to a route that does not exist, it will display the notfound page */}
        <Router>
          <Routes>
            <Route path="/SignUp" element={<SignUpPage />} />
            <Route path="/Login" element={<LoginPage setToken={setToken} />} />
            <Route path="/" element={<HomePage coins={coins} />} />
            <Route
              path="*"
              element={
                <NotFoundPage content="Return back to Home Page" link="/" /> 
              } 
            />
          </Routes>
        </Router>
      </>
    );
  }

  return (
    <Suspense fallback={<h1>Loading profile...</h1>}> {/* The component is yet to render
     {/* Establishes the different routes of the main components */}
      <div>
        <Router>
          <Routes>
            <Route
              path="/DashBoard"
              element={
                <DashBoard
                route="dashboard"
                  name={data}
                  setStepsEnabled={setStepsEnabled}
                  setToken={setToken}
                  accounts={userAllRes.data.allUsers}
                >
                  <BodySection
                    account={data.me}
                    setSteps={setSteps}
                    coins={coins}
                    allUsers={userAllRes.data.allUsers}
                  />
                  <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={onExit}
                  />
                </DashBoard>
              }
            />
            <Route
              path="/DashBoard/profile"
              element={
                <DashBoard
                  setStepsEnabled={setStepsEnabled}
                  name={data}
                  setToken={setToken}
                  accounts={userAllRes.data.allUsers}
                >
                  <EditPortfolioPage account={data.me} setSteps={setSteps} />
                  <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={onExit}
                  />
                </DashBoard>
              }
            />
            <Route
              path="/DashBoard/CoinMarketPrices"
              element={
                <DashBoard
                  setStepsEnabled={setStepsEnabled}
                  name={data}
                  setToken={setToken}
                  accounts={userAllRes.data.allUsers}
                  route="coinmarketprices"
                >
                  <CoinMarketPrices
                    setSteps={setSteps}
                    coins={coins}
                    newAddedCoins={newAddedCoinsRes.data.getNewlyAddedCoins}
                    biggestGainers={biggestGainersRes.data.getBiggestGainers}
                  />{" "}
                  <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={onExit}
                  />
                </DashBoard>
              }
            />
            <Route
              exact
              path="/DashBoard/ChartForm"
              element={
                <DashBoard
                  setStepsEnabled={setStepsEnabled}
                  name={data}
                  setToken={setToken}
                  accounts={userAllRes.data.allUsers}
                  route="trading"
                >
                  <ChartForm
                    coins={coins}
                    account={data.me}
                    setSteps={setSteps}
                  />
                  <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={onExit}
                  />
                </DashBoard>
              }
            />
            <Route
              exact
              path="/DashBoard/TransactionHistory"
              element={
                <DashBoard
                  name={data}
                  setToken={setToken}
                  accounts={userAllRes.data.allUsers}
                >
                  <TransactionHistoryPage account={data.me} />
                </DashBoard>
              }
            />
            <Route
              exact
              path="/DashBoard/Help"
              element={
                <DashBoard
                  name={data}
                  setToken={setToken}
                  accounts={userAllRes.data.allUsers}
                >
                  <HelpPage />
                </DashBoard>
              }
            />

            <Route
              exact
              path="/DashBoard/Portfolio"
              element={
                <DashBoard
                  setStepsEnabled={setStepsEnabled}
                  name={data}
                  setToken={setToken}
                  accounts={userAllRes.data.allUsers}
                >
                  <PortfolioPage
                    allUsers={userAllRes.data.allUsers}
                    coins={coins}
                    setSteps={setSteps}
                  />
                  <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={onExit}
                  />
                </DashBoard>
              }
            />
            <Route
              exact
              path="/DashBoard/Portfolio/:account"
              element={
                <DashBoard
                  name={data}
                  setStepsEnabled={setStepsEnabled}
                  setToken={setToken}
                  accounts={userAllRes.data.allUsers}
                >
                  <PortfolioPage
                    allUsers={userAllRes.data.allUsers}
                    coins={coins}
                    setSteps={setSteps}
                  />
                  <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={onExit}
                  />
                </DashBoard>
              }
            />
            <Route
              exact
              path="/DashBoard/ChartForm/:coin"
              element={
                <DashBoard
                route="trading"

                  name={data}
                  setStepsEnabled={setStepsEnabled}
                  setToken={setToken}
                  accounts={userAllRes.data.allUsers}
                >
                  <ChartForm
                    coins={coins}
                    account={data.me}
                    setSteps={setSteps}
                    coins={coins}
                  />
                  <Steps
                    enabled={stepsEnabled}
                    steps={steps}
                    initialStep={initialStep}
                    onExit={onExit}
                  />
                </DashBoard>
              }
            />
            <Route
              path="*"
              element={
                <NotFoundPage
                  content="Return back to Dashboard"
                  link="/DashBoard"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}
