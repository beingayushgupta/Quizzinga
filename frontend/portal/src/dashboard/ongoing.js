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
                    <Card.Title>Registered Contest</Card.Title>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                
                                <th>Contest</th>
                                <th>Starting On</th>
                                <th>Ending On</th>
                                <th>Start</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.ongoingcontest.map(contest =>
                                ( 
                                    <tr>
                                        
                                        <td>{contest[5]}</td>
                                        <td>{contest[6]}</td>
                                        <td>{contest[7]}</td>
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