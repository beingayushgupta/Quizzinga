import React from 'react';
import NavbarComponent from '../navbar/navbar';
import './quiz.css';
import { Container, Card, Row, Table, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

class QuizComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quiz : []
        }
    }

    componentDidMount(){
        axios.get('user/myQuiz')
        .then(response => {
            console.log(response);
            this.setState({
                quiz : response.data
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
                            <h3>My Quizzes</h3>
                        </Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Link to="/quiz/create"><i class="plusicon fa fa-plus fa-2x" aria-hidden="true"></i></Link>
                        </Col>
                    </Row>
                    <Row>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Started On</th>
                                        <th>Ended On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {Object.entries(this.state.quiz).map(([index, quiz]) => 
                                        (<tr>
                                        <th>{++index}</th>
                                        <th>{quiz[1]}</th>
                                        <th>{quiz[2]}</th>
                                        <th>{quiz[3]}</th> 
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
export default QuizComponent;
