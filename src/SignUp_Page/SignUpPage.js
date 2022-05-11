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

import { CREATE_USER } from "../queries";

const SignUpPage = () => {
  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
      if(error.graphQLErrors[0].message.startsWith("Username already exists")){
        messageSetter("You did not put in a unique username")
        setIsErrorPresent(true)
      }
      else{
        messageSetter("Your have inputted invalid entries")
      }
    },
    onCompleted: () => {
      console.log("this should be executing")
      messageSetter("you have successfully created a user account")
    }
  });
  const [message, setMessage] = useState('');
  const [isErrorPresent, setIsErrorPresent] = useState(false);
  const messageSetter = (content) => {
    setMessage(content);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setIsErrorPresent(false)
    
    createUser({
      variables: {
        username: data.get("email"),
        password: data.get("password"),
        name: data.get("firstName"),
        lastName: data.get("lastName"),
      },
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Box
      sx={{ backgroundColor: "blue", minHeight: "100vh", display: "absolute" }}
    >
      <Container
        sx={{
          backgroundColor: "white",
          transform: "translateY(2.5rem)",
          paddingBottom: "2rem",
          width: "60%",
        }}
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginTop: "2.5rem" }}>
            Sign up
          </Typography>
          <Notification message={message} />
          <Box
            component="form"
            onSubmit={handleSubmit}
            style={{ marginTop: 8 }}
          >
            <Grid container spacing={2} style={{ marginTop: 4 }}>
              <Grid item xs={6}>
                <caption
                  style={{ transform: "translateX(2.5rem", display: "inline" }}
                >
                  {" "}
                  Required fields: <span style={{ color: "red" }}>*</span>{" "}
                </caption>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
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
                />
                :
                <TextField
                style={{display:  isErrorPresent ? "none" : ''}}
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ marginTop: "1.5rem" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
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
