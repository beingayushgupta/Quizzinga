import React from 'react';
import ReactDOM from 'react-dom';
import './conduct-quiz.css';
import { Container, Col, Card, Row, Button } from 'react-bootstrap';
import profile from '../assets/profile.gif';
import { Agent } from 'http';


class QuizConduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questions : [
                {
                    "question_id" : 1,
                    "question_name": "What is your name?",
                    "option1" : 'a',
                    "option2" : 'b',
                    "option3" : 'c',
                    "option4" : 'd',
                },
                {
                    "question_id" : 2,
                    "question_name": "What is my name?",
                    "option1" : 'a',
                    "option2" : 'b',
                    "option3" : 'c',
                    "option4" : 'd',
                },
                {
                    "question_id" : 3,
                    "question_name": "What is her name?",
                    "option1" : 'a',
                    "option2" : 'b',
                    "option3" : 'c',
                    "option4" : 'd',
                },
                {
                    "question_id" : 4,
                    "question_name": "What is your name?",
                    "option1" : 'a',
                    "option2" : 'b',
                    "option3" : 'c',
                    "option4" : 'd',
                },
                {
                    "question_id" : 5,
                    "question_name": "What is your name?",
                    "option1" : 'a',
                    "option2" : 'b',
                    "option3" : 'c',
                    "option4" : 'd',
                }
            ],
            active_question : {
                1 : true,
                2 : false,
                3 : false,
                4 : false,
                5 : false,
            }
        }
    }

    componentDidMount(){
        this.setState({
            questions :  [
                {
                    "question_id" : 1,
                    "question_name": "What is your name?",
                    "option1" : 'a',
                    "option2" : 'b',
                    "option3" : 'c',
                    "option4" : 'd',
                },
                {
                    "question_id" : 2,
                    "question_name": "What is my name?",
                    "option1" : 'a',
                    "option2" : 'b',
                    "option3" : 'c',
                    "option4" : 'd',
                },
                {
                    "question_id" : 3,
                    "question_name": "What is her name?",
                    "option1" : 'a',
                    "option2" : 'b',
                    "option3" : 'c',
                    "option4" : 'd',
                },
                {
                    "question_id" : 4,
                    "question_name": "What is your name?",
                    "option1" : 'a',
                    "option2" : 'b',
                    "option3" : 'c',
                    "option4" : 'd',
                },
                {
                    "question_id" : 5,
                    "question_name": "What is your name?",
                    "option1" : 'a',
                    "option2" : 'b',
                    "option3" : 'c',
                    "option4" : 'd',
                }
            ]
        });
    }

    

    getnextQuestion(question_id){
        let temp_state = this.state;
        let temp_question = temp_state.active_question;
        let len = 0
        for (let i in temp_question) ++len;
        temp_question[question_id] = false;
        if(question_id++ >= len){
            question_id = 1;
        }
        temp_question[question_id] = true;
        this.setState(prevState => ({
            active_question:temp_question
        }));
    }

    getSelectedQuestion(question_id){
        let temp_state = this.state;
        let temp_question = temp_state.active_question;
        for(let i in temp_question) temp_question[i] = false;
        temp_question[question_id] = true;
        this.setState({
            active_question : temp_question
        })
    }

    render() {
        return(
            <p>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <Card className="question-left">
                            {this.state.questions.map(question =>
                                <div className={"question" + question.question_id} 
                                style={{ display: (this.state.active_question[question.question_id] == true? 'block' : 'none') }}>
                                    <Container>
                                        <Row>
                                            <img className="question-image"src={profile}></img>  
                                        </Row>
                                        <Row className="row-image">
                                            <Col sm={1}>
                                                {question.question_id}
                                            </Col>
                                            <Col sm={11}>
                                                {question.question_name}
                                            </Col>
                                        </Row>
                                        <div className="answers">
                                            
                                            <Row>
                                                <p> {question.option1} </p>
                                            </Row>
                                            <Row>
                                                <p> {question.option2} </p>
                                            </Row>
                                            <Row>
                                                <p> {question.option3} </p>
                                            </Row>
                                            <Row>
                                                <p> {question.option4} </p>
                                            </Row>
                                        </div>
                                        <Row>
                                            <Button className="next-button" 
                                            onClick={(e) => this.getnextQuestion(question.question_id)} variant="secondary" size="sm">Next</Button>
                                        </Row>
                                    </Container>
                                </div>
                            )}

                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card className="all-questions">
                                <Row>
                                {this.state.questions.map(question =>
                                    <Col sm={3}>
                                            <div>                                        
                                                <button className="button button5" 
                                                onClick={(e) => this.getSelectedQuestion(question.question_id)}>{question.question_id}</button>
                                            </div>
                                     </Col>
                                )}
                                </Row>
                           </Card>                            
                        </Col>
                    </Row>
                </Container>
            </p>
        )
    }
}


export default QuizConduct;