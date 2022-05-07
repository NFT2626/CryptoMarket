import React from "react";
import {
  Typography,
  Box,
  Breadcrumbs,
  Paper,
  Toolbar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@material-ui/core";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Link } from "react-router-dom";

function HelpPage() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Help & Services</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            underline="hover"
            color="inherit"
            to="/DashBoard"
          >
            Dashboard
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            underline="hover"
            color="inherit"
            to="/#"
          >
            Help & Services
          </Link>
        </Breadcrumbs>
      </Box>

      <Box sx={{ marginTop: "5rem" }}>
        <Typography variant="h4" gutterBottom>
          FAQ
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" sx={{ color: "blue" }}>
              {" "}
              How do you get more money
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              You can get more money through appealing to our contact
              guan_ha@student.kings.edu.au
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6" sx={{ color: "blue" }}>
              What is the purpose of this application?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The purpose of this, is to make sure to get enough experience to
              enter into the new world of cryptocurrency
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6" sx={{ color: "blue" }}>
              What is cryptocurrency?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Refers to a digital currency, secured with cryptography to enable
              trusted transactions. Blockchain is the underlying technology,
              functioning as a ‘ledger’ or record of transactions made. Hundreds
              of currencies are in circulation, such as Bitcoin, Ether, Monero,
              etc. Each is designed by one or more brilliant individuals,
              usually meant to run as a decentralised system so that no single
              entity can control it. Cryptocurrency units are usually generated
              on the basis of an algorithm announced to everyone in advance, by
              ‘miners’ using powerful computers. Having expended a lot of time
              and electricity on ‘mining’, these miners can hold on to the units
              or sell to others.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6" sx={{ color: "blue" }}>
              What is the purpose of cryptocurrency?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              As indicated by ‘currency’, they were originally intended to be
              used in the same way as rupees and dollars are, as a medium of
              payment between people for products and services purchased.
              Consider store reward cards, an alternative physical payment
              method that is denominated in their own units, and not in national
              currency. Similarly, cryptocurrency with its own units was meant
              to enable easy digital transactions online, at lower costs than
              what conventional banks charged.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default HelpPage;
