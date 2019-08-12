import React from 'react';
import "./questionbank.css";
import { Container, Card, Row, Table, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';


class QuestionBank extends React.Component {
    render(){
        return(
            <Container>
                <Card>
                    <Row>
                        <Col  md={4}>
                            <h3>My Question Bank's</h3>
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Link to="/questionbank/create"><i class="plusicon fa fa-plus fa-2x" aria-hidden="true"></i></Link>
                        </Col>
                    </Row>
                    <Row>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Ended On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <th>Name1</th>
                                        <th>asdad</th>
                                    </tr>
                                    <tr>
                                        <th>1</th>
                                        <th>Name1</th>
                                        <th>asdad</th>
                                    </tr>
                                    <tr>
                                        <th>1</th>
                                        <th>Name1</th>
                                        <th>asdad</th>
                                    </tr>

                                </tbody>
                            </Table>
                        </Card.Body>
                    </Row>
                </Card>
            </Container>
        )
    }
}
export default QuestionBank;