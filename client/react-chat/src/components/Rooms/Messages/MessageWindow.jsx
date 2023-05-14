// Project 7: React Chat
// Team ALJI

import MessageSolo from "./MessageSolo";

const MessageWindow = (props) => {
  let username = props.username;
  let roomID = props.roomID;

  /* console.log("Pokey",props.chatMessage); //! TEST */

  return (
    <>
      {/*       <h2>Hello from MessageWindow inside [Messages] inside [Rooms] </h2> //! TEST */}
      <div>
        {props.chatMessage.map((chatMessage, index) => (
          <MessageSolo
            key={index}
            chatMessage={chatMessage}
            token={props.token}
            getAllMessages={props.getAllMessages}
            username={username}
            roomID={roomID}
          />
        ))}
      </div>
    </>
  );
};

export default MessageWindow;
