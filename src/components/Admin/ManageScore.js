import { ToastContainer } from "react-toastify"
import Apis, { authApi, endpoints } from "../../configs/Apis";
import { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../Toast/Notification";
import { Button, Form, Modal, Table } from "react-bootstrap";
import ModalCreateScore from "./ModalCreateScore";
import ModalUpdateScore from "./ModalUpdateScore";

const ManageScore = ( {searchKeyword} ) => {
  const [scores, setScores] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [dataByMajor, setDataByMajor] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [uniqueCategories, setUniqueCategories] = useState([]);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState({
    majorname: "",
    categoryId: "",
    selectedYear: "",
  });

  const openDeleteModal = (majorname, categoryId, scores ) => {
    setDeleteData({ majorname, categoryId, scores  });
    setShowDeleteModal(true);
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

  const handleDelete = async (scoreId) => {
    try {
      let res = await authApi().delete(endpoints.delete_score(scoreId));
      toastSuccess("Xóa thành công")
      loadScores()  
    } catch (ex) {
      console.error(ex);
      toastError("Xóa thất bại");
    }
  };

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
      const scoreId = score.id; // Assuming that your score object has an "id" property
        data[key].scores[year] = {
          scoreValue: scoreValue,
          scoreId: scoreId, // Include the score ID here
        };
      // console.log(data[key].scores[year]);
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
                          {majorData.scores[year] ? majorData.scores[year].scoreValue : "-"}{" "}
                          {/* Hiển thị điểm tương ứng hoặc dấu gạch nếu không có điểm */}
                        </td>
                      ))}
                      <td className="p-2">
                        <ModalUpdateScore loadScores={loadScores} majorData_major={majorData.major} majorData_categoryId={majorData.categoryId} major_scores={majorData.scores} />
                        <Button className="w-100"  
                                variant="danger"
                                onClick={() => openDeleteModal(majorData.major, majorData.categoryId, majorData.scores )}
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Xác nhận xóa</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group controlId="deleteYearSelect">
      <Form.Label>Chọn năm</Form.Label>
      <Form.Control
        as="select"
        value={deleteData.selectedYear}
        onChange={(e) =>
          setDeleteData({
            ...deleteData,
            selectedYear: e.target.value,
          })
        }
      >
        <option value="">Chọn năm</option>
        {uniqueYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
    <p>
      Bạn có chắc muốn xóa điểm cho {deleteData.majorname} - {deleteData.categoryId} năm {deleteData.selectedYear}?
    </p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
      Hủy
    </Button>
    <Button
      variant="danger"
      onClick={() => {
        const selectedYear = deleteData.selectedYear;
        const scores = deleteData.scores;
        // Thực hiện xóa ở đây, sử dụng thông tin từ deleteData
        if (scores && scores[selectedYear]) {
          const scoreId = scores[selectedYear].scoreId;
          console.log(scoreId);
          // Thực hiện xóa ở đây, sử dụng scoreId
          handleDelete(scoreId);
      
          setShowDeleteModal(false);
        } else {
          // Xử lý trường hợp không tìm thấy điểm theo năm
          console.error("Không tìm thấy điểm cho năm đã chọn");
        }
      }}
    >
      Xóa
    </Button>
  </Modal.Footer>
</Modal>
    </>
  );
};

export default ManageScore