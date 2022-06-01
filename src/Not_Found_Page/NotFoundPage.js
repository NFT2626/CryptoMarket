//importing libraries
import React from "react";
import { Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

//this page is responsible fore displaying when the user enters an invalid URL

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
      <Typography variant="h2" //title to show that the page is not found
      > PAGE NOT FOUND</Typography>

      <Typography variant="h6" style={{ marginTop: "6vh" }} //description
      >
        Uh oh, it seems we cannot find the page that you're looking for. Try
        going back to the previous page
      </Typography>

      <Link to={link} //link to direct to 
      > {content} </Link>
    </Box>
  );
}

export default NotFoundPage;
