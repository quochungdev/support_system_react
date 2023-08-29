import { useContext, useEffect, useState } from "react"
import { Button, Card, Form, Table } from "react-bootstrap"
import Apis, { authApi, endpoints } from "../../configs/Apis"
import cookie from "react-cookies";
import { ToastContainer, toast } from "react-toastify";
import '../../assets/CSS/Manage.css'
import ModalUpdateFaculty from "./ModalUpdateFaculty";
import ModalCreateFaculty from "./ModalCreateFaculty";
import { toastError, toastSuccess } from "../Toast/Notification";
import ModalCreateArticle from "./ModalCreateArticle";

const ManageArticle = () => {
    const [showMore, setShowMore] = useState({});
    const [isTableFacultyVisible, setIsTableFacultyVisible] = useState(true); // Mặc định là hiển thị
    const [articles, setArticles] = useState([]);

    const loadArticles = async () => {
      try {
        let res = await Apis.get(endpoints['articles']);
        setArticles(res.data);
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

    return (
      <div>
      <h2>Danh sách bài viết</h2>
      <Button variant="primary" onClick={() => setIsTableFacultyVisible(!isTableFacultyVisible)}>
        {isTableFacultyVisible ? "Ẩn danh sách" : "Hiển thị danh sách"}
      </Button>
      <ModalCreateArticle setArticles={setArticles}/>
      {isTableFacultyVisible &&  
      <Table striped bordered hover size="sm">
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
          {articles.map(article => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>
                {showMore[article.id] ? article.content : `${article.content.substring(0,140)}`}
                {article.content.length > 150 && (
                  <a className="decoration-emerald-500 pl-5"
                     onClick={() => toggleShowMore(article.id)}>{showMore[article.id] ? "Thu gọn" : "Xem thêm"}</a>
                )}
              </td>
              <td>
              <img className="mb-10 -mr-200 w-20 zoomable-image" variant="top" src={article.thumbnail} />
              </td>
              <td>{article.date}</td>
              <td>{article.userId.username}</td>
              <td>{article.categoryId.name}</td>
              <td>{article.facultyId.name}</td>
              <td className="p-2">
                <Button className="w-100 mb-1" variant="success">
                  Xem
                </Button>
                {/* <ModalUpdateFaculty faculties={faculties} setFaculties={setFaculties} faculty={faculty} /> */}
                <Button className="w-100 mb-1"  
                        variant="danger"
                        onClick={() => handleDelete(article.id)}
                        >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> }
    </div>
    )
}

export default ManageArticle