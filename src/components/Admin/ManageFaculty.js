import { useContext, useEffect, useState } from "react"
import { Button, Card, Form, Modal, Table } from "react-bootstrap"
import Apis, { authApi, endpoints } from "../../configs/Apis"
import '../../assets/CSS/Manage.css'
import ModalUpdateFaculty from "./ModalUpdateFaculty";
import ModalCreateFaculty from "./ModalCreateFaculty";
import Notification, { toastError, toastSuccess } from "../Toast/Notification";
import { ToastContainer, toast } from "react-toastify";


const ManageFaculty = ( { searchKeyword, showDeleteModal, setShowDeleteModal } ) => {
    const [isTableFacultyVisible, setIsTableFacultyVisible] = useState(true); // Mặc định là hiển thị
    const [faculties, setFaculties] = useState([]);

    const loadFaculties = async () => {
      try {
        let res = await Apis.get(endpoints['faculties']);
        setFaculties(res.data);
        console.log(res.data);
      } catch (ex) {
        console.error(ex);
        toastError("Lỗi khi tải danh sách");
      }
    };
    useEffect(() => { 
          loadFaculties()
      }, []);

      const handleDelete = async (facultyId) => {
        try {
          let res = await authApi().delete(endpoints.delete_faculty(facultyId));
          toastSuccess("Xóa thành công")
          loadFaculties()
          
        } catch (ex) {
          console.error(ex);
          toastError("Xóa thất bại");
        }
      };

      const filteredFaculties = faculties.filter((f) =>
      f.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
      <div>
      <ToastContainer />
      <h2 className="text-center text-blue-700 font-bold mb-5 mt-2">
        Quản Lý Khoa
      </h2>      
      <Button variant="info" onClick={() => setIsTableFacultyVisible(!isTableFacultyVisible)}>
        {isTableFacultyVisible ? "Ẩn danh sách" : "Hiển thị danh sách"}
      </Button>
      <ModalCreateFaculty loadFaculties={loadFaculties}/>
      {isTableFacultyVisible &&  
      <Table className="mt-5" striped bordered hover size="sm">
        <thead>
        <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Website</th>
            <th>Video</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFaculties.map(faculty => (
            <tr key={faculty.id}>
              <td>{faculty.id}</td>
              <td>{faculty.name}</td>
              <td>{faculty.description}</td>
              <td><a href={`${faculty.websiteUrl}`}>{faculty.websiteUrl}</a></td>
              <td>
              <iframe
                  title={`video-${faculty.id}`}
                  width="300"
                  height="150"
                  src={faculty.videoUrl}
                  allowFullScreen
              ></iframe>
              </td>
              <td>
              <img className="mb-10 -mr-200 w-20 zoomable-image" variant="top" src={faculty.image_url} />
              </td>
              <td className="p-2">
                <Button className="w-100" variant="success">
                  Xem
                </Button>
                <ModalUpdateFaculty loadFaculties={loadFaculties} faculties={faculties} setFaculties={setFaculties} faculty={faculty} />
                <Button className="w-100"  
                        variant="danger"
                        onClick={() => setShowDeleteModal({ [faculty.id]: true })}
                        >
                  Xóa
                </Button>
              </td>
              {/* Modal hỏi người dùng */}
              <Modal 
                      show={showDeleteModal[faculty.id]}
                      onHide={() => setShowDeleteModal({ [faculty.id]: false })}>
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
                          handleDelete(faculty.id);
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

export default ManageFaculty