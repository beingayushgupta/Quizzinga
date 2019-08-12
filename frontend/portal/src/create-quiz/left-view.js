import React from 'react';
import {Card, DropdownButton, Dropdown, InputGroup, FormControl, Button,Row,Col} from 'react-bootstrap';
import "./create-quiz.css";

class Leftview extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            nameofdropown : "Question Set",
            disable: false,
            selectquestionset : null,
            numberofquestion : null,    
        };
    }
     

    onSelectingQuestionSet(questionset){
        this.setState({
            nameofdropown : "Question Set " + questionset,
            disable : true,
            selectquestionset : questionset,
        });
    }

    setNumberOfQuestion(e){
        this.setState({
            numberofquestion : e.target.value
        });
    }

    getQuestions(){
        console.log("QuestionSet" + this.state.selectquestionset);
        console.log("number of question" + this.state.numberofquestion);
        const data = [
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

        this.props.updateQuizQuestion(data);
    }

    render(){
        return (
            <Card class="leftcard">
                <Card.Body>
                    <Row>
                        <Col>
                            <DropdownButton id="dropdown-basic-button" title={this.state.nameofdropown}>
                                {this.props.questionSet.map(question =>
                                <Dropdown.Item onClick={(e) => this.onSelectingQuestionSet(question)}>Question Set {question}</Dropdown.Item> 
                                )}
                            </DropdownButton>
                        </Col>
                        <div style={{ display: (this.state.disable ? 'block' : 'none') }}>
                            <Col>
                            <InputGroup className="mb-3">
                                <FormControl placeholder="No. of Ques" value={this.state.numberofquestion} onChange={(e) =>
                                 this.setNumberOfQuestion(e)} aria-label="No. of Ques"
                                aria-describedby="basic-addon2"/>
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick= {(e)=> this.getQuestions()} ><i class="fa fa-arrow-right" aria-hidden="true"></i></Button>
                                </InputGroup.Append>
                            </InputGroup>
                            </Col>
                        </div>
                        
                    </Row>
                    
                </Card.Body>
                
            </Card>
        )
    }
}

export default Leftview;