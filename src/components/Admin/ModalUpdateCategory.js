import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { authApi, endpoints } from '../../configs/Apis';
import { toastError, toastSuccess } from '../Toast/Notification';

function ModaleUpdateCategory({ category, setCategories, categories }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameCategory, setNameCategory] = useState()

    const updateCategory = async () => {
        try {
            console.log(category.id);
            let res = await authApi().post(endpoints['update_category'] ,{
                "id" : category.id,
                "name": nameCategory
            });
            console.log(res.data);
            setCategories(updateCategories)
            toastSuccess("CẬP NHẬT THÀNH CÔNG")
            handleClose()
            
        } catch (ex) {
            console.error(ex);
            toastError("CẬP NHẬT THẤT BẠI")
        }        
    }

    const updateCategories = categories.map(cat => {
      if (cat.id === category.id){
        return { ...cat, name: nameCategory};
      }
      return cat;
    });


  return (
    <>
      <Button className="w-20 ml-5 mr-5" variant="dark" onClick={handleShow}>
        Sửa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                onChange={e => setNameCategory(e.target.value)}
                placeholder={category.name}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateCategory}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModaleUpdateCategory;