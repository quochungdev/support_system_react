import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Apis, { authApi, endpoints } from '../../configs/Apis';
import { toastError, toastSuccess } from '../Toast/Notification';

function ModalUpdateMajor({ major, setMajors, majors, loadMajors }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameMajor, setNameMajor] = useState(major.name)
  const [selectedFacultyId, setSelectedFacultyId] = useState(major.facultyId.id);
  

  const updateMajor = async () => {
    const formData = new FormData();
      formData.append("id", major.id);
      formData.append("name", nameMajor);
      formData.append("facultyId", selectedFacultyId)

        try {
            let res = await authApi().post(endpoints['update_major'] ,formData);
            console.log(res.data);
            loadMajors()
            toastSuccess("CẬP NHẬT THÀNH CÔNG")
            handleClose()
            
        } catch (ex) {
            console.error(ex);
            toastError("CẬP NHẬT THẤT BẠI")
        }        
    }
    
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

  return (
    <>
      <Button className="w-20 ml-5 mr-5" variant="dark" onClick={handleShow}>
        Sửa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa chuyên ngành</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Tên Ngành</Form.Label>
                  <Form.Control
                    type="text"
                    value={nameMajor}
                    onChange={e => setNameMajor(e.target.value)}
                    placeholder={major.name}
                    autoFocus
                  />
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
          <Button variant="primary" onClick={updateMajor}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateMajor;