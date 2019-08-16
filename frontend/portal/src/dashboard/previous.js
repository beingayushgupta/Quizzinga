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
                            <th>Name</th>
                            <th>Started On</th>
                            <th>Ended On</th>
                        </tr>
                        </thead>
                         <tbody>
                        {this.props.previouscontest.map(previouscontest =>
                            (
                                <tr>
                                    <td>{previouscontest[5]}</td>
                                    <td>{previouscontest[6]}</td>
                                    <td>{previouscontest[7]}</td>
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