//IMPORTING libraries
import React from "react";

import { Typography } from "@material-ui/core";
//importing css
import "./ShowingTable.css";

//importing components
import TableSectionTable from "./TableSectionTable/TableSectionTable";

//This is the section that shows the table on homepage that displays the data of the current user before the user logs in
//Such that it adds to that feeling to what this application is all about

const ShowingTable = ({ coins }) => {
  return (
    <section className="table-section-canvas"> {/*Wrap around as a section tag to apply css to the portion of the page */}
      <Typography variant="h4">Current Market Trend</Typography> {/*Title of the page*/}
      <TableSectionTable coins={coins} /> {/*Pass in the coins as the parameter and the table to display the coins*/}
    </section>
  );
};

export default ShowingTable; //return the table
