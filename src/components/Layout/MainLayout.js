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
import KhoaLuatDetails from '.././FacultyDetails/Khoa-Luat';
import KhoaCongNgheThongTinDetail from '.././FacultyDetails/Khoa-CongNgheThongTin';
import Sidebar from '../Sidebar';

import { Landing } from '../Landing/index';
import { ChatRoom } from '../ChatRoom/index';
import BaiViet1 from '../ArticleDetails/ArticleKhoaLuat/BaiViet1';
import BaiViet2 from '../ArticleDetails/ArticleKhoaLuat/BaiViet2';
import BaiViet3 from '../ArticleDetails/ArticleKhoaLuat/BaiViet3';
import ScorePage from '../ScorePage';
import QuestionPage from '../QuestionPage';
import BaiViet4 from '../ArticleDetails/ArticleKhoaLuat/BaiViet4';


export default function MainLayout() {
    const [searchKeyword, setSearchKeyword] = useState(""); // Step 1: State variable to hold search keyword
    const handleSearchInputChange = (e) => {
        setSearchKeyword(e.target.value);
      };
    return (
        <>
          <Header searchKeyword={searchKeyword} handleSearchInputChange={handleSearchInputChange}/>
          <CarouselHeader />

          {/* <Row className='body-center'> */}
          {/* <Col xs={12} md={9}> */}
           <Container>
            <Row>
            <Col xs={12} md={8}>
              <Routes>
                  <Route index path="/home" element={<Home searchKeyword={searchKeyword}/>} />
                  <Route path="/TuyenSinhCaoHoc" element={<TSCaoHoc />} />
                  <Route path="/TuyenSinhDaoTaoTuXa" element={<TSDaoTaoTuXa />} />
                  <Route path="/TuyenSinhHeChinhQuy" element={<TSHeChinhQuy />} />
                  <Route path="/TuyenSinhHeLienThong" element={<TSHeLienThong />} />
                  <Route path="/TuyenSinhThacSi" element={<TSThacSi />} />
                  <Route path="/diem-chuan-hang-nam" element={<ScorePage searchKeyword={searchKeyword} />} />
                  <Route path="/cau-hoi-thuong-gap" element={<QuestionPage />} />
                  {/* <Route path="/livestream/:roomId" element={<LiveStreamRoom />} /> */}
                  <Route path="/khoa" element={<Faculty searchKeyword={searchKeyword}/>} />
                    <Route path="/khoa/khoa-luật" element={<KhoaLuatDetails />} />
                    <Route path="/khoa/khoa-công-nghệ-thông-tin" element={<KhoaCongNgheThongTinDetail />} />

                    <Route path="/article/71" element={<BaiViet1 articleId={71} />} />
                    <Route path="/article/72" element={<BaiViet2 articleId={72}/>} />
                    <Route path="/article/73" element={<BaiViet3 articleId={73}/>} />
                    <Route path="/article/95" element={<BaiViet4 articleId={95}/>} />
                  <Route path="/dangnhap" element={<Login />} />
                  <Route path="/dangky" element={<Register />} />

                  <Route path="/room" element={<Landing />} />
                  <Route path="/room/:id" element={<ChatRoom />} />
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
