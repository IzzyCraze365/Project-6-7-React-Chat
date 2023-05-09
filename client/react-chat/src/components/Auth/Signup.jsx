// Project 7: React Chat
// Team ALJI

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

// firstName & lastName & email & password & isAdmin
const Signup = (props) => {
  const [firstName, setFirstName] = useState("New"); //TODO Remove NewGuy
  const [lastName, setLastName] = useState("Guy"); //TODO Remove NewGuy
  const [email, setEmail] = useState("NewGuy@NewGuy.com"); //TODO Remove NewGuy
  const [password, setPassword] = useState("NewGuy"); //TODO Remove NewGuy
  const [isAdmin, setIsAdmin] = useState(false); //TODO Remove NewGuy
  const navigate = useNavigate();

  // Functions
  async function userSignIn(e) {
    e.preventDefault(); /* This stops the page from refreshing */
    let url = `http://localhost:4000/user/create`; /* pulled from Postman */
    let bodyObject = {
      /* copied from Postman, let this be the bodyObject */
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      isAdmin: isAdmin,
    };
    let myHeaders = new Headers();
    myHeaders.append(
      "Content-Type",
      "application/json"
    ); /* This was also pulled from Postman */

    const requestOptions = {
      headers: myHeaders,
      method: "POST",
      body: JSON.stringify(bodyObject),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      props.updateToken(data.token, data.user._id, data.user.firstName, data.user.lastName);
      console.log(data.token);
      navigate("/react-chat"); // Sends you to the Room's page
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      {/*       <h2>Hello from "Signup" inside [Auth] inside [components]</h2> */}
      <center>
        <h2 className="text-center">Signup</h2> {/* Title */}
        <Form onSubmit={userSignIn}>
          {/* FIRST NAME START */}
          <FormGroup>
            <Label>First Name:</Label>
            <Input /* this is where the input is pulled */
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          {/* FIRST NAME END */}
          {/* LAST NAME START */}
          <FormGroup>
            <Label>Last Name:</Label>
            <Input /* this is where the input is pulled */
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
          {/* LAST NAME END */}
          {/* EMAIL START */}
          <FormGroup>
            <Label>Email:</Label>
            <Input /* this is where the input is pulled */
              value={email} /* Standard HTML but applied in React */
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          {/* EMAIL END */}
          {/* PASSWORD START */}
          <FormGroup>
            <Label>Password:</Label>
            <Input /* this is where the input is pulled */
              value={password}
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          {/* PASSWORD END */}
          {/* ISADMIN START */}
          <FormGroup>
            <Label>Admin?:</Label> {/* //TODO Hide this */}
            <Input /* this is where the input is pulled */
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
            />
          </FormGroup>
          {/* ISADMIN END */}
          <div className="d-grid gap-2 mb-4">
            {" "}
            {/* D-Grid, Gap of 2, Margin Bottom of 4 */}
            <Button type="submit" color="danger">
              Sign Up
            </Button>
          </div>
        </Form>
      </center>
    </>
  );
};

export default Signup;
