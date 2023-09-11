import React from "react";
import className from "classnames";
import { Col, Image, Row } from "react-bootstrap";

const Entry = ({ title, startedAt, thumbnail }) => (
  <li className="process">
    <Row>
    <Col md={4}>
      <Image src={thumbnail} />
    </Col>
    <Col md={8}>
      <span className="process-title text-blue-600">{title}</span>
      <span className="process-started-at">Bắt đầu lúc {startedAt}</span>
    </Col>
    </Row>
   
  </li>
);

export default Entry;
