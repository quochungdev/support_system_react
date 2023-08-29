import { useContext } from "react";
import { Button } from "react-bootstrap";
import { MyUserContext } from "../../../App";

const ButtonAdmin = () => {
    const [user] = useContext(MyUserContext);
  
    // Kiểm tra xem người dùng có quyền admin hay không
    const isAdmin = user && user.roleName === 'ROLE_ADMIN';
  
    return (
      <div>
        {isAdmin && <Button href="/admin/home" className="!bg-black !font-bold ">GIAO DIỆN ADMIN</Button>}
        {/* Các nút hoặc chức năng riêng dành cho admin */}
      </div>
    );
  };
  
  export default ButtonAdmin;