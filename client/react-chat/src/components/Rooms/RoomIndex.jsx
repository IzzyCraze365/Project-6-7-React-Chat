// Project 7: React Chat
// Team ALJI

import React, { useState, } from 'react';
import { Button, Col, Container, Row, Table } from "reactstrap";
import RoomCreate from './RoomCreate';
import MessageIndex from './Messages/MessageIndex';
import { useNavigate } from 'react-router-dom';


const RoomIndex = (props) => {
    let lastInitial = props.lastName.charAt(0).toUpperCase();
    let username = props.firstName + lastInitial;
    const [roomArray, setRoomArray] = useState([]);
    const navigate = useNavigate();
    const userID = props.userID;


    function userEditClick() {
        navigate(`/update/${userID}`)
    };


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
                <Col md="4" >
                    {/* Username based on first name and last initial */}
                    <h3>Username: {username}</h3>
                    {/* Room Drop Down */}

                    <div className="d-flex p-5">
                        <form id='select-room-form'>
                            <h4>Select Chat Room: </h4>
                            <select name="selectRoom" id="room-select">
                                <option value="0"></option>
                            </select>
                        </form>
                    </div>
                    <RoomCreate token={props.token} getAllRooms={getAllRooms} roomArray={roomArray} />
                    <div>
                        <Button type='submit' onClick={userEditClick} >Edit User</Button>
                    </div>
                </Col>
                <Col md="8">
                    <Table>
                        <thead>
                            <tr>
                                <th>[Selected Room Name]</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    [Display Message Window]
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <MessageIndex token={props.token} getAllRooms={getAllRooms} roomArray={roomArray} username={username}/>
                </Col>
            </Row>
        </Container>
        </>
     );
}
 
export default RoomIndex;