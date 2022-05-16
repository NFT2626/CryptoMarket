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
      sx={{ backgroundColor: "blue", minHeight: "100vh", display: "absolute" }} //CSS
    >
      <Container
        sx={{
          backgroundColor: "white", //CSS
          transform: "translateY(2.5rem)",
          paddingBottom: "2rem",
          width: "60%",
        }}
        maxWidth="xs" //Makes the container a small size container
      >
        <CssBaseline />  {/* MUI provides standard css */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginTop: "2.5rem" }}>
            Sign up
          </Typography> {/*This is the title*/}
          <Notification message={message} />
          <Box
            component="form"
            onSubmit={handleSubmit} //Form
            style={{ marginTop: 8 }}
          >
            <Grid container spacing={2} style={{ marginTop: 4 }}> {/*Grid container*/}
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
                  inputProps={{ maxLength: 10 }} // Maximum character length
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  inputProps={{ maxLength: 10 }}
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
                  autoComplete="email"
                  inputProps={{ maxLength: 15 }}
                />
                :
                <TextField
                style={{display:  isErrorPresent ? "none" : ''}}
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputProps={{ maxLength: 15 }}
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
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I Have read the term and services"
                />
              </Grid>
            </Grid>
            <Button //Button to submit to sign in
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: "1.5rem" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link //Link that directs the user to the login page
                  href="/Login"
                  variant="p"
                  style={{ paddingBottom: "2rem", display: "inline" }}
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
