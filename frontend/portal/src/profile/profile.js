import React from 'react';
import { Row, Col, Table, Card, Container, Button, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import profile from '../assets/profile.gif';
import './profile.css';
import NavbarComponent from '../navbar/navbar';
import axios from 'axios';

class ProfileComponent extends React.Component{

     constructor(props){
        super(props);
        this.state = {
            quiz : []
        }
    }

    componentDidMount(){
        axios.get('user/profile')
        .then(response => {
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
                <Row>
                    <Col xs={6} md={4}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <img className="profile-name"src={profile}></img>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col>
                                    <Link to="/quiz"><Button variant="secondary" size="sm">Quiz's</Button></Link>
                                    </Col>
                                    <Col>
                                    <Link to="/questionbank"><Button variant="secondary" size="sm">Question Bank</Button></Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={8}>
                        <Card>
                            <Card.Body>
                            <h4>Quiz You have participated in:</h4>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Started on</th>
                                            <th>Ended On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(this.state.quiz).map(([index, quiz]) => 
                                        (<tr>
                                        <th>{++index}</th>
                                        <th>{quiz[5]}</th>
                                        <th>{quiz[6]}</th>
                                        <th>{quiz[7]}</th> 
                                        </tr>)
                                    )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </React.Fragment>               
        )
    }
}

export default ProfileComponent;