import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Apis, { authApi, endpoints } from '../../configs/Apis';
import { toastError, toastSuccess } from '../Toast/Notification';

const ModalCreateScore = ( { loadScores} ) => {
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
      
    const [score, setScore] = useState()
    const [yearScore, setYearScore] = useState(); 
    const [selectedMajorId, setSelectedMajorId] = useState(); 
    const [selectedCategoryId, setSelectedCategoryId] = useState(); // State để lưu category.id  

    const years = [2022,2021,2020,2019,2018]

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
        loadCategories()
        loadMajors()
    }, []);
    
   
      const createScore = async () => {
        const formData = new FormData();
        formData.append("score", score);
        formData.append("year", yearScore)
        formData.append("categoryId", selectedCategoryId)
        formData.append("majorId", selectedMajorId)
          try {
              let res = await authApi().post(endpoints['create_score'],formData)
              loadScores()
              toastSuccess("TẠO THÀNH CÔNG")
              handleClose()
              
          } catch (ex) {
              console.error(ex);
              toastError("TẠO THẤT BẠI")
          }        
      }
  
    return (
        <>
          <Button className="w-auto ml-5 mr-5 mb-4" variant="dark" onClick={handleShow}>
            Thêm Điểm
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Nhập điểm mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nhập điểm</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setScore(e.target.value)}
                    // placeholder={faculty.name}
                    autoFocus
                  />
                </Form.Group>
                <Form.Select 
                aria-label="Default select example"
                onChange={(e) => setYearScore(e.target.value)}
                >
                    <option>Chọn năm</option>
                    {years.map(year => (
                        <>
                        <option value={year}>{year}</option>
                        </>
                    ))}
                </Form.Select>
                <br/>
                <Form.Select 
                aria-label="Default select example"
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                    <option>Chọn khoa</option>
                    {categories.map(f => (
                        <>
                        <option value={f.id}>{f.name}</option>
                        </>
                    ))}
                </Form.Select>
                <br/>
                <Form.Select 
                aria-label="Default select example"
                onChange={(e) => setSelectedMajorId(e.target.value)}
                >
                    <option>Chọn khoa</option>
                    {majors.map(f => (
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
              <Button variant="primary" onClick={createScore} >
                Create 
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default  ModalCreateScore