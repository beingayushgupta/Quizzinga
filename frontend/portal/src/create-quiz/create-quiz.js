import React from 'react';
import NavbarComponent from '../navbar/navbar';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Leftview from './left-view';
import Rightview from './right-view';
import "./create-quiz.css";


class CreateQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            QuestionSet : [1,2,3,4,5],
            QuizQuestion : [],
            // time :
        };    
    }
    
    
    //update time function
    updateQuizQuestion(quizQuestion){
       console.log("quizQuestion" + quizQuestion); 
        this.setState({
            QuizQuestion : quizQuestion,
        });
    }

    //more function for click of create quiz button jispe api call hogi and quiz questions and time backend ko jayega and wo chutiya store karega
    render(){
        return (
            <React.Fragment>
                <NavbarComponent/>
                <div>
                    <Container>
                        <Row>
                            <Col>
                            <Leftview
                            questionSet = {this.state.QuestionSet}
                            // props for time function updation like below
                            updateQuizQuestion = {(quizQuestion) => this.updateQuizQuestion(quizQuestion)}
                            />
                            </Col>
                            <Col>
                                <Rightview
                                quizquestion = {this.state.QuizQuestion}
                                />
                            </Col>
                        </Row>                       

                    </Container>
                    <Row>
                    <Col md={{ span: 2, offset: 5 }}>
                        <Button variant="outline-secondary" >Create Quiz</Button>
                    </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

export default CreateQuiz;