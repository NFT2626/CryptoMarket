

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


export default function App() {
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  });


  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <div>
        <Router>
          <Routes>
            <Route path="/DashBoard" element={<DashBoard><BodySection /></DashBoard>} />
            <Route path="/DashBoard/profile" element={<DashBoard><ProfilePage /></DashBoard>} />
            <Route path="/DashBoard/CoinMarketPrices" element={<DashBoard><CoinMarketPrices coins={coins} /></DashBoard>} />
            <Route exact path="/DashBoard/ChartForm" element={<DashBoard><ChartForm coins={coins}/></DashBoard>} />
            <Route exact path="/DashBoard/ChartForm/:coin" element={<DashBoard><ChartForm coins={coins}/></DashBoard>} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/SignUp" element={<SignUpPage />} />
            <Route path="/" element={<HomePage coins={coins}/>} />
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}
