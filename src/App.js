// Importing Libraries
import React, { Suspense, useEffect, useState } from "react"; //UseS
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


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

import {
  GET_CURRENT_USER,
  ADD_PORTFOLIO_DATE_VALUE,
  GET_ALL_USERS,
  NOW_BUY_LIMIT,
  NOW_SELL_LIMIT,
  CANCEL_LIMIT
} from "./queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [token, setToken] = useState(null);
  const [newAddedCoins, setNewAddedCoins] = useState([]);
  const [biggestGainers, setBiggestGainers] = useState([]);
  const [getUser, { loading, error, data }] = useLazyQuery(GET_CURRENT_USER, {
    pollInterval: 300000,
  });

  const userAllRes = useQuery(GET_ALL_USERS);
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
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const promise2 = axios.get("http://localhost:5000/api/biggest-gainers");
    const promise3 = axios.get("http://localhost:5000/api/newly-added-coins");

    Promise.allSettled([promise2, promise3]).then(function (values) {
      setIsShowing(values.every((el) => el.status === "fulfilled"));
      setNewAddedCoins(values[1].value.data);
      setBiggestGainers(values[0].value.data);
    });

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
          const priceOfCoin = res.data.find((el) => el.name === coin.name).current_price;
          if(priceOfCoin <= coin.bought_price && coin.type === "BuyLimit"){
            console.log("this is the coin", coin)
            nowBuyLimit({variables:{
              name: coin.name, boughtPrice: coin.bought_price, 
              quantity: coin.quantity, id: coin.id
            }})
          }
          else if(priceOfCoin >= coin.bought_price && coin.type === "SellLimit"){
            console.log("this is the coin that is selling", coin) 
            nowSellLimit({variables:{
              name: coin.name, sellPrice: coin.bought_price, 
              quantity: coin.quantity, id: coin.id
            }})
          }
        })
        const d = new Date();
        let time = d.getTime();
        console.log(time);
      });
  }, [data]);

  useEffect(() => {

    getUser();

  }, [token]);

  if (!isShowing || loading || userAllRes.loading || !coins || !data) {
    ///TODO: Animate this for the user.
    return (
      <div>
        {" "}
        <h1> Loading ... </h1>{" "}
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
                <DashBoard name={data} setToken={setToken} accounts={userAllRes.data.allUsers}>
                  <BodySection
                    account={data.me}
                    coins={coins}
                    allUsers={userAllRes.data.allUsers}
                  />
                </DashBoard>
              }
            />
            <Route
              path="/DashBoard/profile"
              element={
                <DashBoard name={data} setToken={setToken} accounts={userAllRes.data.allUsers}>
                  <EditPortfolioPage account={data.me} />
                </DashBoard>
              }
            />
            <Route
              path="/DashBoard/CoinMarketPrices"
              element={
                <DashBoard name={data} setToken={setToken} accounts={userAllRes.data.allUsers}>
                  <CoinMarketPrices
                    coins={coins}
                    newAddedCoins={newAddedCoins}
                    biggestGainers={biggestGainers}
                  />{" "}
                </DashBoard>
              }
            />
            <Route
              exact
              path="/DashBoard/ChartForm"
              element={
                <DashBoard name={data} setToken={setToken} accounts={userAllRes.data.allUsers}>
                  <ChartForm coins={coins} account={data.me} />
                </DashBoard>
              }
            />
            <Route
              exact
              path="/DashBoard/TransactionHistory"
              element={
                <DashBoard name={data} setToken={setToken} accounts={userAllRes.data.allUsers}>
                  <TransactionHistoryPage account={data.me} />
                </DashBoard>
              }
            />
            <Route
              exact
              path="/DashBoard/Help"
              element={
                <DashBoard name={data} setToken={setToken} accounts={userAllRes.data.allUsers}>
                  <HelpPage />
                </DashBoard>
              }
            />

<Route
              exact
              path="/DashBoard/Portfolio"
              element={
                <DashBoard name={data} setToken={setToken} accounts={userAllRes.data.allUsers}>
                  <PortfolioPage allUsers={userAllRes.data.allUsers} coins={coins}/>
                </DashBoard>
              }
            />
   <Route
              exact
              path="/DashBoard/Portfolio/:account"
              element={
                <DashBoard name={data} setToken={setToken} accounts={userAllRes.data.allUsers}>
                  <PortfolioPage allUsers={userAllRes.data.allUsers} coins={coins}/>
                </DashBoard>
              }
            />
            <Route
              exact
              path="/DashBoard/ChartForm/:coin"
              element={
                <DashBoard name={data} setToken={setToken} accounts={userAllRes.data.allUsers}>
                  <ChartForm coins={coins} account={data.me} />
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
