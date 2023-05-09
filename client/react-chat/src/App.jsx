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
  }, []);

  function updateToken(newToken, userID, firstName, lastName) {
    setToken(newToken);
    setUserID(userID);
    setFirstName(firstName);
    setLastName(lastName);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userID", userID);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/react-chat" element={<RoomIndex token={token} userID={userID} firstName={firstName} lastName={lastName} />} />
        <Route path='/update/:id' element={<UserEdit token={token} userID={userID} firstName={firstName} lastName={lastName} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
