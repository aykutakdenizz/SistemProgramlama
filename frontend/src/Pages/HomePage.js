import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";



class HomePage extends Component {


    render() {
        return (
            <React.Fragment>
                <Navbar bg="light">
                    <Navbar.Brand href="Login">Login</Navbar.Brand>
                </Navbar>
                <br />
                <Navbar bg="light">
                    <Navbar.Brand href="Buses">Buses</Navbar.Brand>
                </Navbar>
                <br />
                <Navbar bg="light">
                    <Navbar.Brand href="Employees">Employees</Navbar.Brand>
                </Navbar>
                <br />
                <Navbar bg="light">
                    <Navbar.Brand href="Trips">Trips</Navbar.Brand>
                </Navbar>
                <br />
                <Navbar bg="light">
                    <Navbar.Brand href="Users">Users</Navbar.Brand>
                </Navbar>
                <br />
                <Navbar bg="light">
                    <Navbar.Brand href="Managers">Managers</Navbar.Brand>
                </Navbar>
                <br />
                <br />
            </React.Fragment>


        );

    }
}


export default HomePage;

