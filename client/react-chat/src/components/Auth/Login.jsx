// Project 7: React Chat
// Team ALJI

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

// email & password
const Login = (props) => {
  // UseState variables
  const [email, setEmail] = useState("NewGuy@NewGuy.com"); //TODO Remove NewGuy
  const [password, setPassword] = useState("NewGuy"); //TODO Remove NewGuy
  // BrowserRouter Hook
  const navigate = useNavigate();

  // Functions
  async function userLogIn(e) {
    e.preventDefault(); /* This stops the page from refreshing */
    let url = `http://localhost:4000/user/login`; /* pulled from Postman */

    let bodyObject = {
      /* copied from Postman, let this be the bodyObject */
      email: email,
      password: password,
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
      console.log(data);
      if (
        data.message === "React Chat User Logged In" ||
        data.message === "Administrator Logged In"
      ) {
        props.updateToken(data.token, data.user._id, data.user.firstName, data.user.lastName);
        console.log(data.token);
        navigate("/react-chat"); // Sends you to the Room's page
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <center>
        {/* <h2>Hello from "Login" inside [Auth] inside [components]</h2> //! TEST */}
        <h2>Log In</h2> {/* Title */}
        <Form onSubmit={userLogIn}>
          {/* EMAIL START */}
          <FormGroup>
            <Label>Email:</Label>
            <Input /* this is where the input value is pulled from */
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          {/* EMAIL END */}
          {/* PASSWORD START */}
          <FormGroup>
            <Label>Password:</Label>
            <Input /* this is where the input is pulled */
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          {/* PASSWORD END */}
          <div className="d-grid gap-2 mb-4">
            {" "}
            {/* D-Grid, Gap of 2, Margin Bottom of 4 */}
            <Button type="submit" color="primary">
              Log In
            </Button>
          </div>
        </Form>
      </center>
    </>
  );
};

export default Login;
