// Project 7: React Chat
// Team ALJI


import "./App.css";
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
    };
    if(localStorage.getItem("userID")) {
      setUserID(localStorage.getItem("userID"))
    };
    if(localStorage.getItem("firstName")) {
      setFirstName(localStorage.getItem("firstName"))
    };
    if(localStorage.getItem("lastName")) {
      setLastName(localStorage.getItem("lastName"))
    };
    if(localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email"))
    };
    if(localStorage.getItem("password")) {
      setPassword(localStorage.getItem("password"))
    };
    if(localStorage.getItem("isAdmin")) {
      setIsAdmin(localStorage.getItem("isAdmin"))
    };
  }, []);

  function updateToken(newToken, userID, firstName, lastName, email, password, isAdmin) {
    setToken(newToken);
    setUserID(userID);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setPassword(password);
    setIsAdmin(isAdmin);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userID", userID);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("isAdmin", isAdmin);
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/react-chat" element={<RoomIndex token={token} userID={userID} firstName={firstName} lastName={lastName} email={email} password={password} isAdmin={isAdmin} />} />
        <Route path='/update/:id' element={<UserEdit token={token} userID={userID} firstName={firstName} lastName={lastName} email={email} password={password} isAdmin={isAdmin} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
