// Project 7: React Chat
// Team ALJI

import Signup from "./Signup";
import Login from "./Login";
import { Col, Container, Row } from "reactstrap";

const Auth = (props) => {
  return (
    <>
      <h2>Hello from "Auth" inside [Auth] inside [components]</h2> {/* //! TEST */}
      <Container>
        <Row>
          <Col md="6">
{/*             <Signup/>
          </Col>
          <Col md="6">
            <Login /> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
