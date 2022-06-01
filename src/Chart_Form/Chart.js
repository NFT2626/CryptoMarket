//importing libraries
import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import {Typography } from "@material-ui/core";
//importing CSS
import "./ChartAndOrderBook.css";

//This component is responsible for displaying the chart for the chartform page 

const Chart = ({ data }) => {
  const chartContainerRef = useRef(); //uses the ref hook
  //reason why we use the ref hook
  //anything assinged using a ref hook does not changed but moreover it provides us control over the specific element
  //this way if you were to use a variable which i've tried it will keep on reproducing charts as such once it renders again it will not initialise opponent again as it is a constant
  const [testingValue, setTestingValue] = useState(); //this holds data for the open, close, low ... data  to be displayed for the user
  const resizeObserver = useRef(); //initialise using a ref hook to resize the object reasons because by using a ref hook it does not change for each render
  const chart = useRef(); //initialise a ref hook such that it won't change for each render and allows us to change it while the app is running
  let candleSeries; //initalise the data for the candle series
  function calculateSMA(data, count) { //this calculates the simple moving average
    //in which the number of prices is divided by the number of total periods
    var avg = function (data) { //calculates the average
      let sum = 0; //the total sum
      for (let i = 0; i < data.length; i++) { //loop through each of the data
        sum += data[i].close; //gets the bottom data ie. the close data
      }
      return sum / data.length; //divide it by the length of the data
    };
    let result = []; //the results that is used to display the derivative 
    for (let i = count - 1, len = data.length; i < len; i++) { //count is basically the quantity of the data that we want to take our derivative based on
      let val = avg(data.slice(i - count + 1, i)); //take count amount of the objects and calculate the average of it
      result.push({ time: data[i].time, value: val }); //push it to the results array with the date provided by the data
    }
    return result; //return the results
  }

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, { //creates the chart
      width: 350,
      height: 350,
      layout: { //the background color
        backgroundColor: "white",
        textColor: "black",
      },
      grid: {
        vertLines: { //the color for vertical lines
          color: "rgba(197, 203, 206, 0.5)",
        },
        horzLines: { //the color for the horizontal lines
          color: "rgba(197, 203, 206, 0.5)",
        },
      },
      crosshair: { //the crosshair for the chart
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: { //the y axis color
        borderColor: "rgba(197, 203, 206, 0.8)",
      }, 
      timeScale: { //the x axis color
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
    });

    candleSeries = chart.current.addCandlestickSeries({ //fancy colors for the graph
      upColor: "#4bffb5", 
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });
    var smaData = calculateSMA(data, 10); //calculates the SMA with the data provided as parameters and count as 10 
    var smaLine = chart.current.addLineSeries({ //creates the line on the chart to describe the SMA
      color: "rgb(170,50,181)", //color
      lineWidth: 2, //width
    });
    smaLine.setData(smaData); //sets the Smaline useing the smaData

    candleSeries.setData(data); // sets the data that is using for the candleSeries as data
    chart.current.subscribeCrosshairMove(handleCrosshairMoved); //subscribes an event for the crosshair
  }, []);

  function handleCrosshairMoved(param) { //whenever the crosshair moves
    setTestingValue(param.seriesPrices.get(candleSeries)); //sets the data for the open close, low ... 
    if (!param.point) { //if the point that the user is at doesn't have data
      return; //return
    }


  }

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => { //creates a resizeObserver instance to make the container responsive
      const { width, height } = entries[0].contentRect; //gets the width and height of the object after it's been resized
      chart.current.applyOptions({ width, height }); //changing the height and width to make responsive
      setTimeout(() => { //sets time out to make it fluid
        chart.current.timeScale().fitContent(); //sets the content of the graph to fit in the graph
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current); //look at the chartContainer object and observe it's changes

    return () => resizeObserver.current.disconnect(); //disconnects it once it is done
  }, []);

  return (
    <div className="chart">
      <Typography className="chartFormStep3" //describes the open data
      >
        open{" "}
        <span style={{ color: "black" }} //data for the open, if it exists display it else display "none"
        >
          {testingValue ? testingValue.open : "N/A"}
        </span>{" "}
        high{" "}
        <span style={{ color: "black" }} //data for the high, if it exists display it else display "none"
        >
          {testingValue ? testingValue.high : "N/A"}
        </span>{" "}
        low{" "}
        <span style={{ color: "black" }} //data for the low, if it exists display it else display "none"
        >
          {testingValue ? testingValue.low : "N/A"}
        </span>{" "}
        close{" "}
        <span style={{ color: "black" }} //data for the close, if it exists display it else display "none"
        >
          {testingValue ? testingValue.close : "N/A"}
        </span>
      </Typography>

      <div ref={chartContainerRef} className="chart-container chartFormStep4"  //create the chart container
      />
    </div>
  );
};

export default Chart; //export the Chart
