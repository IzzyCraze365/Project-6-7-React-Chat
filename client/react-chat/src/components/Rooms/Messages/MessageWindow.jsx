// Project 7: React Chat
// Team ALJI

import MessageSolo from "./MessageSolo";

const MessageWindow = (props) => {
  return (
    <>
      <h2>Hello from MessageWindow inside [Messages] inside [Rooms] </h2>
      {props.messages.map((messages, index) => (
        <MessageSolo
          key={index}
          messages={messages}
          token={props.token}
          getAllMessages={props.getAllMessages}
        />
      ))}
    </>
  );
};

export default MessageWindow;
