import React from 'react';
import NavbarComponent from '../navbar/navbar';
import { Card, Container, Row, Col, InputGroup, Button, FormControl } from 'react-bootstrap';
import './questionbank.css';

class CreateQuestionBank extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question_bank_name : null,
            questions : {},
        };
    }

    setquestionbankName(e){
        this.setState ({
            question_bank_name : e.target.value,
        })
    }

    // create the function to add question bank in backend with its name 

        render(){
            return (
                <React.Fragment>
                    <NavbarComponent/>
                        <Container>
                            <Row>
                                <Col>
                                    <Card>
                                       <InputGroup className="mb-3">
                                            <FormControl placeholder="Question bank name" value={this.state.question_bank_name} onChange={(e) =>
                                            this.setquestionbankName(e)} aria-label="Question bank name"
                                            aria-describedby="basic-addon2"/>
                                       </InputGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                </React.Fragment>


            )
        }
    }

export default CreateQuestionBank;