import { useContext, useEffect, useState } from "react";
import { Button, Card, Form, Modal, Table } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../configs/Apis";
import Notification, { toastError, toastSuccess } from "../Toast/Notification";
import { ToastContainer, toast } from "react-toastify";
import '../../assets/CSS/Manage.css';
import ModaleUpdateCategory from "./ModalUpdateCategory";

const ManageCategory = ( { searchKeyword, showDeleteModal, setShowDeleteModal }) => {
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isCreateCateVisible, setIsCreateCateVisible] = useState(true);
  const [nameCategory, setNameCategory] = useState("");
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
    loadCategories();
  }, []);

  const createCategory = (evt) => {
    evt.preventDefault();

    const process = async () => {
      try {
        let res = await authApi().post(endpoints['create_category'], {
          "name": nameCategory
        });
        loadCategories();
        toastSuccess("TẠO THÀNH CÔNG");

      } catch (ex) {
        console.error(ex);
        toastError("TẠO THẤT BẠI");
      }
    }
    process();
  }

  const handleDelete = async (categoryId) => {
    console.log(categoryId);
    setShowDeleteModal(true);

    try {
      let res = await authApi().delete(endpoints.delete_category(categoryId));
      toastSuccess("Xóa thành công");

      loadCategories();

    } catch (ex) {
      console.error(ex);
      toastError("Xóa thất bại");
    }
  };

  const filteredCategories = categories.filter((category) =>
  category.name.toLowerCase().includes(searchKeyword.toLowerCase())
);

  return (
    <div>
      <h2 className="text-center text-blue-700 font-bold mb-5 mt-2">
        Quản Lý Danh Mục Tuyển Sinh
      </h2>

      <Button variant="info" onClick={() => setIsTableVisible(!isTableVisible)}>
        {isTableVisible ? "Ẩn danh sách" : "Hiển thị danh sách"}
      </Button>

      <Button className="ml-10" variant="warning" onClick={() => setIsCreateCateVisible(!isCreateCateVisible)}>
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
      <hr />
      {isTableVisible &&
        <div>

          <Table className="mt-5" striped bordered hover size="sm">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td className="">
                    <Button className="w-20 ml-5 mr-5" variant="success">
                      Xem
                    </Button>
                    <ModaleUpdateCategory categories={categories} setCategories={setCategories} category={category} />
                    <Button className="w-20 ml-5 mr-5" 
                      onClick={() => setShowDeleteModal({ [category.id]: true })}
                      variant="danger">
                      Xóa
                    </Button>
                  </td>
                   {/* Modal hỏi người dùng */}
                   <Modal 
                      show={showDeleteModal[category.id]}
                      onHide={() => setShowDeleteModal({ [category.id]: false })}>
                    <Modal.Header closeButton>
                      <Modal.Title>Xác nhận xóa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc muốn xóa dòng này?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          // Gọi hàm xóa bài viết tại đây
                          handleDelete(category.id);
                          setShowDeleteModal(false); // Đóng modal sau khi xóa
                        }}
                      >
                        Xóa
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      }
    </div>
  )
}

export default ManageCategory;
