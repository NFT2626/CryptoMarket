import React from "react";
import "./ShowingTable.css";
import TableSectionTable from "./TableSectionTable/TableSectionTable";
import { Typography } from "@material-ui/core";
const ShowingTable = ({ coins }) => {
  return (
    <section className="table-section-canvas">
      <Typography variant="h4">Current Market Trend</Typography>
      <TableSectionTable coins={coins} />
    </section>
  );
};

export default ShowingTable;
