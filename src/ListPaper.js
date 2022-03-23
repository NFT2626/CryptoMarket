import React from "react";

import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box
} from "@material-ui/core";

const ListPaper = ({ content, data }) => {
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
        <ListItem>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%"
            }}
          >
            <ListItemText primary="1." />
            <ListItemText primary="Bitcoin" secondary="BTC" />
            <ListItemText primary="$1.59" />
          </Box>
        </ListItem>
      </List>
    </Paper>
  );
};

export default ListPaper;
