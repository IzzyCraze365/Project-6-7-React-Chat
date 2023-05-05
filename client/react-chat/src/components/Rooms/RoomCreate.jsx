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
        } catch (error) {
            console.error(error.message);
        };
    }

    return ( 
        <>
        <h3>Create a Chat Room</h3>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>ChatRoom Name:</Label>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>ChatRoom Description:</Label>
                <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>ChatRoom Users:</Label>
                <Input type="array" value={addedUsers} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <div className='d-grid gap-2 mb-4'>
                <Button type='submit' color='success'>Create Room
                </Button>
            </div>
        </Form>
        </>
     );
}
 
export default RoomCreate;