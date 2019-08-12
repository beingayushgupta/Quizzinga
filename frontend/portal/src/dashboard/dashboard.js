import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import PreviousContests from './previous';
import OngoingContests from './ongoing';
import UpcomingContests from './upcoming';
import "./dashboard.css";
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
            peviouscontestdata : [
                {
                "contest_id" : 1,
                "contest_name": "long challenge",
                "enddate" : "20-11-2016",
                },
                {
                    "contest_id" : 2,
                    "contest_name": "snack down",
                    "enddate" : "20-10-2016",
                },
                {
                    "contest_id" : 3,
                    "contest_name": "may cook off",
                    "enddate" : "20-5-2016",
                }
         ],

            futurecontestdata : [
                {
                    "contest_id" : 1,
                    "contest_name": "long challenge",
                    "startdate" : "20-11-2016",
                },
                {
                    "contest_id" : 2,
                    "contest_name": "snack down",
                    "startdate" : "20-10-2016",
                },
                {
                    "contest_id" : 3,
                    "contest_name": "codersbit",
                    "startdate" : "20-9-2016",
                },],

             ongoingcontestdata: [
                   {
                        "contest_id" : 1,
                        "contest_name": "long challenge",
                        "enddate" : "20-11-2016",
                    },
                    {
                        "contest_id" : 2,
                        "contest_name": "snack down",
                        "enddate" : "20-10-2016",
                    },
                    {
                        "contest_id" : 3,
                        "contest_name": "codersbit",
                        "enddate" : "20-9-2016",
                    },]
            
        }
    }

    render(){
        return (

            <React.Fragment>
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <PreviousContests
                                previouscontest = {this.state.peviouscontestdata}
                                />
                            </Col>
                            <Col>
                                <OngoingContests
                                ongoingcontest = {this.state.ongoingcontestdata}
                                />
                            </Col>
                            <Col>
                                <UpcomingContests
                                upcomingcontest = {this.state.futurecontestdata}
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