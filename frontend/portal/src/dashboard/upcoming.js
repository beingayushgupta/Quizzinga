import React from 'react';
import {Card, Table, Button} from 'react-bootstrap';



class UpcomingContests extends React.Component {
    constructor (props){
        super(props);
    }

    render(){
        return (

            <Card>
                <Card.Body>
                    <Card.Title>Upcoming Contest</Card.Title>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Contest</th>
                                <th>Starting On</th>
                                <th>Register</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.upcomingcontest.map(upcomingcontest =>
                                (
                                    <tr>
                                        <td>{upcomingcontest.contest_id}</td>
                                        <td>{upcomingcontest.contest_name}</td>
                                        <td>{upcomingcontest.startdate}</td>
                                        <td><Button variant="secondary" size="sm">Register</Button></td>
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

export default UpcomingContests;