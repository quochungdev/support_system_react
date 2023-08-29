import { Button, Container, Image, Nav, Navbar } from "react-bootstrap"
import { useContext, useEffect, useState } from "react";
import React from 'react';
import ButtonManageCategory from "./Button/ButtonAdmin";
import { MyUserContext } from "../../App";
import { Link } from "react-router-dom";
export default function HeaderAdmin() {
    const [user,dispatch] = useContext(MyUserContext);
    const logout = () => {
        dispatch({
          "type": "logout"
        })
      }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/admin/home">TRANG CHỦ ADMIN</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='hover:bg-green-700' href="/admin/home">Home</Nav.Link>
            <Nav.Link className='hover:bg-green-700' href="/admin/manage-category">Quản Lý Danh Mục</Nav.Link>
            <Nav.Link className='hover:bg-green-700' href="/admin/manage-faculty">Quản Lý Khoa</Nav.Link>
            <Nav.Link className='hover:bg-green-700' href="/admin/manage-article">Quản Lý Bài Viết</Nav.Link>
            {user === null ? <Nav.Link className='hover:bg-green-700' href="/dangnhap">ĐĂNG NHẬP</Nav.Link> : <>
                        <Link className='nav-link text-danger' to="/admin/home">Chào {user.username}</Link>
                        <Nav.Link className='hover:bg-green-700' href="/home" >Quay về Trang User</Nav.Link>
            </>}
          </Nav>
        </Container>
      </Navbar>
  )
}
