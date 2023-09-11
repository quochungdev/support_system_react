import ModalCreateLiveStream from "./ModalCreateLiveStream"
import { useContext, useEffect, useState } from "react"
import { Button, Card, Form, Modal, Table } from "react-bootstrap"
import Apis, { authApi, endpoints } from "../../configs/Apis"
import '../../assets/CSS/Manage.css'
import ModalUpdateFaculty from "./ModalUpdateFaculty";
import ModalCreateFaculty from "./ModalCreateFaculty";
import Notification, { toastError, toastSuccess } from "../Toast/Notification";
import { ToastContainer, toast } from "react-toastify";
import ModalUpdateLivestream from "./ModalUpdateLivestream"

const ManageLiveStream = ( {handleUpdate, showDeleteModal, setShowDeleteModal}) => {
    const [isTableFacultyVisible, setIsTableFacultyVisible] = useState(true); // Mặc định là hiển thị
    const [livestreams, setLiveStreams] = useState([]);

    const loadLiveStreams = async () => {
      try {
        let res = await Apis.get(endpoints['livestreams']);
        const formattedLive= res.data.map(live => ({
          ...live,
          date: new Date(live.date).toLocaleString(),
          
        }));
        setLiveStreams(formattedLive);
        console.log(formattedLive);
      } catch (ex) {
        console.error(ex);
        toastError("Lỗi khi tải danh sách");
      }
    };
    useEffect(() => { 
        loadLiveStreams()
      }, []);

      const handleDelete = async (liveId) => {
        try {
          let res = await authApi().delete(endpoints.delete_livestream(liveId));
          toastSuccess("Xóa thành công")
          // handleUpdate();
          loadLiveStreams()
        } catch (ex) {
          console.error(ex);
        }
      };

    return <div>
    <ToastContainer />
    <h2 className="text-center text-blue-700 font-bold mb-5 mt-2">
      Quản Lý Livestream
    </h2>      
    <Button variant="info" onClick={() => setIsTableFacultyVisible(!isTableFacultyVisible)}>
      {isTableFacultyVisible ? "Ẩn danh sách" : "Hiển thị danh sách"}
    </Button>
    <ModalCreateLiveStream loadLiveStreams={loadLiveStreams} />
    {isTableFacultyVisible &&  
    <Table className="mt-5" striped bordered hover size="sm">
      <thead>
      <tr className="text-center">
          <th>ID</th>
          <th>Tiêu đề</th>
          <th>Lịch phát livestream</th>
          <th>Thời gian livestream</th>
          <th>Hình ảnh</th>
          <th>Khoa</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {livestreams.map(livestream => (
          <tr key={livestream.id}>
            <td>{livestream.id}</td>
            <td>{livestream.title}</td>
            <td>{livestream.date}</td>
            <td>{livestream.time}</td>
            <td>
            <img className="mb-10 -mr-200 w-20 zoomable-image" variant="top" src={livestream.thumbnail} />
            </td>
            <td>{livestream.facultyId.name}</td>
            <td className="p-2">
              <Button className="w-100" variant="success">
                Xem
              </Button>
              <ModalUpdateLivestream 
                loadLiveStreams={loadLiveStreams}
                // handleUpdate={() => loadLiveStreams()}
                livestream={livestream} />
              <Button className="w-100"  
                      variant="danger"
                      onClick={() => setShowDeleteModal({ [livestream.id]: true })}
                      >
                Xóa
              </Button>
            </td>
            {/* Modal hỏi người dùng */}
                   <Modal 
                      show={showDeleteModal[livestream.id]}
                      onHide={() => setShowDeleteModal({ [livestream.id]: false })}>
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
                          handleDelete(livestream.id);
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
}

export default ManageLiveStream