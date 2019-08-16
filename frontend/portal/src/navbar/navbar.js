
import React from 'react';
import './navbar.css';
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';
import {Link, BrowserRouter} from 'react-router-dom';
import axios from 'axios';

class NavbarComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          name: '',
        }
    }
   
    componentDidMount(){
        axios.get('/user')
        .then(response => {
            this.setState({

                name : response.data[1] ,
            })
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        window.location = "/";
      }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Nav.Link href="/login">Login
                </Nav.Link>             
              </li>
              <li className="nav-item">
                <Nav.Link href="/register">Register</Nav.Link>
              </li>
            </ul>
          );
      
          const userLink = (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Nav.Link href="/profile"><i class="fa fa-user-circle fa-2x" aria-hidden="true"></i></Nav.Link>
              </li>
              <li>
                <Nav.Link href="/profile" className="nav-link">
                {this.state.name}
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link href="" onClick={this.logOut.bind(this)} className="nav-link">
                  Logout
                </Nav.Link>
              </li>
            </ul>
          );
          
        return (
            <React.Fragment>
                
                <Navbar bg="dark" expand="lg"> 
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/"><i class="fa fa-home fa-2x" aria-hidden="true"></i></Nav.Link>
                        <Nav.Link style={{fontWeight:'bold', fontSize:'1.5em'}}>Quizzinga</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Nav.Link href="#"><i class="fa fa-search" aria-hidden="true"></i></Nav.Link>
                    </Form>
                    {/* <Nav.Link href ="#"><i class="fa fa-sign-out" aria-hidden="true"></i></Nav.Link> */}
                    {localStorage.usertoken && localStorage.usertoken != null ? 
                      userLink : loginRegLink}
                    </Navbar.Collapse>
                </Navbar>          
    </React.Fragment>
        )};
}

export default NavbarComponent;