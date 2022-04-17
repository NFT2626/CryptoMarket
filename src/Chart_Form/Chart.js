import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import "./ChartAndOrderBook.css";
import { Box, Typography, Container } from "@material-ui/core";

const Chart = ({ data }) => {
  const chartContainerRef = useRef();
  const [testingValue, setTestingValue] = useState();
  const resizeObserver = useRef();
  const chart = useRef();
  let candleSeries;
  function calculateSMA(data, count) {
    var avg = function (data) {
      var sum = 0;
      for (var i = 0; i < data.length; i++) {
        sum += data[i].close;
      }
      return sum / data.length;
    };
    var result = [];
    for (var i = count - 1, len = data.length; i < len; i++) {
      var val = avg(data.slice(i - count + 1, i));
      result.push({ time: data[i].time, value: val });
    }
    return result;
  }

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: 350,
      height: 350,
      layout: {
        backgroundColor: "white",
        textColor: "black",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
    });

    candleSeries = chart.current.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });
    var smaData = calculateSMA(data, 10);
    var smaLine = chart.current.addLineSeries({
      color: "rgb(170,50,181)",
      lineWidth: 2,
    });
    smaLine.setData(smaData);

    candleSeries.setData(data);
    chart.current.subscribeCrosshairMove(handleCrosshairMoved);
  }, []);

  function handleCrosshairMoved(param) {
    console.log(param);
    setTestingValue(param.seriesPrices.get(candleSeries));
    if (!param.point) {
      return;
    }

    console.log(
      `A user moved the crosshair to (${param.point.x}, ${param.point.y}) point, the time is ${param.time}`
    );
  }

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      console.log(width, height);
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <div className="chart">
      <Typography>
        open{" "}
        <span style={{ color: "black" }}>
          {testingValue ? testingValue.open : "N/A"}
        </span>{" "}
        high{" "}
        <span style={{ color: "black" }}>
          {testingValue ? testingValue.high : "N/A"}
        </span>{" "}
        low{" "}
        <span style={{ color: "black" }}>
          {testingValue ? testingValue.low : "N/A"}
        </span>{" "}
        close{" "}
        <span style={{ color: "black" }}>
          {testingValue ? testingValue.close : "N/A"}
        </span>
      </Typography>

      <div ref={chartContainerRef} className="chart-container" />
    </div>
  );
};

export default Chart;
