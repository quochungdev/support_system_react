import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageCategory from '../Admin/ManageCategory';
import HeaderAdmin from '../Admin/HeaderAdmin';
import AdminHome from '../Admin/AdminHome';
import ManageFaculty from '../Admin/ManageFaculty';
import ManageArticle from '../Admin/ManageArticle';

const AdminLayout = () => {
  return (
    <div>
      {/* Chỉ định các trang của admin tại đây */}
      <HeaderAdmin />
      <Routes>
        <Route path="/home" element={<AdminHome />} />
        <Route path="/manage-category" element={<ManageCategory />} />
        <Route path="/manage-faculty" element={<ManageFaculty />} />
        <Route path="/manage-article" element={<ManageArticle />} />
          {/* Thêm các route khác cho admin */}
      </Routes>
    </div>
  );
};

export default AdminLayout;
