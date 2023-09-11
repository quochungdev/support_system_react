import { useContext, useEffect, useState } from "react"
import { Button, Card, Form, Modal, Table } from "react-bootstrap"
import Apis, { authApi, endpoints } from "../../configs/Apis"
import cookie from "react-cookies";
import { ToastContainer, toast } from "react-toastify";
import '../../assets/CSS/Manage.css'
import ModalUpdateFaculty from "./ModalUpdateFaculty";
import ModalCreateFaculty from "./ModalCreateFaculty";
import { toastError, toastSuccess } from "../Toast/Notification";
import ModalCreateArticle from "./ModalCreateArticle";
import ModalUpdateArticle from "./ModalUpdateArticle";

const ManageArticle = ( {searchKeyword, showDeleteModal, setShowDeleteModal}) => {
    const [showMore, setShowMore] = useState({});
    const [isTableFacultyVisible, setIsTableFacultyVisible] = useState(true); // Mặc định là hiển thị
    const [articles, setArticles] = useState([]);
    
    const [validated, setValidated] = useState(false);

    const loadArticles = async () => {
      try {
        let res = await Apis.get(endpoints['articles']);

        const formattedArticle = res.data.map(article => ({
          ...article,
          date: new Date(article.date).toLocaleString(),
        }));
        setArticles(formattedArticle);
        console.log(res.data);

      } catch (ex) {
        console.error(ex);
        toastError("Lỗi khi tải danh sách");
      }
    };

    useEffect(() => { 
        loadArticles()   
      }, []);

      const handleDelete = async (articleId) => {
        setShowDeleteModal(true);

        try {
          let res = await authApi().delete(endpoints.delete_article(articleId));
          toastSuccess("Xóa thành công")
          loadArticles()
          
        } catch (ex) {
          console.error(ex);
          toastError("Xóa thất bại");
        }
      };

      const toggleShowMore = (articleId) => {
        setShowMore((prev) => ({
          ...prev,
          [articleId]: !prev[articleId],
        }))
      }
      const filteredArticles = articles.filter((m) =>
      m.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
      <div>
      <ToastContainer />
      <h2 className="text-center text-blue-700 font-bold mb-5 mt-2">
        Quản Lý Bài Viết
      </h2>      
      <Button variant="info" onClick={() => setIsTableFacultyVisible(!isTableFacultyVisible)}>
        {isTableFacultyVisible ? "Ẩn danh sách" : "Hiển thị danh sách"}
      </Button>
      <ModalCreateArticle validated={validated} setValidated={setValidated} loadArticles={loadArticles}/>
      {isTableFacultyVisible &&  
      <Table className="mt-5" striped bordered hover size="sm">
        <thead>
        <tr className="text-center">
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Hình ảnh</th>
            <th>Ngày tạo</th>
            <th>Người tạo</th>
            <th>Danh mục</th>
            <th>Khoa</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map(article => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>
                {showMore[article.id] ? (<div className="rendered-content" dangerouslySetInnerHTML={{ __html: article.content }} />) 
                : (<div className="rendered-content" dangerouslySetInnerHTML={{ __html: article.content.substring(0,140) }} />)}
                {article.content.length > 150 && (
                  <a className="decoration-emerald-500 pl-5"
                     onClick={() => toggleShowMore(article.id)}>{showMore[article.id] ? "Thu gọn" : "Xem thêm"}</a>
                )}
              </td>
              <td>
              <img className="mb-10 -mr-200 w-20 zoomable-image" variant="top" src={article.thumbnail} />
              </td>
              <td>{article.date}
              </td>
              <td>{article.userId.username}</td>
              <td>{article.categoryId.name}</td>
              <td>{article.facultyId.name}</td>
              <td className="p-2">
                <Button className="w-100 mb-1" variant="success">
                  Xem
                </Button>
                <ModalUpdateArticle loadArticles={loadArticles} articles={articles} setArticles={setArticles} article={article} />
                <Button className="w-100 mb-1"  
                        variant="danger"
                        onClick={() => setShowDeleteModal({ [article.id]: true })}
                        >
                  Xóa
                </Button>
              </td>
                     {/* Modal hỏi người dùng */}
                     <Modal 
                      show={showDeleteModal[article.id]}
                      onHide={() => setShowDeleteModal({ [article.id]: false })}>                    
                      <Modal.Header closeButton>
                      <Modal.Title>Xác nhận xóa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc muốn xóa bài viết này?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          // Gọi hàm xóa bài viết tại đây
                          handleDelete(article.id);
                          setShowDeleteModal(false); // Đóng modal sau khi xóa
                        }}
                      >
                        Xóa
                      </Button>
                    </Modal.Footer>
                  </Modal>
            </tr>
          ))}
        </tbody>
      </Table> }


    </div>
    )
}

export default ManageArticle