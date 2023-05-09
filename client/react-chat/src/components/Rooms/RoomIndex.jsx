// Project 7: React Chat
// Team ALJI

import React, { useState } from 'react';
import { Col, Container, Row } from "reactstrap";
import RoomCreate from './RoomCreate';
import UserEdit from './User/UserEdit';
import MessageIndex from './Messages/MessageIndex';

// TODO: import UserEdit and MessageIndex

const RoomIndex = (props) => {
    const [roomArray, setRoomArray] = useState([]);

    async function getAllRooms() {
        let url = `http://localhost:4000/room/display-all`;
        let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);

        const requestOptions = {
            headers: myHeaders,
            method: "GET",
        };
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);
            setRoomArray(data.log);
        } catch (error) {
            console.error(error.message);
        };
    }

    return ( 
        <>
        <Container>
            <Row>
                <Col md="4">
                    <RoomCreate token={props.token} getAllRooms={getAllRooms} roomArray={roomArray} />
                    <UserEdit token={props.token}/>
                </Col>
                <Col md="8">
                    <MessageIndex />
                </Col>
            </Row>
        </Container>
        </>
     );
}
 
export default RoomIndex;