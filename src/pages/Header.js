

import '../assets/CSS/Header.css';
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "./MySpinner";
import { MyUserContext } from '../App';
import ButtonAdmin from '../components/Admin/Button/ButtonAdmin';
import { toastError } from '../components/Toast/Notification';

const Header = () => {
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
  
  // const [kw, setKw] = useState("")
  // const nav = useNavigate();

  // useEffect(() => {
  //     const loadCates = async () => {
  //         // let res = await fetch("http://localhost:8085/SaleAppV1/api/categories/");
  //         // let data = await res.json();
  //         let res = await Apis.get(endpoints['categories']);

  //         setCategories(res.data);
  //     }

  //     loadCates();
  // }, []);

  // const search = (evt) => {
  //     evt.preventDefault();

  //     nav(`/?kw=${kw}`);
  // }
  
    return (
        <Navbar expand="lg" className="custom-background">
            <Container className='nav-bar-container' >
                <Image className='w-1/3' to="/home"  src="https://ou.edu.vn/wp-content/uploads/2016/08/Logo.png" />
                {/* <Navbar.Brand className='font-bold' href="/home">Open University</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
              
            </Navbar.Collapse>
            <Nav  className="me-aut bg-yellow-400 font-bold ">
                    <Nav.Link className='hover:bg-green-700' href="/home">TRANG CHỦ</Nav.Link>
            
                    <NavDropdown className='hover:bg-green-700' title="THÔNG TIN TUYỂN SINH" id="basic-nav-dropdown">
                        {categories.map(category => {
                        const categoryPath = generateCategoryPath(category.name)
                            return <Nav.Link href={`/home#${categoryPath}`} className="dropdown-item nav-link" id="basic-nav-dropdown" >{category.name}</Nav.Link>
                        })}
                    </NavDropdown>

                    <Nav.Link className='hover:bg-green-700' href="/khoa"> KHOA - NGÀNH</Nav.Link>
                    {user === null ? <Nav.Link className='hover:bg-green-700' href="/dangnhap">ĐĂNG NHẬP</Nav.Link> : <>
                        <Link className='nav-link text-danger' to="/">Chào {user.username}</Link>
                        <Nav.Link className='hover:bg-green-700' onClick={logout}>ĐĂNG XUẤT</Nav.Link>
                    </>}
            </Nav>
            <ButtonAdmin />

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