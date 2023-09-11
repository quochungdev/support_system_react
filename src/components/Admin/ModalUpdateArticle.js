import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Apis, { authApi, endpoints } from '../../configs/Apis';
import { toastError, toastSuccess } from '../Toast/Notification';
import { MyUserContext } from '../../App';
import ReactQuill from 'react-quill';
import { ToastContainer } from 'react-toastify';

function ModalUpdateArticle({ article, setArticles, articles, loadArticles }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    
  const [user] = useContext(MyUserContext);

  const [titleArticle, setTitleArticle] = useState(article.title)
  const [thumbnailArticle, setThumbnailArticle] = useState(null)
  const [contentArticle, setContentArticle] = useState(article.content)
  const [selectedCategoryId, setSelectedCategoryId] = useState(article.categoryId.id)
  const [selectedFacultyId, setSelectedFacultyId] = useState(article.facultyId.id)

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]; // Lấy tệp được chọn
    setThumbnailArticle(selectedFile); // Lưu File object vào state
  };
    const updateArticle = async () => {

      const formData = new FormData();
      formData.append("id", article.id);
      formData.append("title", titleArticle);
      formData.append("content", contentArticle)
      formData.append("cateId", selectedCategoryId)
      formData.append("facultyId", selectedFacultyId)
      
     // Kiểm tra nếu thumbnailArticle có giá trị (đã thay đổi) thì mới thêm vào FormData
      if (thumbnailArticle) {
        formData.append("thumbnail", thumbnailArticle);
      } else {
        // Nếu không thay đổi thì sử dụng giá trị từ article.thumbnail
        const blob = await fetch(article.thumbnail).then((res) => res.blob());
        const file = new File([blob], "thumbnail.jpg"); // Đặt tên và loại tệp theo ý muốn
        formData.append("thumbnail", file);
      }

        try {

            let res = await authApi().post(endpoints['update_article'] , formData)
            console.log(res.data);
            loadArticles()
            toastSuccess("CẬP NHẬT THÀNH CÔNG")
            handleClose()
            
        } catch (ex) {
            console.error(ex);
            toastError("CẬP NHẬT THẤT BẠI")
        }        
    }

    const handleContentChange = (newContent) => {
      setContentArticle(newContent)
    }


  return (
    <>
      <Button className="w-100 mt-2 mb-2" variant="dark" onClick={handleShow}>
        Sửa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                value={titleArticle}
                onChange={e => setTitleArticle(e.target.value)}
                placeholder={article.title}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nội dung</Form.Label>
              <ReactQuill theme="snow" value={contentArticle} onChange={handleContentChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                    <Form.Label>Hình ảnh</Form.Label>
                    <Form.Control type="file" 
                                //  value={thumbnailArticle}
                                 accept="image/*"
                                 onChange={handleImageChange} // Gọi hàm khi chọn tệp
                                 placeholder="Chọn file" />
                                <img src={article.thumbnail} />
                      {thumbnailArticle && <img className="w-20" src={URL.createObjectURL(thumbnailArticle)} alt="Avatar Preview" />}

            </Form.Group>
            <Form.Select
                 value={selectedCategoryId}
                 aria-label="Default select example"
                 onChange={(e) => setSelectedCategoryId(e.target.value)} // Cập nhật selectedCategoryId khi có sự thay đổi trong dropdown
                 >
                    <option>Chọn danh mục</option>
                    {categories.map(c => (
                        <>
                        <option value={c.id} key={c.id}>{c.name}</option>
                        </>
                    ))}
                </Form.Select>
                <br/>
            <Form.Select 
                value={selectedFacultyId}
                aria-label="Default select example"
                onChange={(e) => setSelectedFacultyId(e.target.value)}
                >
                    <option>Chọn khoa</option>
                    {faculties.map(f => (
                        <>
                        <option value={f.id} key={f.id}>{f.name}</option>
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
          <Button variant="primary" onClick={updateArticle}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateArticle;