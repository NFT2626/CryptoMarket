import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  maintainAspectRatio: true,
  scales: {
    y: {
      ticks: {
        display: false
      }
    },
    x: {
      ticks: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
      text: "Chart.js Line Chart"
    }
  }
};

let dates = [];
for (let i = 0; i < 7; i++) {
  let d = new Date();
  d.setDate(d.getDate() - i);
  dates.push(d.toLocaleString().slice(0, 10).replaceAll("/", "-"));

}

let dataPrices = [];

const labels = ["January", "February", "March", "April", "May", "June", "July"];




const MarketChart = ({keyNumber}) => {
  const [dataPrices, setDataPrices] = useState([]);
  if(dataPrices.length != 0){
    console.log(dataPrices[0][1])
  }
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 2",
        data: labels.map(() => (Math.random() * keyNumber)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };
  // useEffect(() => {
  //     axios
  //     .get(
  //       'https://api.coingecko.com/api/v3/coins/cardano/ohlc?vs_currency=usd&days=30'
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       setDataPrices(res.data);
  //     })
  //     .catch((error) => console.log(error));
  //   },[]);

  return (
    <div
      style={{
        height: "20px !important",
        width: "2px !important"
      }}
    >
      <Line options={options} data={data} />
    </div>
  );
};

export default MarketChart;
