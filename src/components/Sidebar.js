import categoryAPI from '../configs/categories.json'
import Apis, { authApi, endpoints } from "../configs/Apis";
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import IsAdminCheck from './Admin/IsAdminCheck';
import { toastError, toastSuccess } from './Toast/Notification';
import { MyUserContext } from '../App';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [user] = useContext(MyUserContext);

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
    return (
       <>
       
       <Col md={12} className='pl-5'>

       <div className='mt-3 mb-3 bg-blue-50'>
            <Row className='p-3'>
              <Col md={4}>
                <div><img className='w-4/5' src='https://cdn-icons-png.flaticon.com/512/5822/5822065.png' /></div>
              </Col>
              <Col md={8}>
               {
                user ?
                <a href='/livestream' className='decoration-transparent'>
                <p className='font-bold text-blue-700 text-2xl'>PHÒNG
                   <br/>
                   LIVESTREAM
                 </p>
                </a> : <Link className='text-xl' to={'/dangnhap'}>Vui lòng đăng nhập để tham gia livestream</Link>
               }
              </Col>
            </Row>
        </div>

        <div className='mt-3 mb-3 bg-blue-50'>
            <Row className='p-3'>
              <Col md={4}>
                <div><img src='https://tuyensinh.ou.edu.vn/tmp/rscache/86x73-faqs.png' /></div>
              </Col>
              <Col md={8}>
               <a href='/cau-hoi-thuong-gap' className='decoration-transparent'>
               <p className='font-bold text-blue-700 text-2xl'>CÂU HỎI 
                  <br/>
                  THƯỜNG GẶP
                </p>
               </a>
              </Col>
            </Row>
        </div>

        <div className='bg-blue-50 pl-6 pr-6'>
          <div className="title-categories text-4xl font-extrabold text-blue-700 text-center pt-5 pb-4">TIN NỔI BẬT</div>
              {articles.slice(0, 1).map((article, index) => (
              <div key={article.id} className={index === 0 ? 'featured-article' : 'normal-article'}>
                <Row>
                  <Col md={12}>
                    <h5 className="article-title ">
                      <a className="decoration-transparent" href="#" title={article.title}>
                      <img className="w-12 h-9 float-left" src="https://tuyensinh.ou.edu.vn/theme/ts2020/assets/images/icon-new.gif"/>
                        {article.title}
                      </a>
                    </h5>
                    <hr className='opacity-10' />
                  </Col>
                </Row>
              </div>
            ))}
             {articles.slice(1,6).map((article, index) => (
              <div key={article.id} className=''>
                <Row>
                  <Col md={12}>
                    <h5 className="article-title">
                      <a className="decoration-transparent text-blue-800" href="#" title={article.title}>
                        {article.title}
                      </a>
                    </h5>
                    <hr className='opacity-10' />
                  </Col>
                </Row>
              </div>
            ))}
        </div>

        <div className='mt-3 bg-blue-50'>
          <div>
          <div className="title-categories text-4xl font-extrabold text-blue-700 text-center pt-5 pb-4">VIDEO/HÌNH ẢNH</div>
          <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/Us1okcXiHpA?si=uflURHSZUTg3AKTq"
              allowFullScreen
          ></iframe>
          </div>
        </div>

        <div className='mt-3 bg-blue-50'>
            <Row className='p-3'>
              <Col md={4}>
                <div><img src='https://tuyensinh.ou.edu.vn/tmp/rscache/86x73-thungo.png' /></div>
              </Col>
              <Col md={8}>
               <a href='#' className='decoration-transparent'>
               <p className='font-bold text-blue-700 text-2xl'>THƯ NGỎ
                  <br/>
                  HIỆU TRƯỞNG
                </p>
               </a>
              </Col>
            </Row>
        </div>

        <div className='mt-3 bg-blue-50'>
            <Row className='p-3'>
              <Col md={4}>
                <div><img src='https://tuyensinh.ou.edu.vn/tmp/rscache/86x73-lydochonou.png' /></div>
              </Col>
              <Col md={8}>
               <a href='#' className='decoration-transparent'>
               <p className='font-bold text-blue-700 text-2xl'>VÌ SAO
                  <br/>
                  CHỌN OU
                </p>
               </a>
              </Col>
            </Row>
        </div>

        <div className='mt-3 bg-blue-50'>
            <Row className='p-3'>
              <Col md={4}>
                <div><img src='https://tuyensinh.ou.edu.vn/tmp/rscache/86x73-tongquan.png' /></div>
              </Col>
              <Col md={8}>
               <a href='#' className='decoration-transparent'>
               <p className='font-bold text-blue-700 text-2xl'>TỔNG QUAN
                  <br/>
                  VỀ OU
                </p>
               </a>
              </Col>
            </Row>
        </div>

        <div className='mt-3 bg-blue-50'>
            <Row className='p-3'>
              <Col md={4}>
                <div><img src='https://tuyensinh.ou.edu.vn/tmp/rscache/86x73-tainguyen.png' /></div>
              </Col>
              <Col md={8}>
               <a href='#' className='decoration-transparent'>
               <p className='font-bold text-blue-700 text-2xl'>THÔNG TIN
                  <br/>
                  THAM KHẢO
                </p>
               </a>
              </Col>
            </Row>
        </div>

        
        </Col>
       </>
    )
}
export default Sidebar;