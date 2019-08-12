
import React from 'react';
import './navbar.css';
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';
import {Link, BrowserRouter} from 'react-router-dom';

class NavbarComponent extends React.Component {

    constructor(props){
        super(props);
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
                <a href="/login">Login
                </a>             
            </li>
              <li className="nav-item">
                <a href="/register">Register</a>
              </li>
            </ul>
          );
      
          const userLink = (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Nav.Link href="/profile"><i class="fa fa-user-circle fa-2x" aria-hidden="true"></i></Nav.Link>
              </li>
              <li className="nav-item">
                <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                  Logout
                </a>
              </li>
            </ul>
          );
          
        return (
            <React.Fragment>
                
                <Navbar bg="dark" expand="lg"> 
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/"><i class="fa fa-home fa-2x" aria-hidden="true"></i></Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
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