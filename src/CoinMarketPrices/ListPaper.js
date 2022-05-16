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

const ListPaper = ({ content, data, isPercentage, toolTipContent }) => {
  return (
    <Paper style={{ marginTop: "2.5rem !important" }}>
      <Tooltip
                arrow
                title={toolTipContent}
              ><Typography
        style={{ padding: "10px", fontSize: { xs: "10px" } }}
        variant="h6"
      >
        {" "}
        {content}{" "}
      </Typography>
      </Tooltip>
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
              <Typography variant="h6" style={{fontSize: '1rem' }} inline>
                {el.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h6"
                style={{ color: isPercentage ? "green" : "black", fontSize: '1rem' }}
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
