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
import ProfilePage from "./Profile_Page/ProfilePage";
import SignUpPage from "./SignUp_Page/SignUpPage";

import NotFoundPage from "./Not_Found_Page/NotFoundPage";

import LoadingScreen from "./LoadingScreen/LoadingScreen";

import { GET_CURRENT_USER } from "./queries";
import { useLazyQuery } from "@apollo/client";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [token, setToken] = useState(null);
  const [newAddedCoins, setNewAddedCoins] = useState([]);
  const [biggestGainers, setBiggestGainers] = useState([]);
  const [getUser, { loading, error, data }] = useLazyQuery(GET_CURRENT_USER);

  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const promise1 = axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const promise2 = axios.get("http://localhost:5000/api/biggest-gainers");
    const promise3 = axios.get("http://localhost:5000/api/newly-added-coins");

    Promise.allSettled([promise1, promise2, promise3]).then(function (values) {
      setIsShowing(values.every((el) => el.status === "fulfilled"));
      setCoins(values[0].value.data);
      setNewAddedCoins(values[2].value.data);
      setBiggestGainers(values[1].value.data);
    });

    if (localStorage.getItem("user-token")) {
      setToken(localStorage.getItem("user-token"));
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [token]);

  if (!isShowing || loading) {
    return (
      <div>
        {" "}
        <h1> Loading ... sorry for the lag</h1>{" "}
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
                <DashBoard name={data} setToken={setToken}>
                  <BodySection account={data.me} coins={coins} />
                </DashBoard>
              }
            />
            <Route
              path="/DashBoard/profile"
              element={
                <DashBoard name={data} setToken={setToken}>
                  <ProfilePage />
                </DashBoard>
              }
            />
            <Route
              path="/DashBoard/CoinMarketPrices"
              element={
                <DashBoard name={data} setToken={setToken}>
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
                <DashBoard name={data} setToken={setToken}>
                  <ChartForm coins={coins} account={data.me} />
                </DashBoard>
              }
            />
            <Route
              exact
              path="/DashBoard/ChartForm/:coin"
              element={
                <DashBoard name={data} setToken={setToken}>
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
