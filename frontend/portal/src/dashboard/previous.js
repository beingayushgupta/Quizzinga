import React from 'react';
import {Card, Table} from 'react-bootstrap';




class PreviousContests extends React.Component {
    constructor (props){
        super(props);
    }

    render(){
        return (

            <Card>
                <Card.Body>
                    <Card.Title>Past Contest</Card.Title>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Ended On</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.previouscontest.map(previouscontest =>
                            (
                                <tr>
                                    <td>{previouscontest.contest_id}</td>
                                    <td>{previouscontest.contest_name}</td>
                                    <td>{previouscontest.enddate}</td>
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

export default PreviousContests;