import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Avatar,
  Badge,
  Grid,
  Breadcrumbs,
  Fab,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import {
  CHANGE_PROFILE_PICTURE,
  CHANGE_PROFILE,
  GET_CURRENT_USER,
} from "../queries.js";

import { useMutation, gql } from "@apollo/client";

function ProfilePage({ account, setSteps }) {
  const [wordCount, setWordCount] = useState(0);
  const [wordAbout, setWordAbout] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState();
  const [fileUpload, setFileUpload] = useState();

  const [uploadFile] = useMutation(CHANGE_PROFILE_PICTURE);

  const [changePortfolio] = useMutation(CHANGE_PROFILE, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    setSteps([
      {
        element: ".profileEditStep1",
        intro: "To quickly go to the dashboard, click on the dashboard label",
      },
      {
        element: ".profileEditStep2",
        intro: "Edit your Profile page by clicking here",
      },
      {
        element: ".profileEditStep3",
        intro: "This is where you can view your current name",
      },
      {
        element: ".profileEditStep4",
        intro: "Here you can edit your name",
      },
      {
        element: ".profileEditStep5",
        intro: "This is where you can view your current last name",
      },
      {
        element: ".profileEditStep6",
        intro: "Edit your last name here",
      },
      {
        element: ".profileEditStep7",
        intro:
          "If you have entered something here, the greyish text is what you currently set as your about me. Here you can change your about me",
      },
      {
        element: ".profileEditStep8",
        intro:
          "This is where you can see your character counter, do not exceed 300 characters",
      },
      {
        element: ".profileEditStep9",
        intro: "Once you've made the appropriate changes, please click here",
      },
    ]);
  }, [setSteps]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    console.log(file);
    const fr = new FileReader();
    fr.onload = function () {
      setImage(fr.result);
    };
    fr.readAsDataURL(file);
    setFileUpload(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileUpload && !wordAbout && !lastName && !name) {
      console.log("you have entered nothing");
      return;
    }
    if (fileUpload) {
      uploadFile({ variables: { file: fileUpload } });
    }
    console.log({
      name: !name ? account.name : name,
      lastName: !lastName ? account.lastName : lastName,
      aboutMe: !wordAbout ? account.aboutMe : wordAbout,
    });
    changePortfolio({
      variables: {
        name: !name ? account.name : name,
        lastName: !lastName ? account.lastName : lastName,
        aboutMe: !wordAbout ? account.aboutMe : wordAbout,
      },
    });
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Profile Page</Typography>
        <Breadcrumbs aria-label="breadcrumb" className="profileEditStep1">
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
            to="/DashBoard/Profile"
          >
            Profile Page
          </Link>
        </Breadcrumbs>
      </Box>

      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={10}
        direction="row"
      >
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <input
            type="file"
            onChange={handleFileChange}
            id="contained-button-file"
            style={{ display: "none" }}
          />
          <label htmlFor="contained-button-file" className="profileEditStep2">
            <Fab component="span" style={{ height: 300, width: 300 }}>
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                color="primary"
                overlap="circular"
                badgeContent="Edit"
              >
                <Avatar
                  alt="Remy Sharp"
                  style={{ height: 300, width: 300 }}
                  src={!image ? account.imageProfile : image}
                />
              </Badge>
            </Fab>
          </label>
        </Grid>

        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Box sx={{ minWidth: "45%" }}>
            <Typography
              variant="h5"
              color="primary"
              style={{ display: "inline" }}
              className="profileEditStep3"
            >
              Name: <span>{account.name}</span>
            </Typography>
            <TextField
              className="profileEditStep4"
              fullWidth
              value={name}
              inputProps={{ maxLength: 10 }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Box>
          <Box sx={{ minWidth: "45%" }}>
            <Typography
              variant="h5"
              color="primary"
              className="profileEditStep5"
            >
              LastName:
              <span>{account.lastName}</span>
            </Typography>
            <TextField
              className="profileEditStep6"
              fullWidth
              value={lastName}
              inputProps={{ maxLength: 10 }}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box style={{ minWidth: "90%", position: "relative" }}>
            <Typography variant="h5" color="primary">
              About me:
            </Typography>
            <TextField
              placeholder={account.aboutMe}
              className="profileEditStep7"
              variant="filled"
              inputProps={{ maxLength: 300 }}
              multiline
              rows={4}
              fullWidth
              maxRows={8}
              onChange={(e) => {
                setWordAbout(e.target.value);
                setWordCount(e.target.value.length);
              }}
              value={wordAbout}
            />
            <Fab
              className="profileEditStep8"
              color="primary"
              style={{ position: "absolute", bottom: 16, right: 16 }}
            >
              {" "}
              {wordCount}
            </Fab>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {" "}
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            {" "}
            <Typography variant="h5" className="profileEditStep9">
              Submit Change{" "}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;
