import { useEffect, useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import Apis, { endpoints } from "../configs/Apis"
import { Link } from "react-router-dom"

const Faculty = () => {
    const [faculties, setFaculties] = useState([])
    useEffect(() => {
        const loadFaculty = async () => {
            let res = await Apis.get(endpoints['faculties'])
            setFaculties(res.data)
        }
        loadFaculty()
    },[])

    const generateFacultyPath = (facultyName) => {
        return facultyName.toLowerCase().replace(/\s+/g, '-');
      };
      

    return <>
    <h2 className="text-center text-blue-700 font-bold">Thông tin ngành - khoa</h2>
    <Col xs={12} md={12}>
        <Row xs={1} md={2} className="g-4">
        {faculties.map(p => {
            const facultyPath = generateFacultyPath(p.name)
            return <Col key={p.id} xs="12" md={5} className="mt-5 ml-12">
            <Link to={`/khoa/${facultyPath}`}>
                    <Card.Img className="mb-10" variant="top" src={p.image_url} />
                </Link>
                <Card.Title className="text-center">{p.name}</Card.Title>
        </Col>
        })}
        </Row>
    </Col>
    </>
}   

export default Faculty