import React from 'react';
import {NavLink} from 'react-router-dom';

import './Navigation.css';
import Navbar from "react-bootstrap/Navbar";


const Navigation = props => (
    <header className="main-navigation">
        <div className="main-navigation_logo">
            <Navbar>
                <Navbar.Brand>
                    <h1 className="main-navigation_logo_name"><NavLink to="/MainPage">SYSTEM</NavLink></h1>
                </Navbar.Brand>
            </Navbar>
        </div>
        <nav className="main-navigation_items">
            <ul>
                <li><NavLink to="/Buses">Bus</NavLink></li>
                <li><NavLink to="/Employees">Employee</NavLink></li>
                <li><NavLink to="/Login">Login</NavLink></li>
                <li><NavLink to="/Managers">Manager</NavLink></li>
                <li><NavLink to="/Trips">Trip</NavLink></li>
                <li><NavLink to="/Users">User</NavLink></li>
            </ul>
        </nav>
    </header>

);

export default Navigation;