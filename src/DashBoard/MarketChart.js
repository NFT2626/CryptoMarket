//importing libraries
import React, { useState } from "react";

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

//creates the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


//this component is responsible for displaying the charts on the coinmarketPrices page this is randomly generated data
export const options = {
  responsive: false, //responsive or not
  maintainAspectRatio: true, 
  scales: {
    y: {
      ticks: {
        display: false //make the y axis display none
      }
    },
    x: {
      ticks: {
        display: false //make x axis display none
      }
    }
  },
  plugins: {
    legend: {
      display: false //make legend display none
    },
    title: {
      display: false, //make the title display none
      text: ""
    }
  }
};




const labels = ["January", "February", "March", "April", "May", "June", "July"]; //labels of the month




const MarketChart = ({keyNumber}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 2",
        data: labels.map(() => (Math.random() * keyNumber)), //creates the random generator * by the key number ie. the coin price
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)"
      }
    ]
  };

  return (
    <div
      style={{
        height: "20px !important",
        width: "2px !important"
      }}
    >
      <Line options={options} data={data}  //displays the line chart
      />
    </div>
  );
};

export default MarketChart;
