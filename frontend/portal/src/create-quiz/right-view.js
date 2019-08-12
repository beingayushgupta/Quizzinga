import React from 'react';
import {Card, Row, Col, InputGroup} from 'react-bootstrap';
import "./create-quiz.css";
import profile from '../assets/profile.gif';

class Rightview extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fetching : false,
            selectedquestions : [],
        };
    }
    render(){
        return (
            <React.Fragment>
            <Card class="preview">
                {this.props.quizquestion.map(quizquestion =>
                    (
                        <Card.Body>
                            <Row>
                                <Col xs={4} md={2}>  
                                    {quizquestion.question_id}
                                </Col>
                                <Col xs={8} md={7} >
                                    <Row>
                                    {quizquestion.question_name}
                                    </Row>
                                    <Row>
                                    {quizquestion.option1}
                                    </Row>
                                    <Row>
                                    {quizquestion.option2}
                                    </Row>
                                    <Row>
                                    {quizquestion.option3}
                                    </Row>
                                    <Row>
                                    {quizquestion.option4}
                                    </Row>
                                </Col>
                                <Col xs={6} md={3}>
                                    <img style={{width:'6em', height:'4em'}}className="question-image"src={profile}></img>   
                                </Col>
                            </Row>
                            <Card.Text></Card.Text>
                        </Card.Body>
                    )
                )}                  
            </Card>
            </React.Fragment>
            
        );
    }
}

export default Rightview;