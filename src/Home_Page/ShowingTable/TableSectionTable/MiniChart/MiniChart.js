//Importing libraries
import React from "react";
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

//Registering the chartjs elements to the chart element
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//This is the component for the chart that is responsible for displaying the chart at the homepage

//these are the options that are used when creating the chart
export const options = {
  responsive: false, //specify whether the chart is responsive or not
  maintainAspectRatio: true, //whether it show maintain the same aspect ratio at all times
  scales: {
    y: { //the options for the y axis
      ticks: {
        display: false //we want to remove the label that is displayed on the chart for the y axis
      }
    },
    x: { //the options for the x axis
      ticks: {
        display: false //we want to remove the label that is displayed for the x axis
      }
    }
  },
  plugins: {
    legend: {
      display: false //make sure that we do not display the legend
    },
    title: {
      display: false, //do not display the title
      text: "Chart.js Line Chart" //the title of the chart
    }
  }
};

const labels = ["January", "February", "March", "April", "May", "June", "July"]; //the labels for the x axis of the chart



const MiniChart = ({ keyNumber }) => { 
//The key number is the key number that differntiates the differnt coins and their graphs when generating 
//the random number, I chose to use the current price because this is something in the api
//that is known to be different

  const data = { //creating the data
    labels, //the labels for the x axis
    datasets: [
      {
        label: "Dataset 2", //name of the y axis
        data: labels.map(() => (Math.random() * keyNumber)), //creating the random numbers which generates a random number from 0 to 10 and then multiplied by the key number which is the price of the coin
        borderColor: "rgb(53, 162, 235)", //the color of the border
        backgroundColor: "rgba(53, 162, 235, 0.5)" //the color of the line
      }
    ]
  };
  return (
    <div
      style="position:absolute; top:60px; left:10px; width:500px; height:500px;" //css
      style={{
        height: "20vh", //css
        width: "12vh" //css
      }}
    >
      <Line options={options} data={data} /> {/*Creates the chart with parameters of option and data*/}
    </div>
  );
};

export default MiniChart;
