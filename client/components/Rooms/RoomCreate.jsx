// Project 7: React Chat
// Team ALJI

import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const RoomCreate = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [addedUsers, setAddedUsers] = useState("");

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
        <Form>
            <FormGroup>
                <Label>ChatRoom Name:</Label>
                <Input />
            </FormGroup>
        </Form>
        </>
     );
}
 
export default RoomCreate;