// Project 7: React Chat
// Team ALJI

import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import MessageCreate from "./MessageCreate";
import MessageWindow from "./MessageWindow";

const MessageIndex = (props) => {
  // TODO: setChatMessage - capitalized the C - every instance
  const [chatMessage, setchatMessage] = useState([]);

  async function getAllMessages() {
    let url = `http://localhost:4000/message/display-all/Test`; /* + props.room_id */

    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    const requestOptions = {
      headers: myHeaders,
      method: "GET",
    };
    // The Postman needed more in our headers

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("MessageIndex Try DATA", data);
      setchatMessage(data.chatMessage);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    if (props.token) {
      console.log("TEST 1 - useEffect")
      getAllMessages();
    }
  }, [props.token]);
  return (
    <>
      <Container className="chatWindow">
        {/*         <h2>Hello from Message Index inside [Messages] inside [Rooms] </h2> //! TEST */}
        <div>
          <MessageWindow
            chatMessage={chatMessage}
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
