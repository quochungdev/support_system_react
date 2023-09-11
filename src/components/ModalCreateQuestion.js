import { useContext, useRef, useState } from "react";
import { MyUserContext } from "../App";
import { toastError, toastSuccess } from "./Toast/Notification";
import { authApi, endpoints } from "../configs/Apis";
import { Button, Form, Modal } from "react-bootstrap";
import emailjs from '@emailjs/browser';

const ModalCreateQuestion = ( {selectedLiveId, selectedLiveName} ) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [user] = useContext(MyUserContext);
    const [contentQuest, setContentQuest] = useState('')

    const form = useRef();

    const sendEmail = async () => {
      const formData = new FormData();
        formData.append("content", contentQuest);
        formData.append("livestreamId", selectedLiveId);
        formData.append("user_id", user.id);

        try {
            let res = await authApi().post(endpoints['send_question'] , formData)
            console.log(res.data);
            toastSuccess("GỬI CÂU HỎI THÀNH CÔNG")
            handleClose()
        } catch (ex) {
            console.error(ex);
            toastError("TẠO THẤT BẠI")
        }        

      emailjs.sendForm('service_91wggur', 
      'template_ub7i90l', form.current, 
      'AD-q5wSuNf6jnyPJH')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };


    return (
        <>
          <Button className="w-2/6 !font-bold" variant="warning" onClick={handleShow}>
            Đặt câu hỏi
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Đặt câu hỏi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form ref={form} onSubmit={sendEmail}>
              <Form.Group className="mb-3">
                  <Form.Label>Tài khoản</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Livestream</Form.Label>
                  <Form.Control
                    type="text"
                    name="livestream"
                    value={selectedLiveName}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nội dung</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    onChange={e => setContentQuest(e.target.value)}
                    placeholder="Gửi câu hỏi cho trường ..."
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={sendEmail} >
                Gửi 
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ModalCreateQuestion