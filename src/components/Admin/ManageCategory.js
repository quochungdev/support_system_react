import { useContext, useEffect, useState } from "react"
import { Button, Card, Form, Table } from "react-bootstrap"
import Apis, { authApi, endpoints } from "../../configs/Apis"
import cookie from "react-cookies";
import Notification, { toastError, toastSuccess } from "../Toast/Notification";
import { ToastContainer, toast } from "react-toastify";
import IsAdminCheck from "./IsAdminCheck";
import Sidebar from "../Sidebar";
import '../../assets/CSS/Manage.css'
import ModaleUpdateCategory from "./ModalUpdateCategory";


const ManageCategory = () => {

const [isTableVisible, setIsTableVisible] = useState(true); // Mặc định là hiển thị
const [isCreateCateVisible, setIsCreateCateVisible] = useState(true); // Mặc định là hiển thị

const [nameCategory, setNameCategory] = useState()
const [categories, setCategories] = useState([]);


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


 const createCategory = (evt) => {
    evt.preventDefault();

    const process = async () => {
        try {
            let res = await authApi().post(endpoints['create_category'],{
                "name": nameCategory
            });
            loadCategories()
            toastSuccess("TẠO THÀNH CÔNG")
            
        } catch (ex) {
            console.error(ex);
            toastError("TẠO THẤT BẠI")
        }
    }
    process();
 }

 const handleDelete = async (categoryId) => {
  try {
    let res = await authApi().delete(endpoints.delete_category(categoryId));
    toastSuccess("Xóa thành công")

    loadCategories()
    
  } catch (ex) {
    console.error(ex);
    toastError("Xóa thất bại");
  }
};


    return <>
  
    <div>
      <h2>Danh sách danh mục</h2>
      <Button variant="primary" onClick={() => setIsTableVisible(!isTableVisible)}>
        {isTableVisible ? "Ẩn danh sách" : "Hiển thị danh sách"}
      </Button>

      <Button className="ml-10" variant="primary" onClick={() => setIsCreateCateVisible(!isCreateCateVisible)}>
        {isCreateCateVisible ? "Ẩn" : "Tạo danh mục mới"}
      </Button>
      {isCreateCateVisible && (
      <Form onSubmit={createCategory}>
        <div className="d-flex align-items-center mb-3">
          <Form.Group className="mb-0 me-3">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              onChange={e => setNameCategory(e.target.value)}
              placeholder="Nhập tên danh mục"
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Button type="submit" variant="danger">
              TẠO DANH MỤC
            </Button>
            <ToastContainer />
          </Form.Group>
        </div>
      </Form>
    )}
        <hr/>
    {isTableVisible &&  
    <Table striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td className="">
                <Button className="w-20 ml-5 mr-5" variant="success">
                  Xem
                </Button>
                <ModaleUpdateCategory categories={categories} setCategories={setCategories} category={category} />
                <Button className="w-20 ml-5 mr-5" onClick={() => handleDelete(category.id)} variant="danger">
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> }
    </div>
    </> 
    
}

export default ManageCategory