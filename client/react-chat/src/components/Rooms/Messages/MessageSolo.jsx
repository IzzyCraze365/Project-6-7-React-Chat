// Project 7: React Chat
// Team ALJI

import React, { useState } from "react";
import { Button, Input } from "reactstrap";
// import { useNavigate } from "react-router-dom";

const MessageSolo = (props) => {
//   const navigate = useNavigate();
  const { when, user, room, body, _id } = props.chatMessage;
  const [bodyEdit, setBodyEdit] = useState(props.chatMessage.body);

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


  async function messageEdit() {
    let url = `http://localhost:4000/message/update/` + _id;

    let bodyObject = {
      body: body,
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "PATCH",
      body: JSON.stringify(bodyObject),
    };

     try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("EDIT", data, typeof data);
      console.log("Test 0");
      data.chatMessage.body = bodyEdit;
      console.log("Test 1", bodyEdit);
      //TODO need help to get the input field to appear for editing
    setBodyEdit( <Input
      type="text"
      value={bodyEdit}
      onChange={(e) => setBodyEdit(e.target.value)}
    />)
    console.log("Test 2", setBodyEdit, typeof setBodyEdit);
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
          <Button className="chatButton" color="primary" style={{display:"inline", color:"blue"}} onClick={messageEdit}>
          Edit Message
        </Button>
        <Button className="chatButton" color="danger" style={{display:"inline", color:"red"}} onClick={messageDelete}>
          Delete Message
        </Button>
        Date: {when.slice(0,-8).replace("T"," Time: ")}
        </p>
        <p  style={{fontSize:"larger"}} >{body}
        </p>
      </div>
      <div className="my-27">------------------------------</div>

    </>
  );
};

export default MessageSolo;
