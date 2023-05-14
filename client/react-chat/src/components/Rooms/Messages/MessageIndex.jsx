// Project 7: React Chat
// Team ALJI

import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import MessageCreate from "./MessageCreate";
import MessageWindow from "./MessageWindow";

const MessageIndex = (props) => {
  const [chatMessage, setChatMessage] = useState(props.chatMessage);
  let username = props.username;
  let roomID = props.roomID; // This gets the room ID from props for the URL

  useEffect(() => {
    if (props.token) {
      // console.log("TEST 1 - useEffect") //! TEST
      props.getAllMessages();
    }
  }, [props.token]);
  return (
    <>
      <Container>
        {/*         <h2>Hello from Message Index inside [Messages] inside [Rooms] </h2> //! TEST */}
        <div className="chatWindow">
          <MessageWindow
            chatMessage={props.chatMessage}
            token={props.token}
            getAllMessages={props.getAllMessages}
            username={username}
            roomID={roomID}
          />
        </div>
        <div className="createBox">
          <MessageCreate
            token={props.token}
            getAllMessages={props.getAllMessages}
            username={username}
            roomID={roomID}
          />
        </div>
      </Container>
    </>
  );
};

export default MessageIndex;
