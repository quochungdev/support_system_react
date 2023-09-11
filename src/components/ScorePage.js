import { useEffect, useState } from "react"
import { Button, Card, Col, Row, Table } from "react-bootstrap"
import Apis, { endpoints } from "../configs/Apis"
import { Link } from "react-router-dom"
import { toastError } from "./Toast/Notification"
import '../assets/CSS/Table.css'
const ScorePage = ( {searchKeyword}) => {
  const [scores, setScores] = useState([]);
  const [firstCategoryScores, setFirstCategoryScores] = useState([]);
  const [secondCategoryScores, setSecondCategoryScores] = useState([]);
  

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

  useEffect(() => {
    // Tạo danh sách cho category_id đầu tiên
    const firstCategory = scores.filter((score) => score.categoryId.id === 13  && score.majorId.name.toLowerCase().includes(searchKeyword.toLowerCase()));
    setFirstCategoryScores(firstCategory);

    // Tạo danh sách cho category_id thứ hai
    const secondCategory = scores.filter((score) => score.categoryId.id === 14  && score.majorId.name.toLowerCase().includes(searchKeyword.toLowerCase()));
    setSecondCategoryScores(secondCategory);
    
  }, [scores, searchKeyword]);

    // Tạo danh sách các major duy nhất từ firstCategoryScores hoặc secondCategoryScores
    const uniqueMajors = Array.from(
      new Set(
        firstCategoryScores.concat(secondCategoryScores).map((score) => score.majorId.name)
      )
    );
    
      // Lấy danh sách các năm duy nhất từ scores
      // loại bỏ các phần tử trùng lặp khỏi một mảng và tạo một mảng mới chỉ chứa các giá trị duy nhất
      const uniqueYears = Array.from(new Set(scores.map(score => score.year )));
    return  <>
    <h2 className="text-center text-blue-700 font-bold mb-5">Điểm trúng tuyển các năm</h2>

  <div className="border-black border-5 p-10">
      <div>
        <h4 className="text-xl text-blue-800 font-bold">ĐIỂM CHUẨN TRÚNG TUYỂN THEO PHƯƠNG THỨC ĐẠI HỌC CHÍNH QUY</h4>
        <div className="text-blue-800 ">TRƯỜNG ĐẠI HỌC MỞ THÀNH PHỐ HỒ CHÍ MINH</div>
        <Table className="border-black border-2" striped bordered hover size="sm">
          <thead >
            <tr className="text-center">
              <th>Tên ngành</th>
              {uniqueYears.map(year => (
                <th key={year}>{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {uniqueMajors.map((majorName) => (
                <tr key={majorName}>
                  <td>{majorName}</td>
                  {uniqueYears.map((year) => (
                    <td key={year}>
                      {firstCategoryScores
                        .filter((score) => score.majorId.name === majorName && score.year === year)
                        .map((filteredScore) => (
                          <div key={filteredScore.id}>{filteredScore.score}</div>
                        ))}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <div className="mt-5">
        <h4 className="text-xl text-blue-800 font-bold">ĐIỂM CHUẨN TRÚNG TUYỂN THEO PHƯƠNG THỨC XÉT TUYỂN HỌC BẠ</h4>
        <div className="text-blue-800 ">TRƯỜNG ĐẠI HỌC MỞ THÀNH PHỐ HỒ CHÍ MINH</div>
        <Table className="border-black border-2" striped bordered hover size="sm">
          <thead >
            <tr className="text-center">
              <th>Tên ngành</th>
              {uniqueYears.map(year => (
                <th key={year}>{year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueMajors.map((majorName) => (
                  <tr key={majorName}>
                    <td>{majorName}</td>
                    {uniqueYears.map((year) => (
                      <td key={year}>
                        {secondCategoryScores
                          .filter((score) => score.majorId.name === majorName && score.year === year)
                          .map((filteredScore) => (
                            <div key={filteredScore.id}>{filteredScore.score}</div>
                          ))}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
  </div>
  </>
}   

export default ScorePage