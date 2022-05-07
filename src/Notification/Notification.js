import React from "react";

function Notification({ message }) {
  if (!message) {
    return null;
  }
  const yes = message.startsWith("you have successfully");
  //do the same thing with the login and register page but using || short circuiting - guanos
  return <div style={{ color: yes ? "green" : "red" }}>{message}</div>;
}

export default Notification;
