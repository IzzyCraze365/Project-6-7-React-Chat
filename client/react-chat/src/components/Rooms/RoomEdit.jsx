// Project 7: React Chat
// Team ALJI
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Container, Row, Label, FormGroup, Input, Form } from "reactstrap";

const RoomEdit = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [addedUsers, setAddedUsers] = useState([]);

    const navigate = useNavigate();

    const {id} = useParams();

    // useEffect(() => {
    //     if(props.token) {
    //         getRoomById();
    //     }
    // }, [props.token]);

    async function handleSubmit(e) {
        e.preventDefault();

        let url = `http://localhost:4000/room/update/` + id;

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
                navigate("/room/display-all") // TODO: confirm if this is the correct url to navigate to
            }
        } catch (error) {
            console.error(error.message);
        };
    }
    
        //TODO create a getRoomByID function - We don't have a view one room function... do we need one?

    return ( 
        <>
        <Container>
            <Row>
                <Col md="4">
                    <h4>Update Room</h4>
                </Col>
                <Col md="8">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>ChatRoom Name: </Label>
                            <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        </FormGroup>

                        <FormGroup>
                            <Label>ChatRoom Description: </Label>
                            <Input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Added Users: </Label>
                            <Input type='array' value={addedUsers} onChange={(e) => setAddedUsers(e.target.value)} />
                        </FormGroup>

                        <div className='d-grid gap-2 mb-4'>
                            <Button type='submit' color='success'>Update Room</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
     );
}
 
export default RoomEdit;