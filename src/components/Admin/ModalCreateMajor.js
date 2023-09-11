import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Apis, { authApi, endpoints } from '../../configs/Apis';
import { toastError, toastSuccess } from '../Toast/Notification';

const ModalCreateMajor = ({ loadMajors }) => {
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
      
    const [nameMajor, setNameMajor] = useState()
    const [selectedFacultyId, setSelectedFacultyId] = useState(''); 
    
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
    
    const formData = new FormData();
    formData.append("name", nameMajor);
    formData.append("facultyId", selectedFacultyId)

      const createMajor = async () => {
          try {
              let res = await authApi().post(endpoints['create_major'],formData)
              loadMajors()
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
              <Modal.Title>Tạo chuyên ngành mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Tên Ngành</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setNameMajor(e.target.value)}
                    // placeholder={faculty.name}
                    autoFocus
                  />
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
              <Button variant="primary" onClick={createMajor} >
                Create 
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ModalCreateMajor