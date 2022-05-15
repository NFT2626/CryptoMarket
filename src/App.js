// Importing Libraries
import React, { Suspense, useEffect, useState } from "react"; // framework used for the agile approach
import axios from "axios"; // This is used to communicate with the backend
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // set up routes for the components
//Importing CSS
import "./App.css";

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
import "intro.js/introjs.css";
import { Steps, Hints } from "intro.js-react";

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
  const [coins, setCoins] = useState([]);
  const [token, setToken] = useState(null);
  const [steps, setSteps] = useState();

  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [initialStep, setInitialStep] = useState(0);
  const [getUser, { loading, error, data }] = useLazyQuery(GET_CURRENT_USER, {
    pollInterval: 300000,
  });
  const onExit = () => {
    setStepsEnabled(false);
  };
  const userAllRes = useQuery(GET_ALL_USERS);
  const newAddedCoinsRes = useQuery(GET_NEWLY_ADDED_COINS);
  const biggestGainersRes = useQuery(GET_BIGGEST_GAINER_COINS);
  const [addPortfolioDateValue] = useMutation(ADD_PORTFOLIO_DATE_VALUE, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const [nowBuyLimit] = useMutation(NOW_BUY_LIMIT, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const [nowSellLimit] = useMutation(NOW_SELL_LIMIT, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (localStorage.getItem("user-token")) {
      setToken(localStorage.getItem("user-token"));
    }
  }, []);

  useEffect(() => {
    if (!data) {
      axios
        .get(
          'axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        )
        .then((res) => {
          setCoins(res.data);
        });
      return;
    }
    if (!data) {
      return;
    }
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        const totalAsset = data.me?.portfolioCoins.reduce((total, item) => {
          /*  price = res.data. */
          console.log("this should be executing");
          const coin = res.data.find((el) => el.name === item.name);
          return total + coin.current_price * item.quantity;
        }, data.me.fiatBalance);
        setCoins(res.data);
        addPortfolioDateValue({ variables: { assetValueTotal: totalAsset } });
        data.me.limitCoins.forEach((coin) => {
          const priceOfCoin = res.data.find(
            (el) => el.name === coin.name
          ).current_price;
          if (priceOfCoin <= coin.bought_price && coin.type === "BuyLimit") {
            console.log("this is the coin", coin);
            nowBuyLimit({
              variables: {
                name: coin.name,
                boughtPrice: coin.bought_price,
                quantity: coin.quantity,
                id: coin.id,
              },
            });
          } else if (
            priceOfCoin >= coin.bought_price &&
            coin.type === "SellLimit"
          ) {
            console.log("this is the coin that is selling", coin);
            nowSellLimit({
              variables: {
                name: coin.name,
                sellPrice: coin.bought_price,
                quantity: coin.quantity,
                id: coin.id,
              },
            });
          }
        });
        const d = new Date();
        let time = d.getTime();
        console.log(time);
      });
  }, [data]);

  useEffect(() => {
    getUser();
  }, [token]);

  if (
    loading ||
    userAllRes.loading ||
    !coins ||
    !data ||
    newAddedCoinsRes.loading ||
    biggestGainersRes.loading
  ) {
    ///TODO: Animate this for the user.
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  console.log(data);

  if (!token) {
    return (
      <>
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
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <div>
        <Router>
          <Routes>
            <Route
              path="/DashBoard"
              element={
                <DashBoard
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
                  name={data}
                  setStepsEnabled={setStepsEnabled}
                  setToken={setToken}
                  accounts={userAllRes.data.allUsers}
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
