import { useEffect, useState } from "react";
import Apis, { endpoints } from "../../../configs/Apis";
import { toastError } from "../../../components/Toast/Notification";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const KhoaCongNgheThongTinDetails = () => {
    const [faculties, setFaculties] = useState([]);
    const [articles, setArticles] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5; // Số lượng bài viết trên mỗi trang
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

      // Cập nhật trang hiện tại khi người dùng chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    const loadFaculties = async () => {
        try {
          let res = await Apis.get(endpoints['faculties']);
          setFaculties(res.data);
          console.log(res.data);
        } catch (ex) {
          console.error(ex);
          toastError("Lỗi khi tải danh sách");
        }
      };

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
          loadFaculties()
        }, []);

          // Lọc các bài viết có faculty_id = 2
    const filteredArticles = articles.filter(article => article.facultyId.id === 3);
    const filteredFaculties = faculties.filter(faculty => faculty.id === 3);
      
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    return<>
         <h2 className="text-center text-blue-700 font-bold mb-5">GIỚI THIỆU KHOA CÔNG NGHỆ THÔNG TIN</h2>
        {filteredFaculties.map(faculty => (
             <iframe
             title={`video-${faculty.id}`}
             width="850"
             height="500"
             src={faculty.videoUrl}
             allowFullScreen
         ></iframe>
        ))}
    <Col xs={12} md={12}>
      <h1 className="pb-10 pt-10 text-blue-700 decoration-slate-950" >BÀI VIẾT CỦA CÔNG NGHỆ THÔNG TIN</h1>
      <Row xs={1} md={2} className="g-4">
        <Col lg={12} md={12} xs={12}>
          {currentArticles.map((article) => (
            <div key={article.id}>
              <Row className="pt-2 pb-2">
                <Col md={4}>
                  <div className="article-image"><img src={article.thumbnail} className="w-5/6" alt={article.title} /></div>
                </Col>
                <Col md={8}>
                  <h3 className="article-title text-blue-900 font-bold">{article.title}</h3>
                  <div className="rendered-content text-xl" dangerouslySetInnerHTML={{ __html: `${article.content.substring(0, 150)}...` }} />
                  <Link className="text-xl" to={`/article/${article.id}`}>Xem chi tiết</Link>
                </Col>
              </Row>
              <hr />
            </div>
            ))}
        </Col>
      </Row>
      {/* Hiển thị phân trang */}
      <Pagination>
        {Array.from({ length: Math.ceil(filteredArticles.length / articlesPerPage) }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Col>
    </>
}

export default KhoaCongNgheThongTinDetails