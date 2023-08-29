import React, { createContext, useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import cookie from "react-cookies";

import Home from '../Home';
import TSCaoHoc from '../../pages/TuyenSinh/TSCaoHoc';
import TSDaoTaoTuXa from '../../pages/TuyenSinh/TSDaoTaoTuXa';
import TSHeChinhQuy from '../../pages/TuyenSinh/TSHeChinhQuy';
import TSHeLienThong from '../../pages/TuyenSinh/TSHeLienThong';
import TSThacSi from '../../pages/TuyenSinh/TSThacSi';
import Faculty from '../Faculty';
import Login from '../Login';
import Register from '../Register';
import Footer from '../../pages/Footer';
import MyUserReducer from '../../reducers/MyUserContext';
import Header from '../../pages/Header';
import CarouselHeader from '../../pages/CarouselHeader';
import { Col, Container, Row } from 'react-bootstrap';
import ButtonAdmin from '../Admin/Button/ButtonAdmin';
import KhoaLuatDetails from '../../pages/FacultyDetails/Khoa-Luat';
import KhoaCongNgheThongTinDetail from '../../pages/FacultyDetails/Khoa-CongNgheThongTin';
import Sidebar from '../Sidebar';

import { Landing } from '../Landing/index';
import { ChatRoom } from '../ChatRoom/index';



export default function MainLayout() {

    return (
        <>
          <Header/>
          <CarouselHeader />

          {/* <Row className='body-center'> */}
          {/* <Col xs={12} md={9}> */}
           <Container>
            <Row>
            <Col xs={12} md={8}>
              <Routes>
                  <Route index path="/home" element={<Home />} />
                  <Route path="/TuyenSinhCaoHoc" element={<TSCaoHoc />} />
                  <Route path="/TuyenSinhDaoTaoTuXa" element={<TSDaoTaoTuXa />} />
                  <Route path="/TuyenSinhHeChinhQuy" element={<TSHeChinhQuy />} />
                  <Route path="/TuyenSinhHeLienThong" element={<TSHeLienThong />} />
                  <Route path="/TuyenSinhThacSi" element={<TSThacSi />} />
                  <Route path="/khoa" element={<Faculty />} />
                    <Route path="/khoa/khoa-luật" element={<KhoaLuatDetails />} />
                    <Route path="/khoa/khoa-cong-nghe-thong-tin" element={<KhoaCongNgheThongTinDetail />} />
                  <Route path="/dangnhap" element={<Login />} />
                  <Route path="/dangky" element={<Register />} />

                  <Route path="/" element={<Landing />} />
                  <Route path="/room/:id" element={<ChatRoom />} />
                  {/* <Route path="/manage-category" element={<ManageCategory />} /> */}
                </Routes>
            </Col>
              <Col xs={12} md={4}>
              <Sidebar />

              </Col>
            </Row>
          </Container>
            {/* </Col> */}
          {/* <Col xs={12} md={3}>
            <ButtonManageCategory />
            <Category />
          </Col> */}
          {/* </Row> */}
          <Footer />
        </>
      )
}
