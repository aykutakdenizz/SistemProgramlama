import React, {Component} from 'react';
import {connect} from "react-redux";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {addTrip, deleteTrip, fetchTrips, findTrip, setErrorFalseTrip, updateTrip} from "../Actions/TripAction";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

let token = null;

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
            add: false,
        };
        this.Is_ActiveElement = React.createRef();
        this.DestinationElement = React.createRef();
        this.DepartureElement = React.createRef();
        this.Departure_TimeElement = React.createRef();
        this.Bus_IdElement = React.createRef();
        this.Driver_IdElement = React.createRef();
        this.PaymentElement = React.createRef();
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const trip = {
            Id: this.props.tripReducer.SelectedTrip.Id,
            Is_Active: (this.Is_ActiveElement.current.value === "") ? (this.props.tripReducer.SelectedTrip.Is_Active) : (this.Is_ActiveElement.current.value),
            Destination: (this.DestinationElement.current.value === "") ? (this.props.tripReducer.SelectedTrip.Destination) : (this.DestinationElement.current.value),
            Departure: (this.DepartureElement.current.value === "") ? (this.props.tripReducer.SelectedTrip.Departure) : (this.DepartureElement.current.value),
            Departure_Time: (this.Departure_TimeElement.current.value === "") ? (this.props.tripReducer.SelectedTrip.Departure_Time) : (this.Departure_TimeElement.current.value),
            Bus_Id: (this.Bus_IdElement.current.value === "") ? (this.props.tripReducer.SelectedTrip.Bus_Id) : (this.Bus_IdElement.current.value),
            Driver_Id: (this.Driver_IdElement.current.value === "") ? (this.props.tripReducer.SelectedTrip.Driver_Id) : (this.Driver_IdElement.current.value),
            Payment: (this.PaymentElement.current.value === "") ? (this.props.tripReducer.SelectedTrip.Payment) : (this.PaymentElement.current.value),
        };
        this.props.updateTrip(token, trip, this.props.tripReducer.Trips);
        this.setState({update: false});
    };
    submitHandlerAdd = async (event) => {
        event.preventDefault();
        const trip = {
            Is_Active: (this.Is_ActiveElement.current.value === "") ? true : (this.Is_ActiveElement.current.value),
            Destination: (this.DestinationElement.current.value === "") ? null : (this.DestinationElement.current.value),
            Departure: (this.DepartureElement.current.value === "") ? null : (this.DepartureElement.current.value),
            Departure_Time: (this.Departure_TimeElement.current.value === "") ? null : (this.Departure_TimeElement.current.value),
            Bus_Id: (this.Bus_IdElement.current.value === "") ? null : (this.Bus_IdElement.current.value),
            Driver_Id: (this.Driver_IdElement.current.value === "") ? null : (this.Driver_IdElement.current.value),
            Payment: (this.PaymentElement.current.value === "") ? null : (this.PaymentElement.current.value),
        };
        this.props.addTrip(token, trip, this.props.tripReducer.Trips);
        this.setState({add: false});
    };

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
                        <td>
                            <ButtonGroup vertical>
                                <Button variant="success" onClick={() => {
                                    this.setState({update: true});
                                    this.props.tripReducer.SelectedTrip = trip;
                                }}>Update</Button>
                                <Button variant="danger" onClick={() => {
                                    this.props.deleteTrip(token, trip.Id, this.props.tripReducer.Trips);
                                }}>Delete</Button>
                                <Button variant="warning" disabled={!trip.Is_Active} onClick={() => {
                                }}>Buy</Button>
                            </ButtonGroup>
                        </td>
                    </tr>

                )
            }
        );
        return (
            <React.Fragment>
                <Table responsive striped bordered hover>
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
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{tripList}</tbody>
                </Table>
                <Button onClick={() => {
                    this.setState({add: true})
                }}>ADD NEW TRIP</Button>


                <Modal show={this.state.update}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({update: false});
                    }}>
                        <Modal.Title>Trip Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Update a trip</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandler}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Trip Is_active</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.tripReducer.SelectedTrip === null) ? ("Please enter active") : (this.props.tripReducer.SelectedTrip.Is_Active)}
                                                                  ref={this.Is_ActiveElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Destination</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.tripReducer.SelectedTrip === null) ? ("Please enter Destination") : (this.props.tripReducer.SelectedTrip.Destination)}
                                                                  ref={this.DestinationElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Departure</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.tripReducer.SelectedTrip === null) ? ("Please enter Departure") : (this.props.tripReducer.SelectedTrip.Departure)}
                                                                  ref={this.DepartureElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Departure Time</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.tripReducer.SelectedTrip === null) ? ("Please enter Departure Time") : (this.props.tripReducer.SelectedTrip.Departure_Time)}
                                                                  ref={this.Departure_TimeElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Id</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.tripReducer.SelectedTrip === null) ? ("Please enter Bus Id") : (this.props.tripReducer.SelectedTrip.Bus_Id)}
                                                                  ref={this.Bus_IdElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Driver Id</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.tripReducer.SelectedTrip === null) ? ("Please enter Driver Id") : (this.props.tripReducer.SelectedTrip.Driver_Id)}
                                                                  ref={this.Driver_IdElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Payment</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.tripReducer.SelectedTrip === null) ? ("Please enter Payment") : (this.props.tripReducer.SelectedTrip.Payment)}
                                                                  ref={this.PaymentElement}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col md="auto">
                                            <Button variant="primary" type="submit">
                                                Update
                                            </Button>
                                        </Col>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.add}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({add: false});
                    }}>
                        <Modal.Title>Trip Add</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Add a trip</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandlerAdd}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Trip Is_active</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please enter active"
                                                                  ref={this.Is_ActiveElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Destination</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please enter Destination"
                                                                  ref={this.DestinationElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Departure</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please enter Departure"
                                                                  ref={this.DepartureElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Departure Time</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please enter Departure Time"
                                                                  ref={this.Departure_TimeElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Id</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please enter Bus Id"
                                                                  ref={this.Bus_IdElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Driver Id</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please enter Driver Id"
                                                                  ref={this.Driver_IdElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Payment</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please enter Payment"
                                                                  ref={this.PaymentElement}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col md="auto">
                                            <Button variant="primary" type="submit">
                                                Add
                                            </Button>
                                        </Col>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </Modal.Body>
                </Modal>


                <Modal show={this.props.tripReducer.Error}>
                    <Modal.Header closeButton onClick={this.props.setErrorFalseTrip}>
                        <Modal.Title>Uppss, somethings went wrong...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.tripReducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.setErrorFalseTrip}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
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
        updateTrip: (token, trip, trips) => {
            dispatch(updateTrip(token, trip, trips));
        },
        deleteTrip: (token, tripId, trips) => {
            dispatch(deleteTrip(token, tripId, trips));
        },
        addTrip: (token, trip, trips) => {
            dispatch(addTrip(token, trip, trips));
        },
        findTrip: (token, tripId) => {
            dispatch(findTrip(token, tripId));
        },
        setErrorFalseTrip: () => {
            dispatch(setErrorFalseTrip());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);

