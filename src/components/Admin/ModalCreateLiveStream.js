import { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Apis, { authApi, endpoints } from '../../configs/Apis';
import { toastError, toastSuccess } from '../Toast/Notification';
import { MyUserContext } from '../../App';

import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, getTimezoneOffset } from 'date-fns-tz';
import parse from "date-fns/parse";

const ModalCreateLiveStream = ( {loadLiveStreams}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [titleStream, setTitleStream] = useState()
    const [dateStream, setDateStream] = useState()
    const [thumbnailStream, setThumbnailStream] = useState()
    const [selectedFacultyId, setSelectedFacultyId] = useState()

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
    const yourTimezone = 'Asia/Ho_Chi_Minh';


    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0]; // Lấy tệp được chọn
        setThumbnailStream(selectedFile); // Lưu File object vào state
      };
        const handleDateChange = (date) => {
            setDateStream(date);
        };
      
      const createLiveStream = async () => {
        const formattedDate = new Date(dateStream).toISOString().slice(0, 19).replace("T", " ");
        console.log(formattedDate);

        const formData = new FormData();
        formData.append("title", titleStream);
        formData.append("date", formattedDate);
        formData.append("time", 0)
        formData.append("thumbnail", thumbnailStream)
        formData.append("facultyId", selectedFacultyId)
          try {
              let res = await authApi().post(endpoints['create_livestream'] , formData)
              console.log(res.data);
              loadLiveStreams()
              toastSuccess("TẠO THÀNH CÔNG")
              handleClose()
              
          } catch (ex) {
              console.error(ex);
              toastError("TẠO THẤT BẠI")
          }        
      }

      return (
        <>
          <Button className="w-20 ml-5 mr-5" variant="dark" onClick={handleShow}>
            Tạo
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Tạo Livestream mới</Modal.Title>
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
              <Button variant="primary" onClick={createLiveStream} >
                Create 
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ModalCreateLiveStream