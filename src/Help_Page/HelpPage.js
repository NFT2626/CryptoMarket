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
          How To 
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" sx={{ color: "blue" }}>
              {" "}
              How to Login
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box style={{display: "flex", flexDirection: "column"}}>
            <Typography variant="h6">0. If you do not have an account, make sure to make an account </Typography>
          <Box style={{marginTop:4}}>
            <Typography variant="h5">
            1. Enter the username
            </Typography>
            <Box component="img" sx={{height:500, width:700}} src='/Images/SignInMedia/EnterUsername.png'/>
            </Box>
            <Box>
            <Typography variant="h5">
            2. Enter the Password
            </Typography>
            <Box component="img" sx={{height:400, width:500}} src='/Images/SignInMedia/EnterPassword.png'/>
            </Box>
            <Box>
            <Typography variant="h5">
            3. Click Sign In
            </Typography>
            <Box component="img" sx={{height:400, width:500}} src='/Images/SignInMedia/SubmitButton.png'/>
            
            </Box>
            <Box>
            <Typography variant="h5">
            4. If you receive this error, please try again from step 1.
            </Typography>
            <Box component="img" sx={{height:400, width:500}} src='/Images/SignInMedia/ErrorMessageSignIn.png'/>
            
            </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6" sx={{ color: "blue" }}>
              Why am I receiving a rate Limit error and what is a rate limit error?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Rate limiting is a way of controlling the amount of requests handled by the site's API (Application Program Interface) — these communications are API calls. If you receive an error message like “API rate limit exceeded” or “You are being rate limited”.
            Due to the nature of this project, if you have a rate limit error, please give the website a one minute of downtime before you refresh. 
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
          Corrupt account or your account has been stolen?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              If your account has been stolen, please contact the email given by guan_ha@student.kings.edu.au and we will make sure to allow you to register your password
            </Typography>
          </AccordionDetails>
        </Accordion>
      
      </Box>


      <Box sx={{ marginTop: "5rem" }}>
        <Typography variant="h4" gutterBottom>
          Troubleshooting
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" sx={{ color: "blue" }}>
              {" "}
Registering page collapse into the center when clicked from the center register button
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              It is recommended that you are to use the register page that is located on the sign up page?
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
              Why am I receiving a rate Limit error and what is a rate limit error?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Rate limiting is a way of controlling the amount of requests handled by the site's API (Application Program Interface) — these communications are API calls. If you receive an error message like “API rate limit exceeded” or “You are being rate limited”.
            Due to the nature of this project, if you have a rate limit error, please give the website a one minute of downtime before you refresh. 
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
          Corrupt account or your account has been stolen?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              If your account has been stolen, please contact the email given by guan_ha@student.kings.edu.au and we will make sure to allow you to register your password
            </Typography>
          </AccordionDetails>
        </Accordion>
      
      </Box>


      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
    
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
