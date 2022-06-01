//Libraries
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Typography, Box } from "@material-ui/core";

//this component is responsible for displaying the chart for plotting each of the portfolioDates of each of the user 

export default function Chart({ data }) {
  return (
    <Box style={{padding: 10}}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom //the title of the component
      >
        {" "}
        Balance statistics
      </Typography>
      <ResponsiveContainer height={400} width="100%">
        <LineChart //displays the chart
          width={440}
          height={200}
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3"  //grid 
          />
          <XAxis dataKey="date"  //x axis
          /> 
          <YAxis  // y axis
          />
          <Tooltip //tool tip
           />
          <Legend  //legend
          />
          <Line //line of the graph
            type="monotone"
            dataKey="assetValueTotal"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
