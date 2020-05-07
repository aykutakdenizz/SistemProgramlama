import React, {Component} from 'react';
import {connect} from "react-redux";

import {deleteBus, fetchBuses, updateBus, addBus, findBus, setErrorFalseBus} from "../Actions/BusActions";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
let token = null;

class Bus extends Component {
    constructor(props){
        super(props);
        this.state = {
            update: false,
            add:false,
        };
        this.BusPlateElement = React.createRef();
        this.BusSeatPlanElement = React.createRef();
        this.BusEmptySeatsElement = React.createRef();
    }
    submitHandler = async (event) => {
        event.preventDefault();
        let empty_seats=null;
        if(this.BusEmptySeatsElement.current.value !== ""){
            empty_seats = this.BusEmptySeatsElement.current.value.split(",");
        }
        const bus = {
            Id: this.props.busReducer.SelectedBus.Id,
            Plate : (this.BusPlateElement.current.value ==="") ? (this.props.busReducer.SelectedBus.Plate):(this.BusPlateElement.current.value),
            Seat_Plan :(this.BusSeatPlanElement.current.value ==="") ? (this.props.busReducer.SelectedBus.Seat_Plan):(this.BusSeatPlanElement.current.value),
            Empty_Seats:(this.BusEmptySeatsElement.current.value ==="") ? null:(empty_seats),
        };
        this.props.updateBus(token,bus,this.props.busReducer.Buses);
        this.setState({update: false});
    };
    submitHandlerAdd = async (event) => {
        event.preventDefault();
        let empty_seats = null;
        if(this.BusEmptySeatsElement.current.value !== ""){
            empty_seats = this.BusEmptySeatsElement.current.value.split(",");
        }
        const bus = {
            Plate : (this.BusPlateElement.current.value ==="") ? null:(this.BusPlateElement.current.value),
            Seat_Plan :(this.BusSeatPlanElement.current.value ==="") ? null:(this.BusSeatPlanElement.current.value),
            Empty_Seats:(this.BusEmptySeatsElement.current.value ==="") ? null:(empty_seats),
        };
        this.props.addBus(token,bus,this.props.busReducer.Buses);
        this.setState({add: false});
    };
    componentDidMount() {
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
                        <td>
                            <ButtonGroup vertical>
                                <Button variant="success" onClick={()=>{
                                    this.setState({update:true});
                                    this.props.busReducer.SelectedBus = bus;
                                }}>Update</Button>
                                <Button variant="danger" onClick={()=>{
                                    this.props.deleteBus(token,bus.Id, this.props.busReducer.Buses);
                                }}>Delete</Button>
                            </ButtonGroup>
                        </td>
                    </tr>

                )
            }
        );
        return (
            <React.Fragment>
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Bus Id</th>
                        <th>Bus Plate</th>
                        <th>Bus Seat_Plan</th>
                        <th>Bus Empty_Seats</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{busList}</tbody>
                </Table>
                <Button onClick={() => {this.setState({add: true})}} >ADD NEW BUS</Button>


                <Modal show={this.state.update}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({update: false});
                    }}>
                        <Modal.Title>Bus Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Update a bus</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandler}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Plate</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.busReducer.SelectedBus===null) ? ("Please enter plate"):(this.props.busReducer.SelectedBus.Plate)}
                                                                  ref={this.BusPlateElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Seat Plan</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.busReducer.SelectedBus===null) ? ("Please enter seat plan"):(this.props.busReducer.SelectedBus.Seat_Plan)}
                                                                  ref={this.BusSeatPlanElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Empty Seats</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.busReducer.SelectedBus===null) ? ("Split via ','"):(this.props.busReducer.SelectedBus.Empty_Seats)}
                                                                  ref={this.BusEmptySeatsElement}/>
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
                        <Modal.Title>Bus Add</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Add a bus</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandlerAdd}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Plate</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Plate"
                                                                  ref={this.BusPlateElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Seat Plan</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Plan"
                                                                  ref={this.BusSeatPlanElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Empty Seats</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Split via ','"
                                                                  ref={this.BusEmptySeatsElement}/>
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


                <Modal show={this.props.busReducer.Error}>
                    <Modal.Header closeButton onClick={this.props.setErrorFalseBus}>
                        <Modal.Title>Uppss, somethings went wrong...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.busReducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.setErrorFalseBus}>
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
        },
        setErrorFalseBus: () => {
            dispatch(setErrorFalseBus());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bus);

