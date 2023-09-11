import { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Apis, { authApi, endpoints } from '../../configs/Apis';
import { toastError, toastSuccess } from '../Toast/Notification';
import { MyUserContext } from '../../App';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ModalUpdateLivestream = ( {loadLiveStreams, livestreams, setLiveStreams, livestream} ) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [titleStream, setTitleStream] = useState(livestream.title)
    const [dateStream, setDateStream] = useState()
    const [thumbnailStream, setThumbnailStream] = useState(null)
    const [selectedFacultyId, setSelectedFacultyId] = useState(livestream.facultyId.id)

    const handleImageChange = (e) => {
      const selectedFile = e.target.files[0]; // Lấy tệp được chọn
      setThumbnailStream(selectedFile); // Lưu File object vào state
    };

    const handleDateChange = (date) => {
        setDateStream(date);
    };

    const [faculties, setFaculties] = useState([]);
    const loadFaculties = async () => {
        try {
          let res = await Apis.get(endpoints['faculties']);
          setFaculties(res.data);
        } catch (ex) {
          console.error(ex);
          toastError("Lỗi khi tải danh sách");
        }
      };
      useEffect(() => { 
        loadFaculties()
    }, []);
  
      const updateLivestream = async () => {
        const formattedDate = new Date(dateStream).toISOString().slice(0, 19).replace("T", " ");
        console.log(formattedDate);

        const formData = new FormData();
        formData.append("id", livestream.id);
        formData.append("title", titleStream);
        formData.append("date", formattedDate);
        formData.append("time", 0)
        formData.append("thumbnail", thumbnailStream)
        formData.append("facultyId", selectedFacultyId)
        
        // Kiểm tra nếu thumbnailArticle có giá trị (đã thay đổi) thì mới thêm vào FormData
        if (thumbnailStream) {
            formData.append("thumbnail", thumbnailStream);
        } else {
            // Nếu không thay đổi thì sử dụng giá trị từ article.thumbnail
            const blob = await fetch(livestream.thumbnail).then((res) => res.blob());
            const file = new File([blob], "thumbnail.jpg"); // Đặt tên và loại tệp theo ý muốn
            formData.append("thumbnail", file);
        }
        
          try {
  
              let res = await authApi().post(endpoints['update_livestream'] , formData)
            //   handleUpdate()
            loadLiveStreams()
              toastSuccess("CẬP NHẬT THÀNH CÔNG")
              handleClose()
              
          } catch (ex) {
              console.error(ex);
              toastError("CẬP NHẬT THẤT BẠI")
          }        
      }
  
    return (
      <>
        <Button className="w-100 mt-2 mb-2" variant="dark" onClick={handleShow}>
          Sửa
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật Livestream</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                <Form.Label>Chọn ngày giờ </Form.Label>
                <DatePicker
                    id="datePicker"
                    selected={dateStream}
                    onChange={handleDateChange}
                    showTimeSelect // Cho phép chọn giờ
                    timeFormat="HH:mm:ss" // Định dạng giờ
                    dateFormat="yyyy-MM-dd HH:mm:ss" // Định dạng ngày và giờ
                    timeIntervals={15} // Khoảng cách thời gian giữa các tùy chọn
                    isClearable // Cho phép xóa giá trị
                />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control
                    type="text"
                    value={titleStream}
                    onChange={e => setTitleStream(e.target.value)}
                    // placeholder={faculty.name}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control type="file" 
                                     accept="image/*"
                                     onChange={handleImageChange} // Gọi hàm khi chọn tệp
                                     placeholder="Chọn file" />
                          {thumbnailStream && <img className="w-20" src={URL.createObjectURL(thumbnailStream)} alt="Avatar Preview" />}
    
                  </Form.Group>
                <Form.Select 
                value={selectedFacultyId}
                aria-label="Default select example"
                onChange={(e) => setSelectedFacultyId(e.target.value)}
                >
                    <option>Chọn khoa</option>
                    {faculties.map(f => (
                        <>
                        <option value={f.id}>{f.name}</option>
                        </>
                    ))}
                </Form.Select>
                <br/>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={updateLivestream} >
                Cập nh 
              </Button>
            </Modal.Footer>
          </Modal>
      </>
    );
}

export default ModalUpdateLivestream