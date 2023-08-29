import { Button, Container, Image, Nav, Navbar } from "react-bootstrap"
import { useContext, useEffect, useState } from "react";
import React from 'react';
import ButtonManageCategory from "./Button/ButtonAdmin";
import { MyUserContext } from "../../App";
const AdminHome = () => {
     const [user,dispatch] = useContext(MyUserContext);
    
     const logout = () => {
         dispatch({
           "type": "logout"
         })
       }
     return (
     <>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/9A05JPnSjeY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </>
     )
      
}

export default AdminHome