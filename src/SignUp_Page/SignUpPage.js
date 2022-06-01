//This is the user sign up page 


//Importing libraries
import React,{useState} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Notification from "../Notification/Notification"
import { useMutation } from "@apollo/client"; 
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



//Queries
import { CREATE_USER } from "../queries";



const SignUpPage = () => {
  const [title, setTitle] = useState(''); //the user title
  const [name, setName] = useState(''); //the name of th user
  const [lastName, setLastName] = useState(''); //the last name of the user
  const [password, setPassword] = useState('') //the password of the user
  const [emailAddress, setEmailAddress] = useState('') //the email address of the user
  const [message, setMessage] = useState(''); //Initialise the state for the message
  const [nameError, setNameError] = useState(false); //if there is a name error
  const [lastNameError, setLastNameError] = useState(false); // if there is a last name error
  const [emailError, setEmailError] = useState(false); //Initialise a bool whether a message is present
  const [titleError, setTitleError] = useState(false); //Initialise a bool whether a message is present
  const handleChange = (event) => {
    setTitle(event.target.value); //whenever the textfield of the title changes, change the dropdown to reflect the title 
  };
  const [createUser] = useMutation(CREATE_USER, { //A put request that crates a user 
    onError: (error) => {
      console.log(error.graphQLErrors[0].message) //display error
      if(error.graphQLErrors[0].message.startsWith("Username already exists")){ //If the error has this starting with this sentence, then it will be a non unique username error
        messageSetter("You did not put in a unique username") //Sets the error
        setEmailError(true) //The error is present
      }
      else{
        messageSetter("Your have inputted invalid entries") //If something else does occur, have it very vague and have it sets as the message
      }
    },
    onCompleted: () => {
      messageSetter("you have successfully created a user account") //Once completed, the user would receive the success message 
      navigate("/Login") //send the user to login page
    }
  });

 
  const navigate = useNavigate(); //allows the user to navigate to different page

  const messageSetter = (content) => { //Function that assists in setting the message
    setMessage(content); //Sets the message with the variable content
    setTimeout(() => {
      setMessage(null); //After 5 seconds, it will set the message to none
    }, 5000);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); //Prevent it from reloading the page
    setEmailError(false) //Set error to false
    setTitleError(false)
    setNameError(false)
    setLastNameError(false)

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!title){
      messageSetter("You have not entered the title") 
      setTitleError(true)
        return;

    }
    if(!name){
      messageSetter("You have not entered the name") 
      setNameError(true)
      return
    }
    if(!lastName){
      messageSetter("You have not entered the lastName") 
      setLastNameError(true)
      return
    }
    if(!re.test(emailAddress)){
      messageSetter("Incorrect format, must be in email address format") 

      setEmailError(true)
          return;
    }
    createUser({ //Creates the user
      variables: {
        username: emailAddress, //Gets a label called "email" and pass it as a variable called username
        password: password, //Gets a field called "password" and pass it as a variable called password
        name: name, //Gets a field called "firstName" and pass it as a variable called name
        lastName: lastName, // Same thing as above
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
, left: 30, backgroundColor: 'white', fontSize: '1.5rem' }}> CrySim. </Button>
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
          <Typography variant="h5" sx={{ marginTop: "2.5rem" , fontSize: '3rem', color: 'orange'}}>
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
              <Grid item xs={12}>
                <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <FormControl fullWidth style={{width: '30%'
}} error={titleError} 
>
        <InputLabel  >Title</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={title}

          onChange={handleChange}
          color="warning"
        >
          <MenuItem value={10}>Mr.</MenuItem>
          <MenuItem value={20}>Mrs.</MenuItem>
          <MenuItem value={20}>Ms.</MenuItem>
          <MenuItem value={20}>Master</MenuItem>
          <MenuItem value={30}>Dr.</MenuItem>
        </Select>
        
      </FormControl>
      <TextField
                  name="firstName" //textfield that specifies the name
                  required
                  label="First Name"
                  color="warning"
          fullWidth
            value={name}
            error={nameError}
            onChange={(e) => {
              setName(e.target.value)
            }}
                  inputProps={{ maxLength: 15 }} // Maximum character length
                />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  color="warning"
                  value={lastName}
                  error={lastNameError}
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                  inputProps={{ maxLength: 25 }}
                />
              </Grid>
              
              <Grid item xs={12}>
      
              <TextField
                  required
                  fullWidth
                  color="warning"
                  error={emailError}
                  label="Email Address"
                  name="email"
                  helperText={emailError ? "Incorrect Entry" : ""}
                  value={emailAddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value)
                  }}
                  autoComplete="email"
                  inputProps={{ maxLength: 30 }}
                />
          
              </Grid>
              <Grid item xs={12} sx={{ height: 4 }}>
                <TextField
                  required
                  fullWidth
                  color="warning"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value)}}
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
