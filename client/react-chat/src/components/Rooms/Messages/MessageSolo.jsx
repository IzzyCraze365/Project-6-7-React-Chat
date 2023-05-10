// Project 7: React Chat
// Team ALJI

import React from "react";
import MessageEdit from "./MessageEdit";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const MessageSolo = (props) => {
  const navigate = useNavigate();
  const { when, user, room, body, _id } = props.chatMessage;

  async function messageDelete() {
    let url = `http://localhost:4000/message/delete/` + _id;

    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      // refresh the table after it has been deleted
      props.getAllMessages();
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <>
      {/* <h2>Hello from MessageSolo inside [Messages] inside [Rooms] </h2> //! TEST */}
      <div style={{display:"inline"}}>
      <p style={{fontSize:"large"}} >{user}.....
          <Button color="primary" style={{display:"inline", color:"blue"}} onClick={() => navigate(`http://localhost:4000/message/update/${_id}`)}>
          Edit Message
        </Button>
        <Button color="danger" style={{display:"inline", color:"red"}} onClick={messageDelete}>
          Delete Message
        </Button>
        </p>
        <p  style={{fontSize:"larger"}} >{body}
        </p>
      </div>
      <div className="my-27">------------------------------</div>

    </>
  );
};

export default MessageSolo;
