// Project 7: React Chat
// Team ALJI

// import "./App.css"
import "./components/style.css";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Auth from "./components/Auth/Auth";
import { Route, Routes } from "react-router-dom";
import RoomIndex from "./components/Rooms/RoomIndex";
import UserEdit from "./components/Rooms/User/UserEdit";


function App() {
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  //! No longer need the useStates below since the editMessage route is not being used
  // const [when, setWhen] = useState(""); 
  // const [user, setUser] = useState("");
  // const [room, setRoom] = useState("");
  // const [body, setBody] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    if (localStorage.getItem("userID")) {
      setUserID(localStorage.getItem("userID"));
    }
    if (localStorage.getItem("firstName")) {
      setFirstName(localStorage.getItem("firstName"));
    }
    if (localStorage.getItem("lastName")) {
      setLastName(localStorage.getItem("lastName"));
    }
    if (localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email"));
    }
    if (localStorage.getItem("password")) {
      setPassword(localStorage.getItem("password"));
    }
    if (localStorage.getItem("isAdmin")) {
      setIsAdmin(localStorage.getItem("isAdmin"));
    }
    //! No longer need the if statements below since the editMessage route is not being used
    // if (localStorage.getItem("when")) {
    //   setWhen(localStorage.getItem("when"));
    // }
    // if (localStorage.getItem("user")) {
    //   setUser(localStorage.getItem("user"));
    // }
    // if (localStorage.getItem("room")) {
    //   setRoom(localStorage.getItem("room"));
    // }
    // if (localStorage.getItem("body")) {
    //   setBody(localStorage.getItem("body"));
    // }
  }, []);

  function updateToken(
    newToken,
    userID,
    firstName,
    lastName,
    email,
    password,
    isAdmin,
    when,
    user,
    room,
    body
  ) {
    setToken(newToken);
    setUserID(userID);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setPassword(password);
    setIsAdmin(isAdmin);

    //! No longer need the set - UseStates below since the editMessage route is not being used
    // setWhen(when);
    // setUser(user);
    // setRoom(room);
    // setBody(body);

    localStorage.setItem("token", newToken);
    localStorage.setItem("userID", userID);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("isAdmin", isAdmin);
    
    //! No longer need to set localstorage on the items below since the editMessage route is not being used
    // localStorage.setItem("when", when);
    // localStorage.setItem("user", user);
    // localStorage.setItem("room", room);
    // localStorage.setItem("body", body);
  }

  function updateUser(
    firstName,
    lastName,
    email,
    password,
    isAdmin,
  ) {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setPassword(password);
    setIsAdmin(isAdmin);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("isAdmin", isAdmin);
  }



  return (
    <div className="App">
      <Header />
        <Routes className="body">
          
          <Route path="/" element={<Auth updateToken={updateToken} />} />

          <Route path="/react-chat" element={<RoomIndex  token={token} userID={userID} firstName={firstName} lastName={lastName} email={email} password={password} isAdmin={isAdmin} />} />

          <Route path='/update/:id' element={<UserEdit updateUser={updateUser} token={token} userID={userID} firstName={firstName} lastName={lastName} email={email} password={password} isAdmin={isAdmin} />} />

        </Routes>
        
      <Footer />
    </div>
  );
}

export default App;
