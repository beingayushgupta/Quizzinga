import React from 'react';
import "./questionbank.css";
import NavbarComponent from '../navbar/navbar';
import { Container, Card, Row, Table, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';


class QuestionBank extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question_banks : {}
        }
    }


    componentDidMount(){
        axios.get('/user/QuestionBank')
        .then(response => {
            console.log(response);
            this.setState({
                question_banks : response.data,
            })
        })
        .catch(error => {
            console.log(error);
        });
    }
    render(){
        return(
            <React.Fragment>
            <NavbarComponent/>
            <Container>
                <Card>
                    <Row>
                        <Col  md={4}>
                            <h3>My Question Banks</h3>
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
                                        <th>No.</th>
                                        <th>Name</th>    
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(this.state.question_banks).map(([index, question_bank]) => 
                                        (<tr>
                                        <th>{++index}</th>
                                        <th>{question_bank[1]}</th>
                                        <th><a href="questionbank/id/edit"><i class="fa fa-pencil edit" aria-hidden="true"></i></a></th>
                                        </tr>)
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Row>
                </Card>
            </Container>
        </React.Fragment>
        )
    }
}
export default QuestionBank;