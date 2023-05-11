// Project 7: React Chat
// Team ALJI

//! We had a flag and a ternary to perform the editMessage feature.  We didn't need it, we were overcomplicating our lives

import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
// import { useNavigate } from "react-router-dom";

const MessageSolo = (props) => {
  //   const navigate = useNavigate();
  const { when, user, room, body, _id } = props.chatMessage;
  const [bodyEdit, setBodyEdit] = useState(props.chatMessage.body);
  const [flag, setFlag] = useState(false);

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
      props.getAllMessages(); // refreshes the table after it has been deleted
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
    // The Postman needed more in our headers

    let requestOptions = {
      headers: myHeaders,
      method: "PATCH",
      body: JSON.stringify(bodyObject),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setFlag(true); // sets flag to make the input field appear
      data.chatMessage.body = bodyEdit;
      setBodyEdit(
        <Form>
          <FormGroup style={{ display: "inline" }}>
            <Input
              type="text"
              value={bodyEdit}
              onChange={(e) => {setBodyEdit(e.target.value); body = bodyEdit}}
            />{" "}
          </FormGroup>
          <Button type="submit">
            Edit
          </Button>
        </Form>
      );
      console.log("body",body, typeof body);
      console.log("bodyEdit",bodyEdit, typeof bodyEdit);
      console.log("setBodyEdit",setBodyEdit, typeof setBodyEdit);
      props.getAllMessages(); // Refreshes page after edit
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      {/* <h2>Hello from MessageSolo inside [Messages] inside [Rooms] </h2> //! TEST */}
      <div style={{ display: "inline" }}>
        <p style={{ fontSize: "large" }}>
          {user}.....
          <Button
            className="chatButton"
            color="primary"
            style={{ display: "inline", color: "blue" }}
            onClick={messageEdit}
          >
            Edit Message
          </Button>
          <Button
            className="chatButton"
            color="danger"
            style={{ display: "inline", color: "red" }}
            onClick={messageDelete}
          >
            Delete Message
          </Button>
          Date: {when.slice(0, -8).replace("T", " Time: ")}
        </p>
        <p style={{ fontSize: "larger" }}>{!flag ? body : bodyEdit}</p>{" "}
        {/* This ternary checks the state of the flag (true/false) and displays the appropriate field based on weather the button has been clicked or not */}
      </div>
      <div className="my-27">------------------------------</div>
    </>
  );
};

export default MessageSolo;
