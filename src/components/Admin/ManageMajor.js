import { useContext, useEffect, useState } from "react"
import { Button, Card, Form, Modal, Table } from "react-bootstrap"
import Apis, { authApi, endpoints } from "../../configs/Apis"
import cookie from "react-cookies";
import { ToastContainer, toast } from "react-toastify";
import '../../assets/CSS/Manage.css'
import ModalUpdateFaculty from "./ModalUpdateFaculty";
import ModalCreateFaculty from "./ModalCreateFaculty";
import { toastError, toastSuccess } from "../Toast/Notification";
import ModalCreateMajor from "./ModalCreateMajor";
import ModalUpdateMajor from "./ModalUpdateMajor";

const ManageMajor = ( { searchKeyword, showDeleteModal, setShowDeleteModal }) => {
    const [isTableMajorVisible, setIsTableMajorVisible] = useState(true); // Mặc định là hiển thị
    const [majors, setMajors] = useState([]);

    const loadMajors = async () => {
      try {
        let res = await Apis.get(endpoints['majors']);
        setMajors(res.data);
        console.log(res.data);
      } catch (ex) {
        console.error(ex);
        toastError("Lỗi khi tải danh sách");
      }
    };

    useEffect(() => { 
        loadMajors()
      }, []);
      
      const handleDelete = async (majorId) => {
        try {
          let res = await authApi().delete(endpoints.delete_major(majorId));
          toastSuccess("Xóa thành công")
          loadMajors()
          
        } catch (ex) {
          console.error(ex);
          toastError("Xóa thất bại");
        }
      };

      const filteredMajor = majors.filter((m) =>
      m.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
      <div>
      <ToastContainer />
      <h2 className="text-center text-blue-700 font-bold mb-5 mt-2">
        Quản Lý Chuyên Ngành
      </h2>     
      <Button variant="info" onClick={() => setIsTableMajorVisible(!isTableMajorVisible)}>
        {isTableMajorVisible ? "Ẩn danh sách" : "Hiển thị danh sách"}
      </Button>
      <ModalCreateMajor loadMajors={loadMajors}/>
      {isTableMajorVisible &&  
      <Table className="mt-5" striped bordered hover size="sm">
        <thead>
        <tr className="text-center">
            <th>ID</th>
            <th>Ngành</th>
            <th>Khoa</th>
          </tr>
        </thead>
        <tbody>
          {filteredMajor.map(major => (
            <tr key={major.id}>
              <td>{major.id}</td>
              <td>{major.name}</td>
              <td>{major.facultyId.name}</td>
              <td className="p-2">
                <Button className="w-20 ml-5 mr-5" variant="success">
                  Xem
                </Button>
                <ModalUpdateMajor loadMajors={loadMajors} majors={majors} setMajors={setMajors} major={major} />
                <Button className="w-20 ml-5 mr-5"  
                        variant="danger"
                        onClick={() => setShowDeleteModal({ [major.id]: true })}
                        >
                  Xóa
                </Button>
              </td>
               {/* Modal hỏi người dùng */}
               <Modal 
                      show={showDeleteModal[major.id]}
                      onHide={() => setShowDeleteModal({ [major.id]: false })}>
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
                          handleDelete(major.id);
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
      </Table> }
    </div>
    )
}

export default ManageMajor