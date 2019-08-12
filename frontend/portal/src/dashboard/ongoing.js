import React from 'react';
import {Card, Table, Button} from 'react-bootstrap';

import {
    BrowserRouter,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';
  


class OngoingContests extends React.Component {
    constructor (props){
        super(props);
    }

    render(){
        return (

            <Card>
                <Card.Body>
                    <Card.Title>Live Contest</Card.Title>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Contest</th>
                                <th>Ending On</th>
                                <th>Start</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.ongoingcontest.map(contest =>
                                (
                                    <tr>
                                        <td>{contest.contest_id}</td>
                                        <td>{contest.contest_name}</td>
                                        <td>{contest.enddate}</td>
                                        <td><Button variant="secondary" size="sm"><Link to="/quiz/1/conduct">Start</Link></Button></td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        )
    }
}

export default OngoingContests;