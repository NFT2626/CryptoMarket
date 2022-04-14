import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
    }
  }
`;

export const ADD_WATCHLIST = gql`
  mutation addWatchList($coin: String!) {
    addWatchList(coin: $coin)
  }
`;

export const GET_WATCHLIST_COINS = gql`
  query getWatchListCoins {
    getWatchListCoins
  }
`;

export const REMOVE_WATCHLIST = gql`
  mutation removeWatchList($coin: String!) {
    removeWatchList(coin: $coin)
  }
`;
