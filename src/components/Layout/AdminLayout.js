import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageCategory from '../Admin/ManageCategory';
import HeaderAdmin from '../Admin/HeaderAdmin';
import AdminHome from '../Admin/AdminHome';
import ManageFaculty from '../Admin/ManageFaculty';
import ManageArticle from '../Admin/ManageArticle';
import ManageMajor from '../Admin/ManageMajor';
import ManageScore from '../Admin/ManageScore';
import ManageLiveStream from '../Admin/ManageLiveStream';

const AdminLayout = () => {
  const [showDeleteModal, setShowDeleteModal] = useState({});

  const [searchKeyword, setSearchKeyword] = useState(""); // Step 1: State variable to hold search keyword
  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  return (
    <div>
      {/* Chỉ định các trang của admin tại đây */}
      <HeaderAdmin searchKeyword={searchKeyword} handleSearchInputChange={handleSearchInputChange} />
      <Routes>
        <Route path="/home" element={<AdminHome />} />
        <Route path="/manage-category" element={<ManageCategory searchKeyword={searchKeyword} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />} />
        <Route path="/manage-faculty" element={<ManageFaculty searchKeyword={searchKeyword} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />} />
        <Route path="/manage-major" element={<ManageMajor searchKeyword={searchKeyword} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />} />
        <Route path="/manage-article" element={<ManageArticle searchKeyword={searchKeyword} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />} />
        <Route path="/manage-score" element={<ManageScore searchKeyword={searchKeyword} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}/>} />
        <Route path="/manage-livestream" element={<ManageLiveStream searchKeyword={searchKeyword} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />} />
          {/* Thêm các route khác cho admin */}
      </Routes>
    </div>
  );
};

export default AdminLayout;
