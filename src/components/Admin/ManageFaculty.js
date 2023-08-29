import { useContext, useEffect, useState } from "react"
import { Button, Card, Form, Table } from "react-bootstrap"
import Apis, { authApi, endpoints } from "../../configs/Apis"
import cookie from "react-cookies";
import { ToastContainer, toast } from "react-toastify";
import '../../assets/CSS/Manage.css'
import ModalUpdateFaculty from "./ModalUpdateFaculty";
import ModalCreateFaculty from "./ModalCreateFaculty";
import { toastError, toastSuccess } from "../Toast/Notification";

const ManageFaculty = () => {
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

    return (
      <div>
      <h2>Danh sách Khoa</h2>
      <Button variant="primary" onClick={() => setIsTableFacultyVisible(!isTableFacultyVisible)}>
        {isTableFacultyVisible ? "Ẩn danh sách" : "Hiển thị danh sách"}
      </Button>
      <ModalCreateFaculty setFaculties={setFaculties}/>
      {isTableFacultyVisible &&  
      <Table striped bordered hover size="sm">
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
          {faculties.map(faculty => (
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
                <Button className="w-100 mb-1" variant="success">
                  Xem
                </Button>
                <ModalUpdateFaculty faculties={faculties} setFaculties={setFaculties} faculty={faculty} />
                <Button className="w-100 mb-1"  
                        variant="danger"
                        onClick={() => handleDelete(faculty.id)}
                        >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> }
    </div>
    )
}

export default ManageFaculty