import React from 'react';
import {Card, Table, Button} from 'react-bootstrap';
import { participate } from '../navbar/UserFunctions'


class UpcomingContests extends React.Component {
    constructor (props){
        super(props);
        this.state={
            u_id:'',
            quiz_id:''
        }
    }

    Register(e) {
    e.preventDefault()
    console.log(this);
    const entry = {
      u_id: '',
      quiz_id: ''
    }
    console.log(entry.u_id);
    participate(entry).then(res => {
      if (!res.error) {
        //this.props.history.push(`/dashboard`)
      }
    })
  }

    render(){
        return (

            <Card>
                <Card.Body>
                    <Card.Title>Upcoming Contest</Card.Title>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Contest</th>
                                <th>Starting On</th>
                                <th>Ending On</th>
                                <th>Register</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.upcomingcontest.map(upcomingcontest =>
                                (
                                    <tr>
                                        <td>{upcomingcontest[1]}</td>
                                        <td>{upcomingcontest[2]}</td>
                                        <td>{upcomingcontest[3]}</td>
                                        <td><Button variant="secondary" onClick={this.Register.bind(this)} size="sm">Register</Button></td>
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