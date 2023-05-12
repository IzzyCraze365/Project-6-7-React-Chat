// Project 7: React Chat
// Team ALJI

import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
// To create boiler place use "sfc + [tab]"

const MessageCreate = (props) => {
/*   const { when, user, room, _id } = props.chatMessage; */
  const [user, setUser] = useState("");
  const [room, setRoom] = useState(props.room_id);
  const [body, setBody] = useState("");

  // functions
  async function createMessageChat(e) {
    e.preventDefault();
    let url = `http://localhost:4000/message/create`;

    /* let formattedDate = date.split("T")[0]; */

    let bodyObject = {
      user: user,
      room: room,
      body: body,
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);
    // The Postman needed more in our headers

    const requestOptions = {
      headers: myHeaders,
      method: "POST",
      body: JSON.stringify(bodyObject),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      props.getAllMessages();
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <>
      {/* <h3>Hello from MessageCreate inside [Messages] inside [Rooms] </h3> //! TEST*/}
      <Form className="create" onSubmit={createMessageChat}>
        <FormGroup>
          <Label>User:</Label>
          <Input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Room:</Label>
          <Input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Message:</Label>
          <Input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </FormGroup>
        <div className="d-grid gap-2 mb-4">
          <Button type="submit" color="success">
            Send Message
          </Button>
        </div>
      </Form>
    </>
  );
};

export default MessageCreate;
