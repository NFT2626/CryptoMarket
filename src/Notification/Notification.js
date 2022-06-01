//import libraries
import React from "react";

//this component is responsible for displaying the messages

function Notification({ message }) {
  if (!message) { //if there is no message it will display none
    return null;
  }
  const yes = message.startsWith("you have successfully"); //if the message begins with the "you have successfully" then the message will be green else red
  return <div style={{ color: yes ? "green" : "red" }} //displays the message
  >{message}</div>;
}

export default Notification; //exports the component
