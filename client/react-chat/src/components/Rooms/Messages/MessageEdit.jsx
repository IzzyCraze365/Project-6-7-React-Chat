// Project 7: React Chat
// Team ALJI

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Label, FormGroup, Input, Button } from "reactstrap";

const MessageEdit = (props) => {
  // UseState Variables
  const [when, setWhen] = useState("");
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [body, setBody] = useState("");
  /* let formattedDate = date.split("T")[0]; */

  const navigate = useNavigate();
  //   useParams() from react-router-dom
  const { id } = useParams();
  //   UseEffect
  useEffect(() => {
    if (props.token) {
      getMessageById();
    }
  }, [props.token]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(id);

    let url = `http://localhost:4000/message/update/` + id;

    let bodyObject = {
      when: when,
      user: user,
      room: room,
      body: body,
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      headers: myHeaders,
      method: "PATCH",
      body: JSON.stringify(bodyObject),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      console.log("data.message", data.message); //! TEST
      if (data.message === "Message has been Updated") {
        navigate("/messages");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getMessageById() {
    let url = `localhost:4000/message/display-all/` + id;

    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
      headers: myHeaders,
      method: "GET",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("DATA", data);
      setWhen(data.messages.when);
      setUser(data.messages.user);
      setRoom(data.messages.room);
      setBody(data.messages.body);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <h3>Hello from MessageCreate inside [Messages] inside [Rooms] </h3>
      <Form className="create" onSubmit={handleSubmit}>
        <FormGroup>
          <Label>When:</Label>
          <Input
            type="time"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
          />
        </FormGroup>

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

export default MessageEdit;
