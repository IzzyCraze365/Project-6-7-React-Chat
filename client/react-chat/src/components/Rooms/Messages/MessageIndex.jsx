// Project 7: React Chat
// Team ALJI

import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import MessageCreate from "./MessageCreate";
import MessageWindow from "./MessageWindow";

const MessageIndex = (props) => {
  const [messages, setMessages] = useState([]);

  async function getAllMessages() {
    let url = `localhost:4000/message/display-all/:room`;

    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    const requestOptions = {
      headers: myHeaders,
      method: "GET",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      setMessages(data.messages);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    if (props.token) {
      getAllMessages();
    }
  }, [props.token]);

  return (
    <>
      <Container className="chatWindow">
        <h2>Hello from Message Index inside [Messages] inside [Rooms] </h2>
        <div>
          <MessageWindow
            messages={messages}
            token={props.token}
            getAllMessages={getAllMessages}
          />
          <MessageCreate token={props.token} getAllMessages={getAllMessages} />
        </div>
      </Container>
    </>
  );
};

export default MessageIndex;
