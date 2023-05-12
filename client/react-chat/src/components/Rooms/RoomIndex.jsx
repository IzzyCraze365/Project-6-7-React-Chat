// Project 7: React Chat
// Team ALJI

import React, { useState, } from 'react';
import { Button, Col, Container, Input, Row, Table } from "reactstrap";
import RoomCreate from './RoomCreate';
import MessageIndex from './Messages/MessageIndex';
import { useNavigate } from 'react-router-dom';


const RoomIndex = (props) => {
    let lastInitial = props.lastName.charAt(0).toUpperCase();
    let username = props.firstName + lastInitial;
    const [roomArray, setRoomArray] = useState([]);
    const navigate = useNavigate();
    const userID = props.userID;
    const [roomID, setRoomID] = useState("");
  


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
            setRoomArray(data.rooms);

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
                            <label>Select Chat Room: </label>
                            {/* <select name="rooms" id="room-select"  > */}
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    onClick={getAllRooms} 
                                    onChange={(e) => setRoomID(e.target.value)}
                                    value={roomID}
                                >
                                    {/* {console.log("ROOM ID:", roomID)} //! TEST */} 
                                    <option value="please-choose">--Please choose an chat room--</option>
                                    {roomArray.map((room, index) => (
                                    <option key={index} value={room._id}>
                                        {room.name}
                                    </option>
                                    ))}
                                </Input>
                                {/* {roomArray.map((chatRoom, index) => <option value={chatRoom._id} key={index} >{chatRoom.name}</option>)} */}

                            {/* </select> */}
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
                    <MessageIndex token={props.token} getAllRooms={getAllRooms} roomArray={roomArray} username={username} roomID={roomID}/>
                </Col>
            </Row>
        </Container>
        </>
     );
}
 
export default RoomIndex;