// Project 7: React Chat
// Team ALJI

import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
//import jwt_decode from "jwt-decode";
// import { useNavigate } from "react-router-dom";

const MessageSolo = (props) => {
  //   const navigate = useNavigate();
  const { when, user, room, _id } = props.chatMessage;
  const [body, setBody] = useState(props.chatMessage.body);
  const [editFlag, setEditFlag] = useState(false);
  let username = props.username;
  let roomID = props.roomID;
  // var decoded = jwt_decode(props.token)

  /* console.log("Solo shot first", _id); //! TEST */

  async function messageDelete() {
    let url = `http://localhost:4000/message/delete/` + _id;
    /* console.log("Solo shot second", _id); //! TEST */
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      props.getAllMessages(); // refreshes the table after it has been deleted
      window.location.reload(true); // TODO Find alternative to this page refresh
    } catch (error) {
      console.error(error.message);
    }
  }

  /* this function only handles sending the changes to the server */
  async function messageEdit() {
    let url = `http://localhost:4000/message/update/` + _id;
    let bodyObject = {
      body: body,
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);
    // The Postman needed more in our headers

    let requestOptions = {
      headers: myHeaders,
      method: "PATCH",
      body: JSON.stringify(bodyObject),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setEditFlag(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  function editBox() {
    /* popup box that can edit message and save on button click */
    return (
      <Form className="edit">
        <FormGroup style={{ display: "inline" }}>
          <Input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button type="submit" onClick={messageEdit}>
            Edit Message
          </Button>
        </FormGroup>
      </Form>
    );
  }

  return (
    <>
      {/* <h2>Hello from MessageSolo inside [Messages] inside [Rooms] </h2> //! TEST */}
      <div style={{ display: "inline" }}>
        <p style={{ fontSize: "large" }}>
          {user}..... Date: {when.slice(0, -8).replace("T", " Time: ")}
          ..........
          <Button
            className="chatButton"
            color="primary"
            style={{ display: "inline", color: "black" }}
            onClick={() => setEditFlag(true)}
            disabled={editFlag}
          >
            Edit
          </Button>
          <Button
            className="chatButton"
            color="danger"
            style={{ display: "inline", color: "black" }}
            onClick={messageDelete}
            disabled={editFlag}
          >
            Delete
          </Button>
        </p>
        {!editFlag ? (
          <p style={{ fontSize: "larger" }}>{props.chatMessage.body}</p>
        ) : (
          editBox()
        )}{" "}
        {/* this calls the function that handles the new input field */}
      </div>
      <div className="my-27">------------------------------</div>
    </>
  );
};

export default MessageSolo;
