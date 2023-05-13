// Project 7: React Chat
// Team ALJI

import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const RoomCreate = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        let url = `http://localhost:4000/room/create`;
        let bodyObject = {
            name: name,
            description: description,
            addedUsers: addedUsers,
        }

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", props.token)
    
        const requestOptions ={
            headers: myHeaders,
            method: "POST",
            body: JSON.stringify(bodyObject),
        };
    
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);
            if (
                data.message === "Room was created"
              ) {
                // TODO: have the message window display as a room-specific window
                console.log("[Room Message Display]");
              }
        } catch (error) {
            console.error(error.message);
        };
    }

    return ( 
        <div id='create-room-box'>
        <h4 id='create-room-header'>Create a Chat Room</h4>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label id='creat-room-label'>Room Name: </Label>
                <Input type="text" id='create-room-input' value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label id='creat-room-label'>Room Description: </Label>
                <Input type="text" id='create-room-input' value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>
            {/* //! Do not need to list the added Users when creating a room*/}
            {/* <FormGroup>
                <Label>Room Users: </Label>
                <Input type="array" id='create-room-input' value={addedUsers} onChange={(e) => setAddedUsers(e.target.value)} />
            </FormGroup> */}
            <div id='create-room-btn'>
                <Button type='submit'>Create Room
                </Button>
            </div>
        </Form>
        </div>
     );
}
 
export default RoomCreate;