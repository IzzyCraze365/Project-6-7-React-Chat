// Project 7: React Chat
// Team ALJI

import MessageEdit from "./MessageEdit";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const MessageSolo = (props) => {
  const navigate = useNavigate();
  const { when, user, room, body, _id } = props.messages;
  let formattedDate = when.split("T")[0];

  async function messageDelete() {
    let url = `localhost:4000/message/delete/` + _id;

    let myHeaders = new Headers();
    myHeaders.append("Authorization", props.token);

    let requestOptions = {
      headers: myHeaders,
      method: "DELETE",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      // refresh the table after it has been deleted
      props.getAllMessages();
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <>
      <h2>Hello from MessageSolo inside [Messages] inside [Rooms] </h2>
      <div>
        <h4>
          {user}
          {formattedDate}
        </h4>
        <p>body</p>
        <MessageEdit />
      </div>
      <div>
        <Button color="primary" onClick={() => navigate(`/update/${_id}`)}>
          Update
        </Button>
      </div>
      <div>
        <Button color="danger" onClick={messageDelete}>
          Delete
        </Button>
      </div>
    </>
  );
};

export default MessageSolo;
