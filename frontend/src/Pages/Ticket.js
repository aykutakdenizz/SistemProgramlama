import React, {Component} from 'react';
import {connect} from "react-redux";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
    deleteTicket,
    fetchTicketsWithToken, findTicket,
    setErrorFalseTicket,
    updateTicket
} from "../Actions/TicketAction";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {findTrip, findTripWithTicket, setErrorFalseTrip, setShowFalseTrip} from "../Actions/TripAction";
import {findBusWithTicket, findBusWithTrip} from "../Actions/BusActions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {CSVLink} from "react-csv";

const DataTable = require('react-data-components').DataTable;


let token = null;

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.buttonsRender = this.buttonsRender.bind(this);
        this.state = {
            update: false,
            detail: false,
            selectedSeat: "Seat No",
            sure: false,
            ticketId: null,
            download: false,
        };
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const ticket = {
            Id: this.props.ticketReducer.SelectedTicket.Id,
            Trip_Id: this.props.ticketReducer.SelectedTicket.Trip_Id,
            Seat: this.state.selectedSeat,
            User_Id: this.props.ticketReducer.SelectedTicket.User_Id,
        };
        await this.props.updateTicket(token, ticket, this.props.ticketReducer.Tickets);
        this.setState({update: false});
    };

    buttonsRender(id) {
        return (
            <ButtonGroup vertical>
                <ButtonGroup vertical>
                    {(localStorage.getItem("Role") === "User") ? (
                        <Button variant="success" onClick={() => {
                            this.setState({update: true});
                            this.props.findTicket(token, id);
                            this.props.findBusWithTicket(token, id);
                        }}>Update</Button>) : null}
                    {(localStorage.getItem("Role") === "User") ? (
                        <Button variant="danger" onClick={() => {
                            this.setState({sure: true, ticketId: id});
                        }}>Delete</Button>) : null}
                    <Button variant="warning" onClick={async () => {
                        this.props.findTripWithTicket(token, id);
                    }}>Detail</Button>
                </ButtonGroup>
            </ButtonGroup>
        );
    }

    componentDidMount() {
        token = localStorage.getItem("token");
        this.props.fetchTicketsWithToken(token);
    }

    render() {

        const seatList = (this.props.busReducer.SelectedBus === null) ? null : (this.props.busReducer.SelectedBus.Empty_Seats.map(seat => {
            return (
                <Dropdown.Item eventKey={seat} onClick={() => {
                    this.setState({selectedSeat: seat})
                }}>{seat}</Dropdown.Item>
            );
        }));

        return (
            <React.Fragment>
                <DataTable
                    keys="name5"
                    columns={[
                        {title: 'Id', prop: 'Id'},
                        {title: 'Trip_Id', prop: 'Trip_Id'},
                        {title: 'Seat', prop: 'Seat'},
                        {title: '', prop: 'Id', render: this.buttonsRender.bind(this), order: false},
                    ]}
                    initialData={this.props.ticketReducer.Tickets}
                    initialPageLength={5}
                    initialSortBy={{prop: 'Id', order: 'descending'}}
                    pageLengthOptions={[5, 20, 50]}
                />


                <Button variant="success" onClick={() => {
                    this.setState({download: !this.state.download});
                }}>
                    Download.CSV
                </Button>
                {this.state.download &&
                <CSVLink data={this.props.ticketReducer.Tickets} filename="tickets.csv">Click Here</CSVLink>}


                <Modal show={this.state.update}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({update: false});
                    }}>
                        <Modal.Title>Ticket Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Update a ticket</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandler}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>New Seat</Form.Label>
                                                    <DropdownButton
                                                        alignRight
                                                        title={this.state.selectedSeat}
                                                        id="dropdown-menu-align-right">
                                                        {seatList}
                                                    </DropdownButton>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Trip_Id</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.busReducer.Trip_Id === null) ? ("Trip id") : (this.props.busReducer.Trip_Id)}
                                                                  disabled/>
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


                <Modal show={this.props.ticketReducer.Error}>
                    <Modal.Header closeButton onClick={this.props.setErrorFalseTicket}>
                        <Modal.Title>Uppss, somethings went wrong...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.ticketReducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.setErrorFalseTicket}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.tripReducer.Error || this.props.tripReducer.Show}>
                    <Modal.Header closeButton onClick={() => {
                        this.props.setErrorFalseTrip();
                        this.props.setShowFalseTrip();
                    }}>
                        <Modal.Title>{(this.props.tripReducer.Error) ? ("Uppss, somethings went wrong...") : ("Trip Detail")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{(this.props.tripReducer.Response === null) ? null : ((this.props.tripReducer.Response.length > 0) ? (this.props.tripReducer.Response.map(detail => {
                        return (<tr>{detail}</tr>)
                    })) : ("Empty"))}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {
                            this.props.setErrorFalseTrip();
                            this.props.setShowFalseTrip();
                        }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.sure}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({sure: false})
                    }}>
                        <Modal.Title>Deleting Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to delete?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {
                            this.setState({sure: false});
                            this.props.deleteTicket(token, this.state.ticketId, this.props.ticketReducer.Tickets);
                        }}>
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
        fetchTicketsWithToken: (token) => {
            dispatch(fetchTicketsWithToken(token));
        },
        setErrorFalseTicket: () => {
            dispatch(setErrorFalseTicket());
        },
        deleteTicket: (token, id, tickets) => {
            dispatch(deleteTicket(token, id, tickets));
        },
        updateTicket: (token, ticket, tickets) => {
            dispatch(updateTicket(token, ticket, tickets));
        },
        findTicket: (token, id) => {
            dispatch(findTicket(token, id));
        },
        findTrip: (token, tripId) => {
            dispatch(findTrip(token, tripId));
        },
        setShowFalseTrip: () => {
            dispatch(setShowFalseTrip());
        },
        setErrorFalseTrip: () => {
            dispatch(setErrorFalseTrip());
        },
        findBusWithTicket: (token, id) => {
            dispatch(findBusWithTicket(token, id));
        },
        findTripWithTicket: (token, id) => {
            dispatch(findTripWithTicket(token, id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);

