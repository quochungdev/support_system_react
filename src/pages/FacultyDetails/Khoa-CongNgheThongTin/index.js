import { useEffect, useState } from "react";
import Apis, { endpoints } from "../../../configs/Apis";
import { toastError } from "../../../components/Toast/Notification";
import { Button, Card, Col, Row } from "react-bootstrap";

const KhoaCongNgheThongTinDetail = () => {

    const [faculties, setFaculties] = useState([]);
    const [articles, setArticles] = useState([]);

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
        <h1 className="pb-5">TIN NỔI BẬT</h1>
          <Row xs={1} md={2} className="g-4">
           {filteredArticles.map(article => {
            return <Col xs={12}  md={3} className="mt-2">
            <Card key={article.id}>
                <Card.Img variant="top" className="w-auto h-64" src={article.thumbnail} />
                <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.content}</Card.Text>
                    <Button variant="primary">Xem chi tiết</Button>
                </Card.Body>
            </Card>
          </Col>
           })}
          </Row>
        </Col>
    </>
}

export default KhoaCongNgheThongTinDetail