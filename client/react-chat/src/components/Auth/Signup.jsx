// Project 7: React Chat
// Team ALJI

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

// firstName & lastName & email & password & isAdmin
const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
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
      props.updateToken(
        data.token,
        data.user._id,
        data.user.firstName,
        data.user.lastName,
        data.user.email,
        data.user.password,
        data.user.isAdmin
      );
      console.log(data.token);
      navigate("/react-chat"); // Sends you to the Room's page
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      {/*       <h2>Hello from "Signup" inside [Auth] inside [components]</h2> */}
      <div className="form-container">
        <h2 className="text-center">SIGNUP</h2> {/* Title */}
        <Form onSubmit={userSignIn}>
          {/* FIRST NAME START */}
          <FormGroup className="form-group">
            <Label>First Name:</Label>
            <Input /* this is where the input is pulled */
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          {/* FIRST NAME END */}
          {/* LAST NAME START */}
          <FormGroup className="form-group">
            <Label>Last Name:</Label>
            <Input /* this is where the input is pulled */
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
          {/* LAST NAME END */}
          {/* EMAIL START */}
          <FormGroup className="form-group">
            <Label>Email:</Label>
            <Input /* this is where the input is pulled */
              value={email} /* Standard HTML but applied in React */
              // type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          {/* EMAIL END */}
          {/* PASSWORD START */}
          <FormGroup className="form-group">
            <Label>Password:</Label>
            <Input /* this is where the input is pulled */
              value={password}
              // type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          {/* PASSWORD END */}
          {/* ISADMIN START */}
          <FormGroup className="form-group">
            <Label>Admin?:</Label> {/* //TODO Hide this */}
            <Input /* this is where the input is pulled */
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
            />
          </FormGroup>
          {/* ISADMIN END */}
          <center>
            {" "}
            {/* D-Grid, Gap of 2, Margin Bottom of 4 */}
            <Button className="bigBtn" type="submit" color="danger">
              Sign Up
            </Button>
          </center>
        </Form>
      </div>
    </>
  );
};

export default Signup;
