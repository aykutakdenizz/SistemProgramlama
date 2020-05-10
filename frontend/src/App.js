import React, {Component} from 'react';
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
import Ticket from "./Pages/Ticket";
import SignUp from "./Pages/SignUp";
import Redirect from "react-router-dom/es/Redirect";


class App extends Component {
    render(){
    return (
        <BrowserRouter>
            <React.Fragment>
                <Navigation/>
                {localStorage.getItem("login")==="false" && <Redirect to='/Login' />}
                <main className="main-content">
                    <Switch>
                        <Route path="/" component={null}/>
                        <Route path="/HomePage" component = {HomePage}/>
                        <Route path="/Login" component={Login}/>
                        <Route path="/Buses" component={Bus}/>
                        <Route path="/Employees" component={Employee}/>
                        <Route path="/Trips" component={Trip}/>
                        <Route path="/Users" component={User}/>
                        <Route path="/Managers" component={Manager}/>
                        <Route path="/Tickets" component={Ticket}/>
                        <Route path="/SignUp" component={SignUp}/>
                    </Switch>
                </main>
            </React.Fragment>
        </BrowserRouter>
    );}
}

export default App;
