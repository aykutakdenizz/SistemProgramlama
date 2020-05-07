import React, {Component} from 'react';
import {connect} from "react-redux";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {deleteTicket, fetchTickets, fetchUserTickets, setErrorFalseTicket} from "../Actions/TicketAction";



let token = null;
let role = null;
let id = null;
class Ticket extends Component {

    componentDidMount() {
        token = localStorage.getItem("token");
        role = localStorage.getItem("Role");
        id = localStorage.getItem("Id");
        console.log("ROLE:"+role);
        if(role==="User"){
            this.props.fetchUserTickets(token,id);
        }else{
            this.props.fetchTickets(token);
        }

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
                                <Button variant="success" onClick={() => {
                                    //this.setState({update: true});
                                    //this.props.ticketReducer.SelectedTicket = ticket;
                                }}>Update</Button>
                                <Button variant="danger" onClick={() => {
                                    //this.props.deleteTicket(token, ticket.Id, this.props.ticketReducer.Tickets);
                                }}>Delete</Button>
                                <Button variant="warning" onClick={() => {
                                    //
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


                <Modal show={this.props.ticketReducer.Error}>
                    <Modal.Header closeButton onClick={this.props.setErrorFalseTicket}>
                        <Modal.Title>Uppss, somethings went wrong...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.ticketReducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.setErrorFalseTicket}>
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
        ticketReducer: state.ticketReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTickets: (token) => {
            dispatch(fetchTickets(token));
        },
        fetchUserTickets: (token,id) => {
            dispatch(fetchUserTickets(token,id));
        },
        setErrorFalseTicket:() => {
            dispatch(setErrorFalseTicket());
        },
        deleteTicket:(token, id, tickets) => {
            dispatch(deleteTicket(token, id, tickets));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);

