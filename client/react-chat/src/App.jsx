// Project 7: React Chat
// Team ALJI

//import logo from './logo.svg';
import "./App.css";
import React, { useEffect, useState } from 'react';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Auth from "./components/Auth/Auth";
import { Route, Routes } from "react-router-dom";
import RoomIndex from "./components/Rooms/RoomIndex";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
    };
  }, []);

  function updateToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
    };
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        {/* TODO: figure out what path RoomIndex should take */}
        <Route path="/react-chat" element={<RoomIndex token={token} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
