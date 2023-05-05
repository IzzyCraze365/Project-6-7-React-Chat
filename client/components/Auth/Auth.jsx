// Project 7: React Chat
// Team ALJI

import Signup from "./Signup";
import Login from "./Login";
import { Col, Container, Row } from "reactstrap";

const Auth = (props) => {
  return (
    <>
      <h2>Hello from Auth</h2>
      <Container>
        <Row>
          <Col md="6">
            <Signup updateToken={props.updateToken}/>
          </Col>
          <Col md="6">
            <Login updateToken={props.updateToken}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
