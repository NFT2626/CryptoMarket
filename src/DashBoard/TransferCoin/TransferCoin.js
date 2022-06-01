//Importing libraries
import React, { useState, useMemo } from "react";
import InputBox from "./InputBox";
import { Box, Typography, Button } from "@material-ui/core";
import "./TransferCoin.css";
import Notification from "../.././Notification/Notification";
import { useMutation } from "@apollo/client";
import Tooltip from "@mui/material/Tooltip";


//importing queries
import { SEND_USER_COIN, GET_CURRENT_USER } from "../../queries";

//TODO the user cannot send to himself
//TODO add help that the walletAddress is the same as the username
function TransferCoin({ account, allUsers }) {
  //initialise states
  const [currency, setCurrency] = useState(""); //the currency for which the user selects
  const [walletAddress, setWalletAddress] = useState(""); //the walletAddress which the user chooses
  const [amount, setAmount] = useState(); //amount being sent
  const [message, setMessage] = useState(null); //the message 
  const [delay, setDelay] = useState(false);//delay to prevent spam
  const [coinCounter, setCoinCounter] = useState(0);


  const [sendUser] = useMutation(SEND_USER_COIN, { //mutation that allows the user to send the coin over the backend
    refetchQueries: [{ query: GET_CURRENT_USER }], //once executed it will fetch the current user information
    onError: (error) => {
      console.log(error.graphQLErrors[0].message); //displays the error
    },
  });
  const currencies = account.portfolioCoins.map((el) => ({ //loop through each of the portfolioCoins to construct the currency
    value: { quantity: el.quantity, name: el.name }, //the value is the quantity of the coin and the name of the coin for each of the currency
    label: el.name, //what is it displayed the user is the name
  }));

  const messageSetter = (content) => { //assists in displaying the message
    setMessage(content);  //sets the message
    //after 5 seconds it will set the message to nothing
    setTimeout(() => { 
      setMessage(null);
    }, 5000);
  };
  const getAccountQuantity = (currency) => {
    if (!currency) { //if the user does not own the currency
      return; //return nothing
    }
    return account.portfolioCoins.find((el) => el.name === currency).quantity; //else return the quantity of tht coin
  };

  const userQuantity = useMemo( //usememo for optimisation as it caches the results
    () => getAccountQuantity(currency), //gets the quantity of the currency
    [currency, account] //takes the currency and account as the parameters
  );

  const handleAmount = (e) => { //handles whenever the user enters an amount
    const temp = e.target.value //makes it so that the user can only enter floating point numbers
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
      const validated = temp.match(/^(\d*\.{0,1}\d{0,3}$)/)
      if (validated) {
    setAmount(temp); //set the amount to the temp
      }
  };

  const handleWalletAddress = (e) => { //gets the textfield of the walletAddress textfield
    setWalletAddress(e.target.value); //set the WalletAdddress to the target
  };

  const handleSubmit = () => {
    const numAmount = Number(amount); //Changes the amount field to be a number
    const userExist = allUsers.find( //sees if the user exists or not
      (el) => el.username.toLowerCase() === walletAddress //comparing the username to the walletAddress that has been entered
    );
    if (delay) {
      //if the user sends too quickly then display the following:
      messageSetter(
        "Cannot perform transaction with a small time frame, give us 5 seconds please"
      );
      return;
    }
    if(account.username === walletAddress){
      //if the user entered the same username as themselves display the following:
      messageSetter('you cannot send to yourself');
      return; //terminate

    }

    if (!currency) {
      //if the user still haven't entered a currency display the following:
      messageSetter(`You have yet to put in a currency`);
      return; //terminate
    }
    if (!numAmount && !walletAddress) {
      //if the user enters nothing in either fields display the following:
      messageSetter("Sorry, you did not put anything");
    } else if (!numAmount) {
      //if the use didn't enter anything in the amount textfield display the following:
      messageSetter("You need to put something in the amounts");
    } else if (!walletAddress || !userExist) {
      //if the user didn't enter anything in the walletAddress or the user does not exist display the following:
      messageSetter(
        "Either you did not put in a walletAddress or you put in an invalid one"
      );
    } else if (userQuantity < numAmount) {
      //if the amount that the user entered is beyond what the user owns display the following:
      messageSetter(
        "You do not have enough to make this transaction, please try again"
      );
    } else if (0.001 > numAmount) {
      //if the amount entered is less than 0.01 display the following:
      messageSetter(
        `You need to have made a transaction of at least 0.001 of ${currency} to perform this transaction `
      );
    } else if (numAmount) {
      //the user is successful and the user entered an amount that is appropriate
      setDelay(true); //set the delay to be true
      //set it back to false after 5 seconds
      setTimeout(() => {
        setDelay(false);
      }, 5000);
      sendUser({ //sends the currency to the other user
        variables: {
          name: currency,
          username: walletAddress,
          quantity: Number(amount),
        },
      });
        //displays success message
      messageSetter(
        `you have successfully send ${numAmount} of ${currency} to the user`
      );
    }
  };
  return (
    <Box sx={{ padding: 10 }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom //the title of the component
      >
        Transfer Coins</Typography>
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
          <Notification message={message} //component to display the message
          />
          <Typography variant="h7"
          //help to show that user cannot enter anything less than 0.001 of any coin
          >
            {" "}
            Amount{" "}
            <span style={{ color: "grey", marginLeft: "5px" }}>
              {" "}
              "minimum value "0.001 any coin"
            </span>
          </Typography>
          <Typography
          //displays the amount that the user owns
          >
            {currency} amount: {userQuantity}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <InputBox //textfield for the user to enter the amount and select currency
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
            <Tooltip //displays help once hovered
            title="this is the same the username of the user being sent"
            >
            <Typography variant="h7"
            //this is where the user enters the wallet address
            >wallet address</Typography>
            </Tooltip>
            <Box sx={{ mt: 2 }}>
              <InputBox //the textfield to enter the wallet address 
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
          <Button //button that allows the user to submit 
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
