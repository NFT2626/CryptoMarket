import * as React from "react";
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

const SignUpPage = () => {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password")
    });
  };

  return (
    <Box sx={{ backgroundColor: "blue", minHeight: '100vh', display: 'absolute' }}>
      <Container sx={{  backgroundColor: 'white', transform: 'translateY(2.5rem)', paddingBottom: '2rem'}} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{marginTop: '2.5rem'}}>
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} style={{marginTop: 8}}>
            <Grid container spacing={2} style={{marginTop: 4}}>
              <Grid item xs={6}>
              <caption style={{ transform: 'translateX(2.5rem', display: 'inline'}}> Required fields: <span style={{color: 'red'}}>*</span> </caption>
                </Grid>
                <Grid item xs={6}>
                  </Grid>
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
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I Have read the term and services"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{marginTop: '2.2rem'}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">

              <Grid item>
                <Link href="#" variant="p1" style={{paddingBottom: '2rem', display: 'inline'}}>
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
