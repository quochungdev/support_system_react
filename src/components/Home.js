import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";
import MySpinner from "../pages/MySpinner";
import articleApi from '../configs/article.json'
import '../assets/CSS/Home.css'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toastError } from "./Toast/Notification";
const Home = () => {
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

    const category1_Articles = articles.filter(article => article.categoryId.id === 14);
    const category2_Articles = articles.filter(article => article.categoryId.id === 87);
    const category3_Articles = articles.filter(article => article.categoryId.id === 18);

    return <>
  <Row id="tuyển-sinh-cao-đẳng">
      <h2 className="text-center text-blue-700 font-bold pb-10">THÔNG TIN TUYỂN SINH CAO ĐẲNG</h2>
      {/* Cột chứa 2 mục của bài viết */}
      <Col lg={6} md={12}>
        {category1_Articles.slice(0, 1).map((article, index) => (
          <div key={article.id} className={index === 0 ? 'featured-article' : 'normal-article'}>
            <Row>
              <Col md={12}>
                <div className="article-image"><img src={article.thumbnail} alt={article.title} /></div>
              </Col>
              <Col md={12}>
                <h5 className="article-title">
                  <a className="decoration-transparent" href="#" title={article.title}>
                  <img className="w-12 h-9 float-left" src="https://tuyensinh.ou.edu.vn/theme/ts2020/assets/images/icon-new.gif"/>
                    {article.title}
                  </a>
                </h5>
              
              </Col>
            </Row>
          </div>
        ))}
        {articles.slice(1, 2).map((article) => (
          <div key={article.id} className="normal-article">
            <Row>
              <Col md={3}>
                <div className="article-image"><img src={article.thumbnail} alt={article.title} /></div>
              </Col>
              <Col md={9}><h3 className="article-title text-blue-900 font-bold">{article.title}</h3></Col>
            </Row>
          </div>
        ))}
      </Col>


      {/* Cột chứa 4 mục của bài viết */}
      <Col lg={6} md={12}>
        {articles.slice(2, 6).map((article, index) => (
          <div key={article.id} className="normal-article">
            <Row className={`article-title ${index === 0 ? 'yellow-background' : ''}`}>
              <Col md={3}>
                <div className="article-image"><img src={article.thumbnail} alt={article.title} /></div>
              </Col>
              <Col md={9}><h3 className="article-title text-blue-900 font-bold">{article.title}</h3></Col>
            </Row>
            <hr />
          </div>
        ))}
      </Col>
  </Row>
  
  <Row id="tuyển-sinh-đại-học-chính-quy" className="pt-16">
      <h2 className="text-center text-blue-700 font-bold pb-10">THÔNG TIN TUYỂN SINH ĐẠI HỌC CHÍNH QUY</h2>
      {/* Cột chứa 2 mục của bài viết */}
      <Col lg={6} md={12} className="mt-10">
        {category2_Articles.slice(0, 1).map((article, index) => (
          <div key={article.id} className={index === 0 ? 'featured-article' : 'normal-article'}>
            <Row>
              <Col md={12}>
                <div className="article-image"><img src={article.thumbnail} alt={article.title} /></div>
              </Col>
              <Col md={12}>
                <h5 className="article-title">
                  <a className="decoration-transparent" href="#" title={article.title}>
                  <img className="w-12 h-9 float-left" src="https://tuyensinh.ou.edu.vn/theme/ts2020/assets/images/icon-new.gif"/>
                    {article.title}
                  </a>
                </h5>
              
              </Col>
            </Row>
          </div>
        ))}
        {category2_Articles.slice(1, 2).map((article) => (
          <div key={article.id} className="normal-article">
            <Row>
              <Col md={3}>
                <div className="article-image"><img src={article.thumbnail} alt={article.title} /></div>
              </Col>
              <Col md={9}><h3 className="article-title text-blue-900 font-bold">{article.title}</h3></Col>
            </Row>
          </div>
        ))}
      </Col>


      {/* Cột chứa 4 mục của bài viết */}
      <Col lg={6} md={12}>
        {category2_Articles.slice(2, 6).map((article, index) => (
          <div key={article.id} className="normal-article">
            <Row className={`article-title ${index === 0 ? 'yellow-background' : ''}`}>
              <Col md={3}>
                <div className="article-image"><img src={article.thumbnail} alt={article.title} /></div>
              </Col>
              <Col md={9}><h3 className="article-title text-blue-900 font-bold">{article.title}</h3></Col>
            </Row>
            <hr />
          </div>
        ))}
      </Col>
      
  </Row>

  <Row id="tuyển-sinh-chất-lượng-cao" className="pt-16">
      <h2 className="text-center text-blue-700 font-bold pb-10">THÔNG TIN TUYỂN SINH CHẤT LƯỢNG CAO</h2>
      {/* Cột chứa 2 mục của bài viết */}
      <Col lg={6} md={12}>
        {category3_Articles.slice(0, 1).map((article, index) => (
          <div key={article.id} className={index === 0 ? 'featured-article' : 'normal-article'}>
            <Row>
              <Col md={12}>
                <div className="article-image"><img src={article.thumbnail} alt={article.title} /></div>
              </Col>
              <Col md={12}>
                <h5 className="article-title">
                  <a className="decoration-transparent" href="#" title={article.title}>
                  <img className="w-12 h-9 float-left" src="https://tuyensinh.ou.edu.vn/theme/ts2020/assets/images/icon-new.gif"/>
                    {article.title}
                  </a>
                </h5>
              
              </Col>
            </Row>
          </div>
        ))}
        {category3_Articles.slice(1, 2).map((article) => (
          <div key={article.id} className="normal-article">
            <Row>
              <Col md={3}>
                <div className="article-image"><img src={article.thumbnail} alt={article.title} /></div>
              </Col>
              <Col md={9}><h3 className="article-title text-blue-900 font-bold">{article.title}</h3></Col>
            </Row>
          </div>
        ))}
      </Col>


      {/* Cột chứa 4 mục của bài viết */}
      <Col lg={6} md={12}>
        {category3_Articles.slice(2, 6).map((article, index) => (
          <div key={article.id} className="normal-article">
            <Row className={`article-title ${index === 0 ? 'yellow-background' : ''}`}>
              <Col md={3}>
                <div className="article-image"><img src={article.thumbnail} alt={article.title} /></div>
              </Col>
              <Col md={9}><h3 className="article-title text-blue-900 font-bold">{article.title}</h3></Col>
            </Row>
            <hr />
          </div>
        ))}
      </Col>
  </Row>
    </>
}

export default Home;