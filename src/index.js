//This is the index of the application that basically sets up the configuration
// Such as styling and communication to the backend

//Importing Libraries
import React from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

//Importing components
import App from "./App.js";


//Sets up the user authentication of the user 
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("user-token"); //Gets the token from the local storage
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }, //Creates the authentication headings for the user, such that it is able to be used to verify request that requires permission
  };
});

const httpLink = createUploadLink({ uri: "/graphql" }); //Establishes link to the URL address of the backend

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
}); //Sets up the configuration for the graphql server, it is using the cache designed by graphql 


//Renders the react dom 
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </ApolloProvider>
  </React.StrictMode>,

  document.querySelector("#root")
);
