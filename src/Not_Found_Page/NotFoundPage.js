import React from "react";
import { Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

function NotFoundPage({ content, link }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30vh",
      }}
    >
      <Typography variant="h2"> PAGE NOT FOUND</Typography>

      <Typography variant="h6" style={{ marginTop: "6vh" }}>
        Uh oh, it seems we cannot find the page that you're looking for. Try
        going back to the previous page
      </Typography>

      <Link to={link}> {content} </Link>
    </Box>
  );
}

export default NotFoundPage;
