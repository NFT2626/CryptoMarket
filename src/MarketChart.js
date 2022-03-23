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
console.log(dates);

let dataPrices = [];

export const data = {
  dates,
  datasets: [
    {
      label: "Dataset 2",
      data: dates.map((el) => Math.random()),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)"
    }
  ]
};

const MarketChart = () => {
  const [dataPrices, setDataPrices] = useState([]);
  console.log(dataPrices);
  useEffect(() => {
    for(let i=0; i < dates.length; i++) {
      axios
      .get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${dates[i]}`
      )
      .then((res) => {
        console.log(res.data);
        setDataPrices( dates[i] + res.data);
      })
      .catch((error) => console.log(error));
    }
   
  },[]);

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
