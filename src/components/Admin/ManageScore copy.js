import { ToastContainer } from "react-toastify"
import Apis, { authApi, endpoints } from "../../configs/Apis";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../Toast/Notification";
import { Button, Form, Modal, Table } from "react-bootstrap";
import ModalCreateScore from "./ModalCreateScore";

const ManageScore = ( {searchKeyword} ) => {
  const [scores, setScores] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [dataByMajor, setDataByMajor] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);
  
  // State để lưu trữ năm được chọn để xóa điểm
  const [selectedYear, setSelectedYear] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
   // Mảng chứa các tùy chọn cho <select>
   const yearOptions = Array.from(new Set(scores.map((score) => score.year)));

  // Hàm để hiển thị modal yêu cầu chọn năm
  const showDeleteConfirmation = (year) => {
    setSelectedYear(year);
    setShowDeleteModal(true);
  };
  // Hàm để xóa điểm của năm đã chọn
  const handleDelete = async () => {
    try {
      // Lặp qua các điểm để xóa các điểm của năm đã chọn
      for (const score of scores) {
        if (score.year === selectedYear) {
          await authApi().delete(endpoints.delete_score(score.id));
        }
      }

      toastSuccess("Xóa thành công");
      loadScores();
      setShowDeleteModal(false); // Đóng modal sau khi xóa xong
      setSelectedYear(""); // Đặt giá trị năm đã chọn về trống
    } catch (ex) {
      console.error(ex);
      toastError("Xóa thất bại");
    }
  };

  const loadScores = async () => {
    try {
      let res = await Apis.get(endpoints["scores"]);
      setScores(res.data);
    } catch (ex) {
      console.error(ex);
      toastError("Lỗi khi tải danh sách");
    }   
  };

  useEffect(() => {
    loadScores();
  }, []);

  // const handleDelete = async (scoreId) => {
  //   try {
  //     let res = await authApi().delete(endpoints.delete_score(scoreId));
  //     toastSuccess("Xóa thành công")
  //     loadScores()  
  //   } catch (ex) {
  //     console.error(ex);
  //     toastError("Xóa thất bại");
  //   }
  // };

  useEffect(() => {
    // Lấy danh sách các năm duy nhất từ scores
    const years = Array.from(new Set(scores.map((score) => score.year)));
    setUniqueYears(years);

    // Tạo một đối tượng để theo dõi thông tin theo Tên ngành và năm
    const data = {};

    // Duyệt qua danh sách điểm tuyển sinh
    scores.forEach((score) => {
      score.majorId.name.toLowerCase().includes(searchKeyword.toLowerCase())
      const { majorId, year, score: scoreValue, categoryId } = score;

      // Tạo key để xác định đối tượng, sử dụng categoryId.name và majorId.name
      const key = `${categoryId.name}_${majorId.name}`;

      // Nếu key chưa tồn tại trong đối tượng, thêm nó vào
      if (!data[key]) {
        data[key] = {
          major: majorId.name,
          categoryId: categoryId.name,
          scores: {},
        };
      }
      // Thêm điểm tuyển sinh vào năm tương ứng
      data[key].scores[year] = scoreValue;

    });
    setDataByMajor(data);
  }, [scores]);

  useEffect(() => {
    // Lọc các category duy nhất từ scores và cập nhật state
    const categories = Array.from(new Set(scores.map((score) => score.categoryId.name)));
    setUniqueCategories(categories);
  }, [scores]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

    const filteredScore = scores.filter((m) =>
    m.majorId.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );


  return (
    <>
      <ToastContainer />
      <h2 className="text-center text-blue-700 font-bold mb-5 mt-2">
        Quản Lý Điểm
      </h2>

      <div>
        {uniqueCategories.map((categoryName) => (
          <Button
            variant="warning"
            className="m-2"
            key={categoryName}
            onClick={() => handleCategoryClick(categoryName)}
          >
            {categoryName}
          </Button>
        ))}
      </div>
      <ModalCreateScore loadScores={loadScores}/>

      <Table className="border-black border-2" striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            <th>Tên ngành</th>
            <th>Loại điểm</th>
            {uniqueYears.map((year) => (
              <th key={year}>{year}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {uniqueCategories
            .filter((categoryName)=> !selectedCategory || categoryName === selectedCategory)
            .map((categoryName) => {
              return Object.values(dataByMajor).map((majorData) => {
                const filteredMajorScores = filteredScore.filter((score) => {
                  return (
                    score.categoryId.name === categoryName &&
                    score.majorId.name === majorData.major
                  );
                });
                
                if (filteredMajorScores.length === 0) {
                  return null; // Không hiển thị nếu không có điểm tương ứng
                }        

                if (majorData.categoryId === categoryName) {
                  return (
                    <tr key={majorData.major}>
                      <td>{majorData.major}</td>
                      <td>{majorData.categoryId}</td>
                      {uniqueYears.map((year) => (
                        <td key={year}>
                          {majorData.scores[year] || "-"}{" "}
                          {/* Hiển thị điểm tương ứng hoặc dấu gạch nếu không có điểm */}
                        </td>
                      ))}
                      <td className="p-2">
                        {/* <ModalUpdateFaculty loadFaculties={loadFaculties} faculties={faculties} setFaculties={setFaculties} faculty={faculty} /> */}
                        <Button className="w-100"  
                                variant="danger"
                                onClick={() => showDeleteConfirmation(majorData.major)}
                                >
                          Xóa
                        </Button>
                       </td>
                    </tr>
                  );
                }
               
                else {
                  return null;
                }
              });
            })}
        </tbody>
      </Table>

      
    {/* Modal xác nhận xóa */}
    <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa điểm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="selectYear">
            <Form.Label>Chọn năm để xóa điểm:</Form.Label>
            <Form.Control
              as="select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Chọn năm</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          Bạn có chắc chắn muốn xóa điểm cho năm {selectedYear}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageScore