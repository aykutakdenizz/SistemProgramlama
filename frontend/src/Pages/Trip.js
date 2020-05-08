import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import {addTrip, deleteTrip, fetchTrips, findTrip, setErrorFalseTrip, updateTrip} from "../Actions/TripAction";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {addTicket, setErrorFalseTicket, setSuccessFalseTicket} from "../Actions/TicketAction";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {findBus, findBusWithTrip} from "../Actions/BusActions";
import {CSVLink} from "react-csv";
const DataTable = require('react-data-components').DataTable;

let token = null;

class Trip extends Component {
    constructor(props) {
        super(props);
        this.buttonsRender = this.buttonsRender.bind(this);
        this.buttonsRender2 = this.buttonsRender2.bind(this);
        this.buttonsRender3 = this.buttonsRender3.bind(this);
        this.state = {
            update: false,
            add: false,
            buy:false,
            selectedSeat:"Seat Num",
            sure:false,
            tripId:null,
            download:false,
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

    submitHandlerBuy = async (event) => {
        event.preventDefault();
        const ticket = {
            Trip_Id: this.props.tripReducer.SelectedTrip.Id,
            Seat:this.state.selectedSeat,
        };
        this.props.addTicket(token, ticket, this.props.ticketReducer.Tickets);
        this.setState({buy: false});
    };

    buttonsRender(id) {
        return (
            <ButtonGroup vertical>
                {(localStorage.getItem("Role")==="Manager")?(
                    <Button variant="success" onClick={() => {
                        this.setState({update: true});
                        this.props.findTrip(token,id);
                    }}>Update</Button>):null}

                {(localStorage.getItem("Role")==="Manager")?(
                    <Button variant="danger" disabled={localStorage.getItem("Role")==="User"} onClick={() => {
                        this.setState({sure: true,tripId:id});
                    }}>Delete</Button>):null}

                {(localStorage.getItem("Role")==="User")?(
                    <Button variant="warning"  onClick={async () => {
                        this.setState({buy: true});
                        this.props.findTrip(token, id);
                        this.props.findBusWithTrip(token,id);
                    }}>Buy</Button>):null}
            </ButtonGroup>
        );
    }
    buttonsRender2(str) {
        return (
            (str===true)?("Active"):("Not Active")
        );
    }
    buttonsRender3(str) {
        return (
            (str!==null)?(new Date(str)+" "):("")
            );
    }

    componentDidMount() {
        token = localStorage.getItem("token");
        this.props.fetchTrips(token);
    }

    render() {

        const seatList =(this.props.busReducer.SelectedBus === null)? null: (this.props.busReducer.SelectedBus.Empty_Seats.map(seat => {
            return(
                <Dropdown.Item eventKey={seat} onClick={() => {
                    this.setState({selectedSeat: seat})
                }}>{seat}</Dropdown.Item>
            );
        }));


        return (
            <React.Fragment>
                <DataTable
                    keys="name4"
                    columns={[
                        { title: 'Id', prop: 'Id' },
                        { title: 'Is_Active', prop: 'Is_Active' ,render: this.buttonsRender2.bind(this)},
                        { title: 'Destination', prop: 'Destination' },
                        { title: 'Departure', prop: 'Departure' },
                        { title: 'Departure_Time', prop: 'Departure_Time' ,render:this.buttonsRender3.bind(this),order:false},
                        { title: 'Bus_Id', prop: 'Bus_Id' },
                        { title: 'Driver_Id', prop: 'Driver_Id' },
                        { title: 'Payment', prop: 'Payment' },
                        { title: '' , prop:'Id',render: this.buttonsRender.bind(this), order:false}
                    ]}
                    initialData={this.props.tripReducer.Trips}
                    initialPageLength={5}
                    initialSortBy={{ prop: 'Id', order: 'descending' }}
                    pageLengthOptions={[ 5, 20, 50 ]}
                />


                <Button variant="success" onClick={()=>{this.setState({download:!this.state.download});}}>
                    Download.CSV
                </Button>
                {this.state.download && <CSVLink data={this.props.tripReducer.Trips}  filename="trips.csv">Click Here</CSVLink>}

                {(localStorage.getItem("Role")==="Manager")?(
                <Button onClick={() => {
                    this.setState({add: true})
                }}>ADD NEW TRIP</Button>):null}


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
                                                                  placeholder={(this.props.tripReducer.SelectedTrip === null) ? ("YYYY-MM-DDTHH:MM:SS") : (this.props.tripReducer.SelectedTrip.Departure_Time)}
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


                <Modal show={this.state.buy}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({buy: false});
                    }}>
                        <Modal.Title>Buy Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Buy a ticket</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandlerBuy}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Seat</Form.Label>
                                                    <DropdownButton
                                                        alignRight
                                                        title={this.state.selectedSeat}
                                                        id="dropdown-menu-align-right">
                                                        {seatList}
                                                    </DropdownButton>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col md="auto">
                                            <Button variant="primary" type="submit">
                                                Buy
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
                        <Button variant="danger" onClick={this.props.setErrorFalseTrip}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.ticketReducer.Error || this.props.ticketReducer.Success}>
                    <Modal.Header closeButton onClick={()=>{this.props.setErrorFalseTicket();this.props.setSuccessFalseTicket();}}>
                        <Modal.Title>{(this.props.ticketReducer.Error) ? ("Uppss, somethings went wrong..."):("Success")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.ticketReducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={()=>{this.props.setErrorFalseTicket();this.props.setSuccessFalseTicket();}}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.sure}>
                    <Modal.Header closeButton onClick={()=>{this.setState({sure:false})}}>
                        <Modal.Title>Deleting Trip</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to delete?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={()=>{this.setState({sure:false});
                            this.props.deleteTrip(token,this.state.tripId, this.props.tripReducer.Trips);}}>
                            Delete
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
        ticketReducer: state.ticketReducer,
        busReducer: state.busReducer,
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
        },
        addTicket:(token, ticket, tickets) =>{
            dispatch(addTicket(token, ticket, tickets));
        },
        setSuccessFalseTicket:() => {
            dispatch(setSuccessFalseTicket());
        },
        setErrorFalseTicket:() => {
            dispatch(setErrorFalseTicket());
        },
        findBus: (token, id) =>{
            dispatch(findBus(token, id));
        },
        findBusWithTrip: (token,id) => {
            dispatch(findBusWithTrip(token,id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trip);

