import React, { createContext, useState, useReducer, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from "react-cookies";

import MainLayout from './components/Layout/MainLayout';
import MyUserReducer from './reducers/MyUserContext';
import AdminLayout from './components/Layout/AdminLayout';
import LiveStreamRoom from './components/LiveStreamRoom';

import { io } from "socket.io-client";

export const MyUserContext = createContext();

function App() {
  const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);
  // const [socket, setSocket] = useState(null)
  
  // useEffect(() => {
  //   setSocket(io("http://localhost:5000"))
  // }, [])

  // useEffect(() => {
  //   socket?.emit("newUser", user);
  // }, [socket, user]);

  //Search 
  const [searchItem, setSearchItem] = useState("");
  const handleSearchChange = (newSearchItem) => {
    setSearchItem(newSearchItem);
  };
  
  return (
     <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Routes>
          {/* Sử dụng MainLayout cho các trang user */}
          <Route path="/*" element={<MainLayout handleSearchChange={handleSearchChange} />} />
          <Route path="/livestream" element={<LiveStreamRoom handleSearchChange={handleSearchChange} />} />

         {/* Sử dụng AdminLayout cho các trang admin */}
         {user && user.roleName === 'ROLE_ADMIN' ? (
          <Route path="/admin/*" element={<AdminLayout />} />
        ) : (
      // Chuyển hướng người dùng đến '/home' nếu không phải admin
      <Route path="/*" element={<Navigate to="/home" replace />} />        
      )}
        </Routes>
      </BrowserRouter>
    </MyUserContext.Provider>
  );
}

export default App;
