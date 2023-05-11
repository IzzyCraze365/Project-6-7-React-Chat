// Project 7: React Chat
// Team ALJI

import Signup from "./Signup";
import Login from "./Login";
import { Col, Container, Row } from "reactstrap";

const Auth = (props) => {
  return (
    <>
      <Container>
        <Row>
          <Col md="4">
          <Signup updateToken={props.updateToken}/>
          </Col>
          <Col md="4">
          <Login updateToken={props.updateToken}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
