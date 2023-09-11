import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Apis, { authApi, endpoints } from '../../../configs/Apis';
import { toastError, toastSuccess } from '../../Toast/Notification';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { MyUserContext } from '../../../App';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBSwitch, MDBTypography } from 'mdb-react-ui-kit';
import { format, getTimezoneOffset } from 'date-fns-tz';
import parse from "date-fns/parse";
import { ToastContainer } from 'react-toastify';
const BaiViet1 = ({articleId}) => {
    const [articles, setArticles] = useState([]);
    const [comments, setComments] = useState([]);

    const [user] = useContext(MyUserContext);
    const [contentComment, setContentComment] = useState('')
    const [selectedArticleId, setSelectedArticleId] = useState(''); 

    const createComment = async (articleId) => {
      try {
        const formData = new FormData();
        formData.append("content", contentComment);
        formData.append("articleId", articleId);
        formData.append("userId", user.id)

        let res = await authApi().post(endpoints.create_comment(articleId), formData);
        console.log(res.data);
        loadComments(articleId)
        toastSuccess("Bình luận thành công")
        
         // Sau khi tạo bình luận thành công, cập nhật nội dung nhập về chuỗi rỗng
         setContentComment('');
         console.log(contentComment);
      } catch (ex) {
        console.error(ex);
        toastError("Xóa thất bại");
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

      const handleDelete = async (id) => {
        try {
          let res = await authApi().delete(endpoints.delete_comment(id));
          toastSuccess("Xóa thành công")
          setComments((prev) => {
            return prev.filter((comment) => comment.id !== id)
          })
          
        } catch (ex) {
          console.error(ex);
          toastError("Xóa thất bại");
        }
      };
      const filteredArticles = articles.filter(article => article.id === articleId);
      const loadComments = async (articleId) => {
        try {
          let res = await Apis.get(endpoints.comments(articleId));
          const formattedDate = res.data.map(c => ({
            ...c,
            date: new Date(c.date).toLocaleString(),
            
          }));
          setComments(formattedDate);
          console.log(res.data);
        } catch (ex) {
          console.error(ex);
          toastError("Lỗi khi tải danh sách");
        }
      };
        
      useEffect(() => { 
          loadArticles()
          loadComments(articleId)
       }, []);

       function getTimeAgo(dateString) {
        const yourTimezone = 'Asia/Ho_Chi_Minh';
        const livestreamDateStr = dateString;
        const livestreamDate = parse(livestreamDateStr, 'HH:mm:ss dd/MM/yyyy', new Date(), { timeZone: yourTimezone });
        const commentDate = livestreamDate.getTime();
        const currentDate = new Date();
        // const commentDate = new Date(dateString);
        const timeDifference = currentDate - commentDate;
        const secondsAgo = Math.floor(timeDifference / 1000);

        if (secondsAgo < 60) {
          return `${secondsAgo} giây trước`;
        } else if (secondsAgo < 3600) {
          const minutesAgo = Math.floor(secondsAgo / 60);
          return `${minutesAgo} phút trước`;
        } else if (secondsAgo < 86400) {
          const hoursAgo = Math.floor(secondsAgo / 3600);
          return `${hoursAgo} giờ trước`;
        } else {
          const daysAgo = Math.floor(secondsAgo / 86400);
          return `${daysAgo} ngày trước`;
        }
      
      }
       
    return <>
        {filteredArticles.map(article => {
            return <>
              <ToastContainer />
                <h1>{article.title}</h1>
                <div className="rendered-content" dangerouslySetInnerHTML={{ __html: article.content }} />
                <hr/>
                <h3>Bình luận</h3>
                <FloatingLabel
                    controlId="floatingTextarea"

                    label="Chia sẻ ý kiến của bạn"
                    className="mb-3"
                >                  
                  <Form.Control
                    as="textarea"
                    onChange={e => setContentComment(e.target.value)}
                    value={contentComment}
                    placeholder="Leave a comment here"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Ngăn chặn việc xuống dòng trong textarea
                        createComment(articleId);
                      }
                    }}
                  />                
                </FloatingLabel>
    <section style={{ backgroundColor: "#f7f6f6" }}>
    <MDBContainer className="py-5 text-dark" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="10" xl="8" className='!w-full'>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h4" className="text-dark mb-0">
                Tất cả bình luận ({comments.length})
              </MDBTypography>
              <MDBCard>
                <MDBCardBody className="p-2 d-flex align-items-center">
                  <MDBTypography
                    tag="h6"
                    className="text-primary fw-bold small mb-0 me-1"
                  >
                    Comments "ON"
                  </MDBTypography>
                  <MDBSwitch defaultChecked id="flexSwitchCheckChecked" />
                </MDBCardBody>
              </MDBCard>
            </div>

            {comments.map((comment) => {
              const timeAgo = getTimeAgo(comment.date);
              return <MDBCard className="mb-3">
              <MDBCardBody>
                <div className="d-flex flex-start">
                  <MDBCardImage
                    className="rounded-circle shadow-1-strong me-3"
                    src={comment.userId.avatar}
                    alt="avatar"
                    width="40"
                    height="40"
                  />

                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <MDBTypography
                        tag="h6"
                        className="text-primary fw-bold mb-0"
                      >
                        {comment.userId.username}
                        <span className="text-dark ms-2">
                          {comment.content}
                        </span>
                      </MDBTypography>
                      <p className="mb-0">{timeAgo}</p> {/* Hiển thị ngày ở đây */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="small mb-0" style={{ color: "#aaa" }}>
                        <a onClick={() => handleDelete(comment.id)} href="#!" className="link-grey">
                          Remove
                        </a>{" "}
                        •
                        <a href="#!" className="link-grey">
                          Reply
                        </a>{" "}
                        •
                        <a href="#!" className="link-grey">
                          Translate
                        </a>
                      </p>
                      <div className="d-flex flex-row">
                        <MDBIcon fas icon="star text-warning me-2" />
                        <MDBIcon
                          far
                          icon="check-circle"
                          style={{ color: "#aaa" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
            })}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </section>
            </>
        })}

  
    </>
}

export default BaiViet1