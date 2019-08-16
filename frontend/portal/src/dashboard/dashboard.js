import React from 'react';
import NavbarComponent from '../navbar/navbar';
import {Container, Row, Col} from 'react-bootstrap';
import PreviousContests from './previous';
import OngoingContests from './ongoing';
import UpcomingContests from './upcoming';
import "./dashboard.css";
import axios from 'axios';
import {
    BrowserRouter,
    Route,
    Switch,
  } from 'react-router-dom';
import CreateQuestionBank from '../create-quiz/create-quiz'

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            previouscontestdata : [],
            futurecontestdata : [],
             ongoingcontestdata: []
            
        }
    }

    componentDidMount(){
        axios.get('user/dashboard')
        .then(response => {
            this.setState({
                previouscontestdata : response.data[0],
                futurecontestdata : response.data[1],
                ongoingcontestdata: response.data[2]
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    render(){
        return (

            <React.Fragment>
                <NavbarComponent/>
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <PreviousContests
                                previouscontest = {this.state.previouscontestdata}
                                />
                            </Col>
                            
                            <Col>
                                <UpcomingContests
                                upcomingcontest = {this.state.futurecontestdata}
                                />
                            </Col>
                            </Row>  
                            <Row>
                            <Col>
                                <OngoingContests
                                ongoingcontest = {this.state.ongoingcontestdata}
                                />
                            </Col>
                             </Row>                
                    </Container>
                </div>

                <BrowserRouter>
                    <Switch>
                        <Route exact path="/startquiz/1"  component={CreateQuestionBank} />
                    </Switch>
                </BrowserRouter>
                
            </React.Fragment>

        )
    }
}

export default Dashboard;