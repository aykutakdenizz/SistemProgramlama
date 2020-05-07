import React, {Component} from 'react';
import {connect} from "react-redux";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
    deleteTicket,
    fetchTicketsWithToken,
    setErrorFalseTicket,
    updateTicket
} from "../Actions/TicketAction";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {findTrip, setErrorFalseTrip, setShowFalseTrip} from "../Actions/TripAction";



let token = null;

class Ticket extends Component {
    constructor(props){
        super(props);
        this.state = {
            update: false,
            detail:false,
        };
        this.SeatElement = React.createRef();
    }
    submitHandler = async (event) => {
        event.preventDefault();
        const ticket = {
            Id: this.props.ticketReducer.SelectedTicket.Id,
            Trip_Id : this.props.ticketReducer.SelectedTicket.Trip_Id,
            Seat :(this.SeatElement.current.value ==="") ? (this.props.ticketReducer.SelectedTicket.Seat):(this.SeatElement.current.value),
            User_Id:this.props.ticketReducer.SelectedTicket.User_Id,
        };
        await this.props.updateTicket(token, ticket, this.props.ticketReducer.Tickets);
        this.setState({update: false});
    };

    componentDidMount() {
        token = localStorage.getItem("token");
        this.props.fetchTicketsWithToken(token);
    }

    render() {
        const ticketList = this.props.ticketReducer.Tickets.map(ticket => {
                return (
                    <tr key={ticket.Id} className="event__list-item">
                        <td>{ticket.Id}</td>
                        <td>{ticket.Trip_Id}</td>
                        <td>{ticket.Seat}</td>
                        <td>{ticket.User_Id}</td>
                        <td>
                            <ButtonGroup vertical>
                                {(localStorage.getItem("Role")==="User")?(
                                <Button variant="success" onClick={() => {
                                    this.setState({update: true});
                                    this.props.ticketReducer.SelectedTicket = ticket;
                                }}>Update</Button>):null}
                                {(localStorage.getItem("Role")==="User")?(
                                <Button variant="danger" onClick={() => {
                                    this.props.deleteTicket(token, ticket.Id, this.props.ticketReducer.Tickets);
                                }}>Delete</Button>):null}
                                <Button variant="warning" onClick={() => {
                                    this.props.findTrip(token, ticket.Trip_Id);
                                }}>Detail</Button>
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
                        <th>Ticket Id</th>
                        <th>Ticket Trip Id</th>
                        <th>Seat</th>
                        <th>Ticket User Id</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{ticketList}</tbody>
                </Table>





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
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.ticketReducer.SelectedTicket===null) ? ("Please enter plate"):(this.props.ticketReducer.SelectedTicket.Seat)}
                                                                  ref={this.SeatElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Trip_Id</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.ticketReducer.SelectedTicket===null) ? ("Trip id"):(this.props.ticketReducer.SelectedTicket.Trip_Id)}
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
                    <Modal.Header closeButton onClick={()=>{this.props.setErrorFalseTrip();this.props.setShowFalseTrip();}}>
                        <Modal.Title>{(this.props.tripReducer.Error) ? ("Uppss, somethings went wrong..."):("Trip Detail")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{(this.props.tripReducer.Response===null)?null:((this.props.tripReducer.Response.length>0)?(this.props.tripReducer.Response.map(detail =>{return(<tr>{detail}</tr>)})):("Empty"))}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={()=>{this.props.setErrorFalseTrip();this.props.setShowFalseTrip();}}>
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
        ticketReducer: state.ticketReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTicketsWithToken: (token) => {
            dispatch(fetchTicketsWithToken(token));
        },
        setErrorFalseTicket:() => {
            dispatch(setErrorFalseTicket());
        },
        deleteTicket:(token, id, tickets) => {
            dispatch(deleteTicket(token, id, tickets));
        },
        updateTicket: (token, ticket ,tickets) => {
            dispatch(updateTicket(token, ticket ,tickets));
        },
        findTrip: (token, tripId) => {
            dispatch(findTrip(token, tripId));
        },
        setShowFalseTrip:() => {
            dispatch(setShowFalseTrip());
        },
        setErrorFalseTrip:() => {
            dispatch(setErrorFalseTrip());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);

