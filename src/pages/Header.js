
import '../assets/CSS/Header.css';
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "./MySpinner";
import { MyUserContext } from '../App';
import ButtonAdmin from '../components/Admin/Button/ButtonAdmin';
import { toastError } from '../components/Toast/Notification';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Bell from '../components/Bell';

const Header = ( {searchKeyword, handleSearchInputChange} ) => {
    const [categories, setCategories] = useState([]);
    const [user,dispatch] = useContext(MyUserContext);
    

    const loadCategories = async () => {
        try {
        let res = await Apis.get(endpoints['categories']);
        setCategories(res.data);
        console.log(res.data);
        } catch (ex) {
        console.error(ex);
        toastError("Lỗi khi tải danh sách");
        }
    };


    useEffect(() => {
        loadCategories()
    }, []);

    const generateCategoryPath = (categoryName) => {
        return categoryName.toLowerCase().replace(/\s+/g, '-');
      };
    
    const logout = () => {
        dispatch({
          "type": "logout"
        })
      }
  
    return (
        
        <Navbar expand="lg" className="custom-background">
            <Container className='nav-bar-container !block' >
                <Row>
                   <Col>
                     <Image  to="/home"  src="https://ou.edu.vn/wp-content/uploads/2016/08/Logo.png" />
                   </Col>
                   <Col md={3} className='mt-4'>
                    <Form  inline>
                            <Form.Control
                            type="text"
                            placeholder="Nhập từ khóa..."
                            value={searchKeyword} 
                            onChange={handleSearchInputChange}
                            className=" mr-sm-2"
                            />
                        </Form>    
                   </Col>
                </Row>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
              
            </Navbar.Collapse>
            <Nav  className="me-aut bg-yellow-400 font-bold mt-2">
                    <Nav.Link className='hover:bg-green-700 p-3' href="/home">TRANG CHỦ</Nav.Link>
                    <NavDropdown className='hover:bg-green-700 p-2' title="THÔNG TIN TUYỂN SINH" id="basic-nav-dropdown">
                        {categories.map(category => {
                        const categoryPath = generateCategoryPath(category.name)
                            return <Nav.Link href={`/home#${categoryPath}`} className="dropdown-item nav-link" id="basic-nav-dropdown" >{category.name}</Nav.Link>
                        })}
                    </NavDropdown>

                    <Nav.Link className='hover:bg-green-700 p-3' href="/khoa"> KHOA - NGÀNH</Nav.Link>
                    <Nav.Link className='hover:bg-green-700 p-3' href='/diem-chuan-hang-nam'>ĐIỂM CHUẨN CÁC NĂM</Nav.Link>
                    <Nav.Link className='hover:bg-green-700 p-3' href='/room'>PHÒNG CHAT</Nav.Link>

                    {user === null ? <Nav.Link className='hover:bg-green-700  p-3' href="/dangnhap">ĐĂNG NHẬP</Nav.Link> : <>
                        <Link className='nav-link text-danger p-3' to="/home">
                                <Row>
                                    <Col md={4}><Image className='w-16' src={user.avatar} roundedCircle /></Col>
                                    <Col md={8}>{user.username}</Col>
                                </Row>
                        </Link>
                        <Bell />

                        <Nav.Link className='hover:bg-green-700 p-3' onClick={logout}>ĐĂNG XUẤT</Nav.Link>
                    </>}
                    <ButtonAdmin />

            </Nav>
           

            {/* <Form onSubmit={search} inline>
                <Row>
                <Col xs="auto">
                    <Form.Control
                    type="text"
                    value={kw}
                    onChange={e => setKw(e.target.value)}
                    placeholder="Nhập từ khóa..."
                    className=" mr-sm-2"
                    />
                </Col>
                <Col xs="auto">
                    <Button type="submit">Tìm</Button>
                </Col>
                </Row>
            </Form> */}
            </Container>
        </Navbar>
    )
}

export default Header;