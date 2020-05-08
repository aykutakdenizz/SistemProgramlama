import React, {Component} from 'react';
import {connect} from "react-redux";

import {deleteBus, fetchBuses, updateBus, addBus, findBus, setErrorFalseBus} from "../Actions/BusActions";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {CSVLink} from "react-csv";

const DataTable = require('react-data-components').DataTable;
let token = null;


class Bus extends Component {
    constructor(props) {
        super(props);
        this.buttonsRender = this.buttonsRender.bind(this);
        this.buttonsRender2 = this.buttonsRender2.bind(this);
        this.state = {
            update: false,
            add: false,
            sure: false,
            busId: null,
            download: false,
        };
        this.BusPlateElement = React.createRef();
        this.BusSeatPlanElement = React.createRef();
        this.BusEmptySeatsElement = React.createRef();
    }

    submitHandler = async (event) => {
        event.preventDefault();
        let empty_seats = null;
        if (this.BusEmptySeatsElement.current.value !== "") {
            empty_seats = this.BusEmptySeatsElement.current.value.split(",");
        }
        const bus = {
            Id: this.props.busReducer.SelectedBus.Id,
            Plate: (this.BusPlateElement.current.value === "") ? (this.props.busReducer.SelectedBus.Plate) : (this.BusPlateElement.current.value),
            Seat_Plan: (this.BusSeatPlanElement.current.value === "") ? (this.props.busReducer.SelectedBus.Seat_Plan) : (this.BusSeatPlanElement.current.value),
            Empty_Seats: (this.BusEmptySeatsElement.current.value === "") ? (this.props.busReducer.SelectedBus.Empty_Seats) : (empty_seats),
        };
        this.props.updateBus(token, bus, this.props.busReducer.Buses);
        this.setState({update: false});
    };
    submitHandlerAdd = async (event) => {
        event.preventDefault();
        let empty_seats = null;
        if (this.BusEmptySeatsElement.current.value !== "") {
            empty_seats = this.BusEmptySeatsElement.current.value.split(",");
        }
        const bus = {
            Plate: (this.BusPlateElement.current.value === "") ? null : (this.BusPlateElement.current.value),
            Seat_Plan: (this.BusSeatPlanElement.current.value === "") ? null : (this.BusSeatPlanElement.current.value),
            Empty_Seats: (this.BusEmptySeatsElement.current.value === "") ? null : (empty_seats),
        };
        this.props.addBus(token, bus, this.props.busReducer.Buses);
        this.setState({add: false});
    };

    componentDidMount() {
        token = localStorage.getItem("token");
        this.props.fetchBuses(token);
    }

    buttonsRender(busId) {
        return (
            <ButtonGroup vertical>
                {(localStorage.getItem("Role") === "Manager") ? (
                    <Button variant="success" onClick={() => {
                        this.setState({update: true});
                        this.props.findBus(token, busId);
                    }}>Update</Button>) : null}
                {(localStorage.getItem("Role") === "Manager") ? (
                    <Button variant="danger" onClick={() => {
                        this.setState({sure: true, busId: busId});
                    }}>Delete</Button>) : null}
                {(localStorage.getItem("Role") === "User") ? ("No permission") : null}
            </ButtonGroup>
        );
    }
    buttonsRender2(str) {
        return (
            (str===null)?("No Seat"):((str.length>0)?
                (str.map(detail =>{return(detail+" ")})):("No Seat"))
        );
    }


    render() {
        return (
            <React.Fragment>
                <DataTable
                    keys="name"
                    columns={[
                        {title: 'Id', prop: 'Id'},
                        {title: 'Plate', prop: 'Plate'},
                        {title: 'Seat_Plan', prop: 'Seat_Plan'},
                        {title: 'Empty_Seats', prop: 'Empty_Seats', render: this.buttonsRender2.bind(this)},
                        {title: '', prop: 'Id', render: this.buttonsRender.bind(this), order: false}
                    ]}
                    initialData={this.props.busReducer.Buses}
                    initialPageLength={5}
                    initialSortBy={{prop: 'Id', order: 'descending'}}
                    pageLengthOptions={[5, 20, 50]}
                />

                {(localStorage.getItem("Role") === "Manager") ? (
                    <Button onClick={() => {
                        this.setState({add: true})
                    }}>ADD NEW BUS</Button>) : null}

                <Button variant="success" onClick={() => {
                    this.setState({download: !this.state.download});
                }}>
                    Download.CSV
                </Button>
                {this.state.download &&
                <CSVLink data={this.props.busReducer.Buses} filename="buses.csv">Click Here</CSVLink>}


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
                                                                  placeholder={(this.props.busReducer.SelectedBus === null) ? ("Please enter plate") : (this.props.busReducer.SelectedBus.Plate)}
                                                                  ref={this.BusPlateElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Seat Plan</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.busReducer.SelectedBus === null) ? ("Please enter seat plan") : (this.props.busReducer.SelectedBus.Seat_Plan)}
                                                                  ref={this.BusSeatPlanElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Empty Seats</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.busReducer.SelectedBus === null) ? ("Split via ','") : (this.props.busReducer.SelectedBus.Empty_Seats)}
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
                        <Button variant="danger" onClick={this.props.setErrorFalseBus}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.sure}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({sure: false})
                    }}>
                        <Modal.Title>Deleting Bus</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to delete?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {
                            this.setState({sure: false});
                            this.props.deleteBus(token, this.state.busId, this.props.busReducer.Buses);
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
        busReducer: state.busReducer,
        mainReducer: state.mainReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBuses: (token) => {
            dispatch(fetchBuses(token));
        },
        updateBus: (token, bus, buses) => {
            dispatch(updateBus(token, bus, buses));
        },
        deleteBus: (token, busId, buses) => {
            dispatch(deleteBus(token, busId, buses));
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

