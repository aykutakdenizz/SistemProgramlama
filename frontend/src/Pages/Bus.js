import React, {Component} from 'react';
import {connect} from "react-redux";

import {deleteBus, fetchBuses, updateBus, addBus, findBus} from "../Actions/BusActions";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
let token = null;

class Bus extends Component {

    componentDidMount() {
        console.log("REDUCER TOKEN:"+this.props.mainReducer.Token);
        token = localStorage.getItem("token");
        this.props.fetchBuses(token);
    }

    render() {
        const busList = this.props.busReducer.Buses.map(bus => {
                return (
                    <tr key={bus.Id} className="event__list-item">
                        <td>{bus.Id}</td>
                        <td>{bus.Plate}</td>
                        <td>{bus.Seat_Plan}</td>
                        <td>{bus.Empty_Seats}</td>
                    </tr>

                )
            }
        );
        return (
            <React.Fragment>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Bus Id</th>
                        <th>Bus Plate</th>
                        <th>Bus Seat_Plan</th>
                        <th>Bus Empty_Seats</th>
                    </tr>
                    </thead>
                    <tbody>{busList}</tbody>
                </Table>
                <Button onClick={() => {this.props.deleteBus(token,6, this.props.busReducer.Buses);}} >SIL</Button>
                <Button onClick={() => {this.props.addBus(token,
                    {Plate:"example",Seat_Plan:"A",Empty_Seats:["1A"]}, this.props.busReducer.Buses);}} >ADD</Button>
                <Button onClick={() => {this.props.updateBus(token,
                    {Id:8,Plate:"exampleB",Seat_Plan:"B",Empty_Seats:["1B"]}, this.props.busReducer.Buses);}} >UPDATE</Button>
                <Button onClick={() => {this.props.findBus(token,1);}} >FIND</Button>
            </React.Fragment>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        busReducer: state.busReducer,
        mainReducer: state.mainReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBuses: (token) => {
            dispatch(fetchBuses(token));
        },
        updateBus: (token, bus ,buses) => {
            dispatch(updateBus(token, bus ,buses));
        },
        deleteBus: (token, busId ,buses) => {
            dispatch(deleteBus(token, busId ,buses));
        },
        addBus: (token, bus, buses) => {
            dispatch(addBus(token, bus, buses));
        },
        findBus: (token, busId) => {
            dispatch(findBus(token, busId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bus);

