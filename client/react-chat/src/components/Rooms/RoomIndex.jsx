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
    const [chatMessage, setChatMessage] = useState([]);
    const navigate = useNavigate();
    const userID = props.userID;
    const [roomID, setRoomID] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
  


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

function getRoomInfo(roomValue){
    setRoomID(roomValue.target.value);
    let chatroomNameFilter = roomArray.filter((room) => roomValue.target.value === room._id)[0]?.name ??"No Room Selected";
    setRoomName(chatroomNameFilter);
    let chatroomDescriptionFilter = roomArray.filter((room) => roomValue.target.value === room._id)[0]?.description??"There is No Room, it is just an extension of yourself...";
    setRoomDescription(chatroomDescriptionFilter);
    getAllMessages(roomID);
}

async function getAllMessages(roomID) {
    let url = `http://localhost:4000/message/display-all/`+ roomID;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);
    const requestOptions = {
      headers: myHeaders,
      method: "GET",
    };
    // The Postman needed more in our headers

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setChatMessage(data.chatMessage);

    } catch (error) {
      console.error(error.message);
    }
  }

    return ( 
        <div className='container' style={{paddingLeft: 0, paddingRight: 0}}>
        <Container className='container' style={{paddingLeft: 0, paddingRight: 0}}>
            <Row className='container' style={{paddingLeft: 0, paddingRight: 0}}>
                <Col lg="4" className='container' style={{paddingLeft: 0, paddingRight: 0}}>
                    {/* Username based on first name and last initial */}
                    <h3 id='username'>Username: {username}</h3>
                    {/* Room Drop Down */}
                    <div id='edit-user-btn'>
                        <Button type='submit' style={{width: "50%"}} onClick={userEditClick} >Edit User</Button>
                    </div>
                    <div >
                        <form id='select-room-form'>
                            <label id='room-select-label'>Select Chat Room: </label>
                            {/* <select name="rooms" id="room-select"  > */}
                                <Input
                                    id="room-select-list"
                                    name="select"
                                    type="select"
                                    onClick={getAllRooms} 
                                    onChange={getRoomInfo}
                                    value={roomID}
                                >
                                    {/* {console.log("ROOM ID:", roomID)} //! TEST */} 
                                    <option id="please-choose">--Please choose a chat room--</option>
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

                </Col>
                <Col lg="8">
                    <Table>
                        <thead>
                            <tr>
                                <th style={{textAlign: "center", fontSize: "x-large"}}>{roomName}</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td style={{textAlign: "center", fontSize: "large"}}>
                                    {roomDescription}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    [Display Message Window]
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <MessageIndex token={props.token} getAllRooms={getAllRooms} getAllMessages={getAllMessages} chatMessage={chatMessage} roomArray={roomArray} username={username} roomID={roomID}/>
                </Col>
            </Row>
        </Container>
        </div>
     );
}
 
export default RoomIndex;