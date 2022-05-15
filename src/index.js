import * as React from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App.js";

import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("user-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = createUploadLink({ uri: "/graphql" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

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
