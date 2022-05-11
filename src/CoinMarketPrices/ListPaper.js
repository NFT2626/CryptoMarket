import React from "react";

import {
  Paper,
  Typography,
  Divider,
  List,
  Avatar,
  Grid,
} from "@material-ui/core";

const ListPaper = ({ content, data, isPercentage }) => {
  return (
    <Paper style={{ marginTop: "2.5rem !important" }}>
      <Typography
        style={{ padding: "10px", fontSize: { xs: "10px" } }}
        variant="h6"
      >
        {" "}
        {content}{" "}
      </Typography>
      <Divider variant="middle" sx={{ width: "50%" }} />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {data.map((el, idx) => (
          <Grid container spacing={2} style={{ marginLeft: "1rem" }}>
            <Grid item xs={1}>
              <Typography>{idx + 1}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Avatar
                alt="logo"
                src={el.Images}
                style={{height: '2rem',width: '2rem'}}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" inline>
                {el.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h6"
                style={{ color: isPercentage ? "green" : "black" }}
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

export default ListPaper;
