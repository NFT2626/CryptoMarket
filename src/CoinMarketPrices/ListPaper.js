//importing libraries
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import {
  Paper,
  Typography,
  Divider,
  List,
  Avatar,
  Grid,
} from "@material-ui/core";
//this component is responsible with displaying details such as the trending details, biggest gainers and newest added coins

//it is componentised for reusability and modularity. 

const ListPaper = ({ content, data, isPercentage, toolTipContent }) => {

  return (
    <Paper style={{ marginTop: "2.5rem !important" }} //Similar to a div but with more padding and is able to have box shadow
    >
      <Tooltip
                arrow //tip that provides explanation of the data
                title={toolTipContent} //the content
              ><Typography //the title of what the data is displaying
        style={{ padding: "10px", fontSize: { xs: "10px" } }}
        variant="h6" //size
      >
        {" "}
        {content}{" "}
      </Typography>
      </Tooltip>
      <Divider variant="middle" sx={{ width: "50%" }}  //adds a divider to divide the component
      />
      <List sx={{ width: "100%", bgcolor: "background.paper" }} //lists out the different data 
      >
        {data.map((el, idx) => ( //Loops the data for it to be displayed nicely 
          <Grid container spacing={2} style={{ marginLeft: "1rem" }}>
            <Grid item xs={1}>
              <Typography  //indicates it's position eg. 1. 2. 3.
              >{idx + 1}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Avatar
                alt="logo" //displays the image of the coin
                src={el.Images}
                style={{height: '2rem',width: '2rem'}}
              />
            </Grid>
            <Grid item xs={6}> 
              <Typography variant="h6" style={{fontSize: '1rem' }}  //the name of the coin
              inline>
                {el.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography //the price of the coin
                variant="h6"
                style={{ color: isPercentage ? "green" : "black", fontSize: '1rem' }} // if its units is based on percentage then it will be green else it will be black since we know that it will be increasing if it is displaying for the biggest gainers since it is called "biggest gainers"
              >
                {el.price}{" "}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </List>
    </Paper>
  );
};

export default ListPaper; //exports the component
