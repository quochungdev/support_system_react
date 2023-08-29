// TuyenSinhMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

const TuyenSinhMenu = () => {
  return (
    <div className="tuyensinh-menu">
      <ul>
        <li>
          <Link to="/tuyensinh/chinhquy">Hệ chính quy</Link>
        </li>
        <li>
          <Link to="/tuyensinh/lienthong">Hệ liên thông</Link>
        </li>
        <li>
          <Link to="/tuyensinh/caohoc">Cao học</Link>
        </li>
        <li>
          <Link to="/tuyensinh/thacsi">Thạc sĩ</Link>
        </li>
        <li>
          <Link to="/tuyensinh/daotaotuxa">Đào tạo từ xa</Link>
        </li>
      </ul>
    </div>
  );
};

export default TuyenSinhMenu;
