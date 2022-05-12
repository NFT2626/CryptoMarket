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
      watchListCoins
      portfolioValueDates {
        assetValueTotal
        date
        id
      }
      fiatBalance
      id
      portfolioCoins {
        name
        quantity
        owner
        id
      }
      transactionHistory {
        name
        bought_price
        quantity
        date
        type
        id
      }
      sendReceiverHistories {
        receiver
        sender
        name
        quantity
        id
        date
      }
      imageProfile
      aboutMe
      limitCoins {
        name
        bought_price
        quantity
        date
        type
        id
      }
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

export const ADD_PORTFOLIO_DATE_VALUE = gql`
  mutation addPortfolioDateValue($assetValueTotal: Float!) {
    addPortfolioDateValue(assetValueTotal: $assetValueTotal) {
      assetValueTotal
      date
    }
  }
`;

export const GET_ALL_USERS = gql`
  query Query {
    allUsers {
    name
    lastName
    username
    imageProfile
    aboutMe
    portfolioCoins {
      name
      quantity
      owner
      id
    }
    fiatBalance
    id
  }
  }
`;

export const SEND_USER_COIN = gql`
  mutation Mutation($username: String!, $quantity: Float!, $name: String!) {
    sendUser(username: $username, quantity: $quantity, name: $name)
  }
`;

export const CHANGE_PROFILE = gql`
  mutation changeProfile(
    $name: String!
    $lastName: String!
    $aboutMe: String!
  ) {
    changeProfile(name: $name, lastName: $lastName, aboutMe: $aboutMe)
  }
`;
export const CHANGE_PROFILE_PICTURE = gql`
  mutation changeProfilePicture($file: Upload!) {
    changeProfilePicture(file: $file) {
      url
    }
  }
`;

export const CHANGE_NAME = gql`
  mutation changeName($name: String!) {
    changeName(name: $name)
  }
`;

export const CHANGE_LAST_NAME = gql`
  mutation changeLastName($lastName: String!) {
    changeLastName(lastName: $lastName)
  }
`;

export const CHANGE_ABOUT_ME = gql`
  mutation changeAboutMe($aboutMe: String!) {
    changeAboutMe(aboutMe: $aboutMe)
  }
`;

export const GET_LIMIT =gql`
query Query {
  getLimitCoins {
    name
    bought_price
    quantity
    date
    type
  }
}
`
export const BUY_LIMIT =gql`
mutation Mutation($name: String!, $boughtPrice: Float!, $quantity: Float!) {
  buyLimitCoins(name: $name, bought_price: $boughtPrice, quantity: $quantity) {
    name
  }
}
`

export const NOW_BUY_LIMIT =gql`
mutation Mutation($name: String!, $boughtPrice: Float!, $quantity: Float!, $id: String!) {
  nowBuyingCoinLimit(name: $name, bought_price: $boughtPrice, quantity: $quantity, id: $id) {
    name
  }
}
`


export const CANCEL_LIMIT =gql`
mutation CancelLimitCoin($cancelLimitCoinId: String!) {
  cancelLimitCoin(id: $cancelLimitCoinId)
}

`

export const SELL_LIMIT = gql`
mutation Mutation($name: String!, $sellPrice: Float!, $quantity: Float!) {
  sellLimitCoins(name: $name, sell_price: $sellPrice, quantity: $quantity) {
    name
  }
}

`

export const NOW_SELL_LIMIT = gql`
mutation Mutation($name: String!, $sellPrice: Float!, $quantity: Float!, $id: String!) {
  nowSellLimitCoin(name: $name, sell_price: $sellPrice, quantity: $quantity, id: $id) {
    name
  }
}
`