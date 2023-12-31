// Project 7: React Chat
// Team ALJI

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const UserEdit = (props) => {


    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);
    const [isAdmin, setIsAdmin] = useState(props.isAdmin);
    const userID = props.userID;

    const navigate = useNavigate();

    const {id} = useParams();

    // useEffect(() => {
    //     if(props.token) {
    //         getUserByID();
    //     }
    // }, [props.token]);

    async function handleEditUserSubmit(e) {
        e.preventDefault();

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
            if(data.message === "user Profile has been updated") {
              props.updateUser(data.user.firstName, data.user.lastName, data.user.email, data.user.password, data.user.isAdmin)
              navigate("/react-chat");
            }
        } catch (error) {
            console.error(error.message)
        }

    }


    return ( 
        <>
        <h2 className="text-center">Update User Information</h2> {/* Title */}
        <Form onSubmit={handleEditUserSubmit}>
          {/* FIRST NAME START */}
          <FormGroup className="form-group">
            <Label>First Name:</Label>
            <Input /* this is where the input is pulled */
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          {/* FIRST NAME END */}
          {/* LAST NAME START */}
          <FormGroup className="form-group">
            <Label>Last Name:</Label>
            <Input /* this is where the input is pulled */
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
          {/* LAST NAME END */}
          {/* EMAIL START */}
          <FormGroup className="form-group">
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
          <FormGroup className="form-group">
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
          <FormGroup className="form-group">
            <Label>Admin?:</Label> {/* //TODO Hide this */}
            <Input /* this is where the input is pulled */
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
            />
          </FormGroup>
          {/* ISADMIN END */}
          <div >
            {" "}
            {/* D-Grid, Gap of 2, Margin Bottom of 4 */}
            <Button onClick={handleEditUserSubmit} className='editBtn' type="submit" color="danger">
              Update User
            </Button>
          </div>
        </Form>
        </>
     );
}
 
export default UserEdit;