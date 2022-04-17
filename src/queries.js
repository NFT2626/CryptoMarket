import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $lastName: String!
    $name: String!
  ) {
    createUser(
      username: $username
      password: $password
      lastName: $lastName
      name: $name
    ) {
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

export const GET_CURRENT_USER = gql`
  query me {
    me {
      name
      lastName
      username
      transactionHistory {
        name
        bought_price
        quantity
        date
        type
        id
      }
      watchListCoins
      portfolioCoins {
        name
        quantity
        owner
        id
      }
      fiatBalance
    }
  }
`;

export const BUY_MARKET_COIN = gql`
  mutation buyMarketCoin(
    $name: String!
    $bought_price: Float!
    $quantity: Float!
  ) {
    buyMarketCoin(
      name: $name
      bought_price: $bought_price
      quantity: $quantity
    ) {
      name
      bought_price
      quantity
    }
  }
`;

export const SELL_MARKET_COIN = gql`
  mutation sellMarketCoin(
    $name: String!
    $sellPrice: Float!
    $quantity: Float!
  ) {
    sellMarketCoin(name: $name, sell_price: $sellPrice, quantity: $quantity) {
      name
      bought_price
      quantity
      date
      type
    }
  }
`;
