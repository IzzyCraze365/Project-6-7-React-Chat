// Project 7: React Chat
// Team ALJI

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const UserEdit = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const userID = props.userID;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if(props.token) {
            getUserByID();
        }
    }, [props.token]);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(id);

        let url = `http://localhost:4000/user/update/` + userID;
        
        let bodyObject = {
            firstName: firstName,
            lastName: lastName,
            email: email, 
            password: password,
            isAdmin: isAdmin,
        }

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", props.token);

        const requestOptions = {
            headers: myHeaders,
            method: "PATCH",
            body: JSON.stringify(bodyObject),
        }

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);
            if(data.message === "works from update") {
                navigate("/react-chat");
            }
        } catch (error) {
            console.error(error.message)
        }

    }

    async function getUserByID() {
        let url = `http://localhost:4000/user/` + id;
        let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);

        const requestOptions  = { 
            headers: myHeaders,
            method: "GET",
         }

         try {
            const response = await fetch(url, requestOptions);
            const data  = await response.json();
            console.log(data);
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
            setEmail(data.user.email);
            setPassword(data.user.password);
            setIsAdmin(data.user.isAdmin);
         } catch (error) {
            console.error(error.message)
         }
    }


    return ( 
        <>
        <h2 className="text-center">Update User Information</h2> {/* Title */}
        <Form onSubmit={handleSubmit}>
          {/* FIRST NAME START */}
          <FormGroup>
            <Label>First Name:</Label>
            <Input /* this is where the input is pulled */
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          {/* FIRST NAME END */}
          {/* LAST NAME START */}
          <FormGroup>
            <Label>Last Name:</Label>
            <Input /* this is where the input is pulled */
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
          {/* LAST NAME END */}
          {/* EMAIL START */}
          <FormGroup>
            <Label>Email:</Label>
            <Input /* this is where the input is pulled */
              value={email} /* Standard HTML but applied in React */
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          {/* EMAIL END */}
          {/* PASSWORD START */}
          <FormGroup>
            <Label>Password:</Label>
            <Input /* this is where the input is pulled */
              value={password}
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          {/* PASSWORD END */}
          {/* ISADMIN START */}
          <FormGroup>
            <Label>Admin?:</Label> {/* //TODO Hide this */}
            <Input /* this is where the input is pulled */
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
            />
          </FormGroup>
          {/* ISADMIN END */}
          <div className="d-grid gap-2 mb-4">
            {" "}
            {/* D-Grid, Gap of 2, Margin Bottom of 4 */}
            <Button onClick={navigate('/react-chat')} type="submit" color="danger">
              Sign Up
            </Button>
          </div>
        </Form>
        </>
     );
}
 
export default UserEdit;