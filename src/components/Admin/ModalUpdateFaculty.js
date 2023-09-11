import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { authApi, endpoints } from '../../configs/Apis';
import { toastError, toastSuccess } from '../Toast/Notification';

function ModalUpdateFaculty({ faculty, setFaculties, faculties, loadFaculties }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [nameFaculty, setNameFaculty] = useState(faculty.name)
  const [descFaculty, setDescFaculty] = useState(faculty.description)
  const [websiteFaculty, setWebsiteFaculty] = useState(faculty.websiteUrl)
  const [videoFaculty, setVideoFaculty] = useState(faculty.videoUrl)
  const [imageFaculty, setImageFaculty] = useState(null)

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]; // Lấy tệp được chọn
    setImageFaculty(selectedFile); // Lưu File object vào state
  };

  //   // Gán giá trị cho các state dựa trên faculty được truyền vào
  // useEffect(() => {
  //   setNameFaculty(faculty.name);
  //   setDescFaculty(faculty.description);
  //   setWebsiteFaculty(faculty.websiteUrl);
  //   setVideoFaculty(faculty.videoUrl);
  //   setImageFaculty(faculty.imagaUrl)
  // }, [faculty]);

    const updateFaculty = async () => {

      console.log("ID đang dùng: " + faculty.id);

      const formData = new FormData();
      formData.append("id", faculty.id);
      console.log(typeof faculty.id);
      formData.append("name", nameFaculty);
      formData.append("description", descFaculty);
      formData.append("website_url", websiteFaculty)
      formData.append("video_url", videoFaculty)
      formData.append("image_url", imageFaculty)

      // Kiểm tra nếu thumbnailArticle có giá trị (đã thay đổi) thì mới thêm vào FormData
      if (imageFaculty) {
        formData.append("image_url", imageFaculty);
      } else {
        // Nếu không thay đổi thì sử dụng giá trị từ article.thumbnail
        const blob = await fetch(faculty.image_url).then((res) => res.blob());
        const file = new File([blob], "thumbnail.jpg"); // Đặt tên và loại tệp theo ý muốn
        formData.append("image_url", file);
      }

        try {

            let res = await authApi().post(endpoints['update_faculty'] , formData)
            console.log(res.data);
            console.log("ID đang dùng (sau khi res.data): " + faculty.id);
            loadFaculties()
            // setFaculties((prevFaculties) => {
            //   return prevFaculties.map((fal) => {
            //     if (fal.id === faculty.id) {
            //       return { ...fal,
            //         name: nameFaculty, 
            //         description: descFaculty, 
            //         websiteUrl: websiteFaculty, 
            //         videoUrl: videoFaculty, 
            //         imageUrl: imageFaculty };
            //     }
            //     return fal;
            //   });
            // });
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
          <Modal.Title>Sửa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên khoa</Form.Label>
              <Form.Control
                type="text"
                value={nameFaculty}
                onChange={e => setNameFaculty(e.target.value)}
                placeholder={faculty.name}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                value={descFaculty}
                onChange={e => setDescFaculty(e.target.value)}
                placeholder={faculty.description}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                value={websiteFaculty}
                onChange={e => setWebsiteFaculty(e.target.value)}
                placeholder={faculty.websiteUrl}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="text"
                value={videoFaculty}
                onChange={e => setVideoFaculty(e.target.value)}
                placeholder={faculty.videoUrl}
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
          <Button variant="primary" onClick={updateFaculty}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateFaculty;