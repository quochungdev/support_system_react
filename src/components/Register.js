import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toastError, toastSuccess } from "./Toast/Notification";
import Apis, { authApi, authFormDataApi, endpoints } from "../configs/Apis";

const Register = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [avatar, setAvatar] = useState(null); // Khởi tạo là null

    const handleAvatarChange = (e) => {
        const selectedFile = e.target.files[0]; // Lấy tệp được chọn
        setAvatar(selectedFile); // Lưu File object vào state
      };

    const register = (evt) => {
        console.log(avatar);
        evt.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("avatar", avatar)
        
        const process = async () => {
            try {
                let res = await authApi().post(endpoints['register'], formData)
                toastSuccess("Đăng ký thành công")
                console.log(res.data);
            } catch (ex) {
                console.error(ex);
                toastError("Đăng ký thất bại")
            }   
        }
        process()
    }

    return (
        <MDBContainer className="my-5 gradient-form bg-sky-100">
        <MDBRow>
          <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column ms-5">

              <div className="text-center">
                <img src="https://ou.edu.vn/wp-content/uploads/2018/08/LOGO-TRUONGV21-12-2018-01-300x300.png"
                  style={{width: '185px'}} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1 font-bold ">ĐĂNG KÝ</h4>
              </div>
              <Form onSubmit={register}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text" value={username}
                                  onChange={e => setUsername(e.target.value)} 
                                  placeholder="Tên đăng nhập" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" value={password}
                                  onChange={e => setPassword(e.target.value)}  
                                  placeholder="Mật khẩu" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email}
                                  onChange={e => setEmail(e.target.value)}  
                                  placeholder="Mật khẩu" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" 
                                 accept="image/*"
                                 onChange={handleAvatarChange} // Gọi hàm khi chọn tệp
                                 placeholder="Chọn file" />
                      {avatar && <img className="w-20" src={URL.createObjectURL(avatar)} alt="Avatar Preview" />}

                </Form.Group>
                <Form.Group className="mb-3">
                    <Button type="submit" href="/dangnhap" variant="danger">Đăng ký</Button>
                </Form.Group>
            </Form>
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Đã có tài khoản?</p>
                <Button outline className='mx-2 gradient-custom-2' color='danger'>
                  Đăng nhập
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

export default Register