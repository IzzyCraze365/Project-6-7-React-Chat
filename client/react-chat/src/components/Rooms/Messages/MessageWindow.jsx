// Project 7: React Chat
// Team ALJI

import MessageSolo from "./MessageSolo";

const MessageWindow = (props) => {
// console.log(props) //! TEST

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
          />
        ))}
      </div>
    </>
  );
};

export default MessageWindow;
