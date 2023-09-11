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



const ModalCreateArticle = ({loadArticles, validated, setValidated }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [user] = useContext(MyUserContext);
    const [categories, setCategories] = useState([]);
    const loadCategories = async () => {
        try {
          let res = await Apis.get(endpoints['categories']);
          setCategories(res.data);
        } catch (ex) {
          console.error(ex);
          toastError("Lỗi khi tải danh sách");
        }
      };

    useEffect(() => { 
        loadCategories()
    }, []);

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
    

    const [selectedCategoryId, setSelectedCategoryId] = useState(''); // State để lưu category.id  
    const [selectedFacultyId, setSelectedFacultyId] = useState(''); 
    const [titleArticle, setTitleArtcile] = useState()
    const [contentArticle, setContentArtcile] = useState('')
    const [thumbnailArticle, setThumbnailArtcile] = useState(null)

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0]; // Lấy tệp được chọn
        setThumbnailArtcile(selectedFile); // Lưu File object vào state
      };

    const handleContentChange = (newContent) => {
      setContentArtcile(newContent)
    }
   
      const createArticle = async (evt) => {
        const form = evt.currentTarget;

          if (form.checkValidity() === false) {
            evt.preventDefault();
            evt.stopPropagation();
          }
          setValidated(true)

        const formData = new FormData();
        formData.append("title", titleArticle);
        formData.append("content", contentArticle);
        formData.append("thumbnail", thumbnailArticle)
        formData.append("user_id", user.id)
        formData.append("cateId", selectedCategoryId)
        formData.append("facultyId", selectedFacultyId)
    
          try {
              let res = await authApi().post(endpoints['create_article'] , formData)
              console.log(res.data);
              loadArticles()
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
              <Modal.Title>Tạo bài viết mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate validated={validated} onSubmit={createArticle}>
                <Form.Group className="mb-3">
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setTitleArtcile(e.target.value)}
                    // placeholder={faculty.name}
                    autoFocus
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                     Vui lòng nhập tiêu đề
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nội dung</Form.Label>
                    <ReactQuill required theme="snow" value={contentArticle} onChange={handleContentChange} />
                    <Form.Control.Feedback type="invalid">
                     Vui lòng nhập nội dung
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control type="file" 
                                      required
                                     accept="image/*"
                                     onChange={handleImageChange} // Gọi hàm khi chọn tệp
                                     placeholder="Chọn file" />
                          {thumbnailArticle && <img className="w-20" src={URL.createObjectURL(thumbnailArticle)} alt="Avatar Preview" />}
                  <Form.Control.Feedback type="invalid">
                     Vui lòng chọn ảnh
                  </Form.Control.Feedback>
                  </Form.Group>
                <Form.Select
                 required
                 label="Agree to terms and conditions"
                 feedback="You must agree before submitting."
                 feedbackType="invalid"
                 aria-label="Default select example"
                 onChange={(e) => setSelectedCategoryId(e.target.value)} // Cập nhật selectedCategoryId khi có sự thay đổi trong dropdown
                 >
                  
                    <option>Chọn danh mục</option>
                    
                    {categories.map(c => (
                        <>
                        <option value={c.id}>{c.name}</option>
                        </>
                    ))}
                </Form.Select>
                <br/>
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
                <Form.Control
                    type="text"
                    placeholder={user.username}
                    aria-label={user.username}
                    disabled
                    readOnly
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={createArticle} >
                Create 
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ModalCreateArticle