// Project 7: React Chat
// Team ALJI

import Signup from "./Signup";
import Login from "./Login";
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

const Auth = (props) => {
  const [loginBoo, setLoginBoo] = useState(false);

  function handleLoginClick() {
    if(loginBoo === false) {
      setLoginBoo(true);
    } else {
      setLoginBoo(false);
    }
  }



  return (
    <>
      <Container fluid>
        <Row>
          <Col md="4" style={{}}>
            {!loginBoo ? <p>Already a User?   <button className="smallBtn" onClick={handleLoginClick}>Login</button></p> : <p>Not a User yet?   <button className="smallBtn" onClick={handleLoginClick}>Signup</button></p>}
            
          {!loginBoo ? <Signup loginBoo={loginBoo} updateToken={props.updateToken}/> : <Login updateToken={props.updateToken}/>}
          </Col>
          <Col md="4">
          
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
