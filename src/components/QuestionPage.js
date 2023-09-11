import { useEffect, useState } from "react"
import { Accordion, Col, Pagination, ToastContainer } from "react-bootstrap"
import Apis, { endpoints } from "../configs/Apis";
import { toastError } from "./Toast/Notification";

const QuestionPage = () => {
    const [questions, setQuestions] = useState([]);
    const loadQuestions = async (liveId) => {
        try { 
          let res = await Apis.get(endpoints.questions(liveId));
          setQuestions(res.data);
          console.log(res.data);
        } catch (ex) {
          console.error(ex);
          toastError("Lỗi khi tải danh sách");
        }
      };
        
      useEffect(() => {
        loadQuestions(6)
      }, []);

      const [currentPage, setCurrentPage] = useState(1);
      const articlesPerPage = 25; // Số lượng bài viết trên mỗi trang
      const indexOfLastArticle = currentPage * articlesPerPage;
      const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  
    // Cập nhật trang hiện tại khi người dùng chuyển trang
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    const currentArticles = questions.slice(indexOfFirstArticle, indexOfLastArticle);

    return <>
    <ToastContainer />
    <h1 className=" text-blue-700 font-bold pb-10">CÂU HỎI THƯỜNG GẶP</h1>
    <Accordion defaultActiveKey="0">
        {currentArticles.map((ques, index) => (
        <Accordion.Item key={ques.id} eventKey={ques.id}>
            <Accordion.Header>
              <Col md={2} className="w-20 h-20 text-center bg-blue-900 inline-block text-5xl pt-3 text-white middle">
                {index +1 } </Col>
              <Col md={10} className="pl-4 text-xl">{ques.content}</Col>
            </Accordion.Header>
            <Accordion.Body>
              Anh Tú mến,
              <br />
              <br />
              Với phương thức xét tuyển đại học dựa vào kết quả kỳ thi Tốt nghiệp THPT Quốc gia, Học sinh có quyền đăng ký nhiều môn thi khác, ngoài 4 môn thi tốt nghiệp để có cơ hội xét vào các ngành nghề với các khối thi tương ứng mà các trường đã công bố.
              <br />
              <br />
              Riêng bản thân em có thể thi 2 khối cùng lúc, với 5  môn thi thuộc khối A: Toán, Lý , Hóa và D1: Toán, Văn, Tiếng Anh. Điều này có nghĩa là ngoài 4 môn thi tốt nghiệp (Toán, Văn, Ngoại ngữ và 1 môn tự chọn), Tú chỉ cần đăng ký thêm 1 môn thi nữa là đã có kết quả của 2 khối thi mình muốn rồi.
              <br />
              <br />
              Chúc Tú chuẩn bị ôn tập kỹ và thi tốt, đạt kết quả cả 5 môn thi ... và nhất là hy vọng sẽ gặp Tú ở Trường ĐH Mở Tp. HCM nhân dịp đón Tân Sinh viên 2015 của trường, Tú nhé!
              <br />
              <br />
              Mến 
            </Accordion.Body>
        </Accordion.Item>
        ))}
    </Accordion>
    {/* Hiển thị phân trang */}
    <Pagination>
        {Array.from({ length: Math.ceil(questions.length / articlesPerPage) }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
}   

export default QuestionPage