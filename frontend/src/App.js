import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from 'react-router-dom';

import {Switch} from "react-bootstrap";
import Bus from './Pages/Bus';
import Employee from "./Pages/Employee";
import Login from "./Pages/Login";
import Trip from "./Pages/Trip";
import User from "./Pages/User";
import Manager from "./Pages/Manager";
import Navigation from "./Pages/Navigation";
import HomePage from "./Pages/HomePage";


function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Navigation/>
                <main className="main-content">
                    <Switch>
                        <Route path="/" href = {null}/>
                        <Route path="/HomePage" href = {HomePage}/>
                        <Route path="/Login" component={Login}/>
                        <Route path="/Buses" component={Bus}/>
                        <Route path="/Employees" component={Employee}/>
                        <Route path="/Trips" component={Trip}/>
                        <Route path="/Users" component={User}/>
                        <Route path="/Managers" component={Manager}/>

                    </Switch>
                </main>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;
