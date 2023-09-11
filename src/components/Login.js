import React, { useContext, useState } from 'react';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import '../assets/CSS/Login.css'
import { Button, Form } from 'react-bootstrap';
import cookie from "react-cookies";
import Apis, { authApi, endpoints } from '../configs/Apis';
import { Navigate, useNavigate } from 'react-router-dom';
import { MyUserContext } from '../App';
import { toastError, toastSuccess } from './Toast/Notification';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const [user, dispatch] = useContext(MyUserContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  
  const [validated, setValidated] = useState(false);


  const login = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;

    if (form.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    setValidated(true);

    const process = async () => {
        try {
            let res = await Apis.post(endpoints['login'], {
                "username": username,
                "password": password
            });
            cookie.save("token", res.data);
            console.info(res.data)
            
            let {data} = await authApi().get(endpoints['current-user']);
            cookie.save("user", data);  
            console.info(data)
            
            dispatch({
                "type": "login",
                "payload": data
            });
            toastSuccess("Đăng nhập thành công")
            navigate('/home');

        } catch (ex) {
            console.error(ex);
            toastError("Tài khoản hoặc mật khẩu không chính xác")
        }

    }
    process();
}
  if(user != null){
    return <Navigate to="/" />
  }

  return (
    <MDBContainer className="my-5 gradient-form bg-sky-100">
      <ToastContainer />
    <MDBRow>

      <MDBCol col='6' className="mb-5">
        <div className="d-flex flex-column ms-5">

          <div className="text-center">
            <img src="https://ou.edu.vn/wp-content/uploads/2018/08/LOGO-TRUONGV21-12-2018-01-300x300.png"
              style={{width: '185px'}} alt="logo" />
            <h4 className="mt-1 mb-5 pb-1 font-bold ">ĐĂNG NHẬP</h4>
          </div>
          <Form noValidate validated={validated} onSubmit={login}>
            <Form.Group className="mb-3">
                <Form.Label>Tên đăng nhập</Form.Label>
                <Form.Control type="text" value={username} 
                              onChange={e => setUsername(e.target.value)}
                              required 
                              placeholder="Tên đăng nhập" />
              <Form.Control.Feedback type="invalid">
                Vui lòng điền tài khoản
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control type="password" value={password} 
                              onChange={e => setPassword(e.target.value)}  
                              required
                              placeholder="Mật khẩu" />
               <Form.Control.Feedback type="invalid">
                Vui lòng điền mật khẩu
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Button type="submit" variant="danger">Đăng nhập</Button>
            </Form.Group>
        </Form>
{/* 
          <MDBInput wrapperClass='mb-4'  placeholder='Tài khoản' id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4'  placeholder='Mật khẩu' id='form2' type='password'/>


          <div className="text-center pt-1 mb-5 pb-1">
            <Button onSubmit={login} className="mb-4 w-100 gradient-custom-2">Sign in</Button>
            <a className="text-muted" href="#!">Forgot password?</a>
          </div> */}
          <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
            <p className="mb-0">Chưa có tài khoản?</p>
            <Button outline className='mx-2 gradient-custom-2' color='danger' href='/dangky'>
              Đăng ký
            </Button>
          </div>

        </div>

      </MDBCol>

      <MDBCol col='6' className="mb-5">
        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

          <div className="text-white px-3 py-4 p-md-5 mx-md-4">
            <h4 class="mb-4">We are more than just a company</h4>
            <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

        </div>

      </MDBCol>

    </MDBRow>

  </MDBContainer>
  );
}

export default Login;