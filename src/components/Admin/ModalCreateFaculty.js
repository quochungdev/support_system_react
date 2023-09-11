import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { authApi, endpoints } from '../../configs/Apis';
import { toastError, toastSuccess } from '../Toast/Notification';

const ModalCreateFaculty = ({loadFaculties }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
      
    const [nameFaculty, setNameFaculty] = useState()
    const [descFaculty, setDescFaculty] = useState()
    const [websiteFaculty, setWebsiteFaculty] = useState()
    const [videoFaculty, setVideoFaculty] = useState()
    const [imageFaculty, setImageFaculty] = useState(null)
  
  
    const handleImageChange = (e) => {
      const selectedFile = e.target.files[0]; // Lấy tệp được chọn
      setImageFaculty(selectedFile); // Lưu File object vào state
    };
   
      const createFaculty = async () => {
        const formData = new FormData();
        formData.append("name", nameFaculty);
        formData.append("description", descFaculty);
        formData.append("website_url", websiteFaculty)
        formData.append("video_url", videoFaculty)
        formData.append("image_url", imageFaculty)
    
          try {
              let res = await authApi().post(endpoints['create_faculty'] , formData)
              console.log(res.data);
              loadFaculties()
              // setFaculties(prevFaculties => [...prevFaculties, res.data]);
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
              <Modal.Title>Tạo khoa mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Tên khoa</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setNameFaculty(e.target.value)}
                    // placeholder={faculty.name}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setDescFaculty(e.target.value)}
                    // placeholder={faculty.name}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setWebsiteFaculty(e.target.value)}
                    // placeholder={faculty.name}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Video</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setVideoFaculty(e.target.value)}
                    // placeholder={faculty.name}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="file" 
                                     accept="image/*"
                                     onChange={handleImageChange} // Gọi hàm khi chọn tệp
                                     placeholder="Chọn file" />
                          {imageFaculty && <img className="w-20" src={URL.createObjectURL(imageFaculty)} alt="Avatar Preview" />}
    
                  </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={createFaculty} >
                Create 
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ModalCreateFaculty