import React, {Component} from 'react';
import {connect} from "react-redux";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {addTrip, deleteTrip, fetchTrips, findTrip, updateTrip} from "../Actions/TripAction";

let token = null;

class Employee extends Component {

    componentDidMount() {
        token = localStorage.getItem("token");
        this.props.fetchTrips(token);
    }

    render() {
        const tripList = this.props.tripReducer.Trips.map(trip => {
                return (
                    <tr key={trip.Id} className="event__list-item">
                        <td>{trip.Id}</td>
                        <td>{trip.Is_Active}</td>
                        <td>{trip.Destination}</td>
                        <td>{trip.Departure}</td>
                        <td>{trip.Departure_Time}</td>
                        <td>{trip.Bus_Id}</td>
                        <td>{trip.Driver_Id}</td>
                        <td>{trip.Payment}</td>
                    </tr>

                )
            }
        );
        return (
            <React.Fragment>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Trip Id</th>
                        <th>Trip Is_Active</th>
                        <th>Trip Destination</th>
                        <th>Trip Departure</th>
                        <th>Trip Departure_Time</th>
                        <th>Trip Bus_Id</th>
                        <th>Trip Driver_Id</th>
                        <th>Trip Payment</th>
                    </tr>
                    </thead>
                    <tbody>{tripList}</tbody>
                </Table>
                <Button onClick={() => {this.props.deleteTrip(token,6, this.props.tripReducer.Trips);}} >SIL</Button>
                <Button onClick={() => {this.props.addTrip(token,
                    {Is_Active: true,
                        Destination: "IST",
                        Departure: "ANK",
                        Departure_Time: new Date().toISOString(),
                        Bus_Id: 1,
                        Driver_Id: 1,
                        Payment: "99"}, this.props.tripReducer.Trips);}} >ADD</Button>
                <Button onClick={() => {this.props.updateTrip(token,
                    {Id:19,Is_Active: true,
                        Destination: "IST2",
                        Departure: "ANK2",
                        Departure_Time: new Date().toISOString(),
                        Bus_Id: 1,
                        Driver_Id: 1,
                        Payment: "77"}, this.props.tripReducer.Trips);}} >UPDATE</Button>
                <Button onClick={() => {this.props.findTrip(token,1);}} >FIND</Button>
            </React.Fragment>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        tripReducer: state.tripReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrips: (token) => {
            dispatch(fetchTrips(token));
        },
        updateTrip: (token, trip ,trips) => {
            dispatch(updateTrip(token, trip ,trips));
        },
        deleteTrip: (token, tripId ,trips) => {
            dispatch(deleteTrip(token, tripId ,trips));
        },
        addTrip: (token, trip, trips) => {
            dispatch(addTrip(token, trip, trips));
        },
        findTrip: (token, tripId) => {
            dispatch(findTrip(token, tripId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);

