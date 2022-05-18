import React, { useState, useMemo } from "react";
import InputBox from "./InputBox";
import { Box, Typography, Button, Divider } from "@material-ui/core";
import "./TransferCoin.css";
import Notification from "../.././Notification/Notification";
import { useMutation } from "@apollo/client";

import { SEND_USER_COIN, GET_CURRENT_USER } from "../../queries";

//TODO the user cannot send to yourself

function TransferCoin({ account, coins, allUsers }) {
  const [currency, setCurrency] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState();
  const [message, setMessage] = useState(null);
  const [delay, setDelay] = useState(false);
  const [coinCounter, setCoinCounter] = useState(0);

  const [sendUser] = useMutation(SEND_USER_COIN, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });
  const currencies = account.portfolioCoins.map((el) => ({
    value: { quantity: el.quantity, name: el.name },
    label: el.name,
  }));

  const messageSetter = (content) => {
    setMessage(content);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  const getAccountQuantity = (currency) => {
    if (!currency) {
      return;
    }
    return account.portfolioCoins.find((el) => el.name === currency).quantity;
  };

  const userQuantity = useMemo(
    () => getAccountQuantity(currency),
    [currency, account]
  );

  const handleAmount = (e) => {
    const temp = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");

    setAmount(temp);
  };

  const handleWalletAddress = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleSubmit = () => {
    const numAmount = Number(amount);
    const userExist = allUsers.find(
      (el) => el.username.toLowerCase() === walletAddress
    );
    console.log(userExist, allUsers);
    if (delay) {
      messageSetter(
        "Cannot perform transaction with a small time frame, give us 5 seconds please"
      );
      return;
    }

    if (!currency) {
      messageSetter(`You have yet to put in a currency`);
      return;
    }
    if (!numAmount && !walletAddress) {
      messageSetter("Sorry, you did not put anything");
    } else if (!numAmount) {
      messageSetter("You need to put something in the amounts");
    } else if (!walletAddress || !userExist) {
      messageSetter(
        "Either you did not put in a walletAddress or you put in an invalid one"
      );
    } else if (userQuantity < numAmount) {
      messageSetter(
        "You do not have enough to make this transaction, please try again"
      );
    } else if (0.001 > numAmount) {
      messageSetter(
        `You need to have made a transaction of at least 0.001 of ${currency} to perform this transaction `
      );
    } else if (numAmount) {
      setDelay(true);
      setTimeout(() => {
        setDelay(false);
      }, 5000);
      sendUser({
        variables: {
          name: currency,
          username: walletAddress,
          quantity: Number(amount),
        },
      });
      const idx = account.portfolioCoins.findIndex(
        (el) => el.name === currency
      );
      messageSetter(
        `you have successfully send ${numAmount} of ${currency} to the user`
      );
    }
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Transfer Coins</Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            mt: 2,
            pb: 2,
          }}
        >
          <Notification message={message} />
          <Typography variant="h7">
            {" "}
            Amount{" "}
            <span style={{ color: "grey", marginLeft: "5px" }}>
              {" "}
              "minimum value "0.001 BTC"
            </span>
          </Typography>
          <Typography>
            {currency} amount: {userQuantity}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <InputBox
              displayCoin={true}
              isWallet={true}
              setCurrency={setCurrency}
              currency={currency}
              content="Enter Amount"
              handleValue={handleAmount}
              value={amount}
              currencies={currencies}
              setCoinCounter={setCoinCounter}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h7">wallet address</Typography>
            <Box sx={{ mt: 2 }}>
              <InputBox
                displayCoin={false}
                isWallet={false}
                setCurrency={setCurrency}
                currency={currency}
                content="Enter Wallet Address"
                handleValue={handleWalletAddress}
                value={walletAddress}
                currencies={currencies}
              />
            </Box>
          </Box>{" "}
          <Box sx={{ mt: 2, ml: 2 }} />
          <Button
            onClick={handleSubmit}
            className="transfer-button"
            variant="contained"
          >
            <Typography variant="h6" className="btn-text">
              Transfer Now
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TransferCoin;
