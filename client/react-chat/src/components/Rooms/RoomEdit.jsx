// Project 7: React Chat
// Team ALJI
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Container, Row, Label, FormGroup, Input, Form } from "reactstrap";

const RoomEdit = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);

    const navigate = useNavigate();

    const {id} = useParams();

// TODO: Use Effect to access a function of getRoomByID

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
            method: "PATCH",
            body: JSON.stringify(bodyObject),
        };
    
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);

            if(data.message === "Chat Room Updated") {
                navigate("/") // TODO: figure out where to navigate to
            }


            //TODO create a getRoomByID function

        } catch (error) {
            console.error(error.message);
        };
    }

    return ( 
        <>
        
        </>
     );
}
 
export default RoomEdit;