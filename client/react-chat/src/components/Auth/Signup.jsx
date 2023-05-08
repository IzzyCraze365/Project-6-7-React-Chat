// Project 7: React Chat
// Team ALJI



import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

// firstName & lastName & email & password & isAdmin
const Signup = (props) => {
  const [firstName, setFirstName] = useState("New");
  const [lastName, setLastName] = useState("Guy");
  const [email, setEmail] = useState("NewGuy@NewGuy.com");
  const [password, setPassword] = useState("NewGuy");
  const [isAdmin, setIsAdmin] = useState("false");

  // Functions
  async function userSignIn(e) {
    e.preventDefault(); /* This stops the page from refreshing */
    let url = `http://localhost:4000/user/create`; /* pulled from Postman */
    let bodyObject = {
      /* copied from Postman, let this be the bodyObject */
      firstname: firstName,
      lastname: lastName,
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
      console.log("Before Test"); //! TEST
      const response = await fetch(url, requestOptions);
      console.log("Response", response); //! TEST
      const data = await response.json();
      console.log("Here i am"); //! TEST
      console.log("DATA",data);
      props.updateToken(data.token);
      console.log("Token",data.token);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
{/*       <h2>Hello from "Signup" inside [Auth] inside [components]</h2> //! TEST */}
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
