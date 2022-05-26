//This is the user sign up page 


//Importing libraries
import React,{useState} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Notification from "../Notification/Notification"
import { useMutation } from "@apollo/client"; 
import { useNavigate } from "react-router-dom";
import MuiPhoneNumber from 'material-ui-phone-number';



//Queries
import { CREATE_USER } from "../queries";

const SignUpPage = () => {
  const [createUser] = useMutation(CREATE_USER, { //A put request that crates a user 
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
      if(error.graphQLErrors[0].message.startsWith("Username already exists")){ //If the error has this starting with this sentence, then it will be a non unique username error
        messageSetter("You did not put in a unique username") //Sets the error
        setIsErrorPresent(true) //The error is present
      }
      else{
        messageSetter("Your have inputted invalid entries") //If something else does occur, have it very vague and have it sets as the message
      }
    },
    onCompleted: () => {
      messageSetter("you have successfully created a user account") //Once completed, the user would receive the success message 
    }
  });
  const [message, setMessage] = useState(''); //Initialise the state for the message
  const [isErrorPresent, setIsErrorPresent] = useState(false); //Initialise a bool whether a message is present
  const navigate = useNavigate();

  const messageSetter = (content) => { //Function that assists in setting the message
    setMessage(content); //Sets the message with the variable content
    setTimeout(() => {
      setMessage(null); //After 5 seconds, it will set the message to none
    }, 5000);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); //Prevent it from reloading the page
    const data = new FormData(event.currentTarget); //Gets the data from the form 
    setIsErrorPresent(false) //Set error to false
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(data.get("email"))){
      messageSetter("Incorrect format, must be in email address format") 

      setIsErrorPresent(true)
          return;
    }
    createUser({ //Creates the user
      variables: {
        username: data.get("email"), //Gets a label called "email" and pass it as a variable called username
        password: data.get("password"), //Gets a field called "password" and pass it as a variable called password
        name: data.get("firstName"), //Gets a field called "firstName" and pass it as a variable called name
        lastName: data.get("lastName"), // Same thing as above
      },
    }).catch((err) => {
      console.log(err); //If error, it will print out the error.
    });
  };

  return (
    <Box
      sx={{ backgroundColor: "orange", minHeight: "100vh !important", display: "absolute" }} //CSS
    >
         <Button onClick={() => {
            navigate("/");
         }}variant="contained" style={{ fontWeight: 900, letterSpacing: "2px", color: "black",    position: "fixed",
      top:30
, left: 30, backgroundColor: 'white'}}> CrySim. </Button>
      <Container
        sx={{
          backgroundColor: "white", //CSS
          transform: "translateY(2.5rem) !important",
          paddingBottom: "2rem !important",
          width: "60% !important",
        }}
        maxWidth="xs" //Makes the container a small size container
      >
        <CssBaseline />  {/* MUI provides standard css */}
        <Box
          sx={{
            display: "flex !important",
            flexDirection: "column !important",
            alignItems: "center !important",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginTop: "2.5rem" , fontSize: '3rem'}}>
            Sign up
          </Typography> {/*This is the title*/}
          <Notification message={message} />
          <Box
            component="form"
            onSubmit={handleSubmit} //Form
            style={{ marginTop: 8 }}
          >
            <Grid container spacing={2} style={{ marginTop: "4px !important" }}> {/*Grid container*/}
              <Grid item xs={6}>
                <caption
                  style={{ transform: "translateX(2.5rem", display: "inline" }} //Captions that shows what is required
                >
                  {" "}
                  Required fields: <span style={{ color: "red" }}>*</span>{" "}
                </caption>
              </Grid>
              <Grid item xs={6}></Grid> {/*Grid that adds spacing*/}
              <Grid item xs={6}>
                <TextField
                  name="firstName" //textfield that specifies the name
                  required
                  fullWidth
                  label="First Name"
                  inputProps={{ maxLength: 15 }} // Maximum character length
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  inputProps={{ maxLength: 25 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                {isErrorPresent ?
              <TextField
              style={{display:  isErrorPresent ? "" : 'none'}}
                  required
                  fullWidth
                  error
                  label="Email Address"
                  name="email"
                  helperText="Incorrect Entry"
                  autoComplete="email"
                  inputProps={{ maxLength: 30 }}
                />
                :
                <TextField
                style={{display:  isErrorPresent ? "none" : ''}}
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  inputProps={{ maxLength: 30 }}
                />
        }
              </Grid>
              <Grid item xs={12} sx={{ height: 4 }}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 5 }}>
         
              </Grid>
            </Grid>
            <Button //Button to submit to sign in
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: "1.5rem", backgroundColor: 'orange' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', marginTop: '1.5rem'}}>
                <Link //Link that directs the user to the login page
                  href="/Login"
                  variant="p"
                  style={{margin:'0 auto', color: 'red' }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpPage;
