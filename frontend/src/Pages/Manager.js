import React, {Component} from 'react';
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {deleteManager, fetchManagers, findManager, setErrorFalseManager, updateManager} from "../Actions/ManagerAction";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

let token = null;

class Manager extends Component {
    constructor(props){
        super(props);
        this.state = {
            update: false,
            add:false,
        };
        this.ManagerNameElement = React.createRef();
        this.ManagerSurnameElement = React.createRef();
        this.ManagerReal_NameElement = React.createRef();
        this.ManagerPasswordElement = React.createRef();
    }
    submitHandler = async (event) => {
        event.preventDefault();
        const manager = {
            Id: this.props.managerReducer.SelectedManager.Id,
            Name : (this.ManagerNameElement.current.value ==="") ? (this.props.managerReducer.SelectedManager.Name):(this.ManagerNameElement.current.value),
            Surname :(this.ManagerSurnameElement.current.value ==="") ? (this.props.managerReducer.SelectedManager.Surname):(this.ManagerSurnameElement.current.value),
            Real_Name :(this.ManagerReal_NameElement.current.value ==="") ? (this.props.managerReducer.SelectedManager.Real_Name):(this.ManagerReal_NameElement.current.value),
            Password :(this.ManagerPasswordElement.current.value ==="") ? (this.props.managerReducer.SelectedManager.Password):(this.ManagerPasswordElement.current.value),
        };
        this.props.updateManager(token,manager,this.props.managerReducer.Managers);
        this.setState({update: false});
    };

    componentDidMount() {
        token = localStorage.getItem("token");
        this.props.fetchManagers(token);
    }

    render() {
        const managerList = this.props.managerReducer.Managers.map(manager => {
                return (
                    <tr key={manager.Id} className="event__list-item">
                        <td>{manager.Id}</td>
                        <td>{manager.Name}</td>
                        <td>{manager.Real_Name}</td>
                        <td>{manager.Surname}</td>
                        <td>
                            <ButtonGroup vertical>
                                <Button variant="success" onClick={()=>{
                                    this.setState({update:true});
                                    this.props.managerReducer.SelectedManager = manager;
                                }}>Update</Button>
                                <Button variant="danger" onClick={()=>{
                                    this.props.deleteManager(token,manager.Id, this.props.managerReducer.Managers);
                                }}>Delete</Button>
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
                        <th>Manager Id</th>
                        <th>Manager Name</th>
                        <th>Manager Real_Name</th>
                        <th>Manager Surname</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{managerList}</tbody>
                </Table>

                <Button onClick={() => {
                    this.props.findManager(token, 1);
                }}>FIND</Button>


                <Modal show={this.state.update}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({update: false});
                    }}>
                        <Modal.Title>Manager Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Update a manager</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandler}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Manager Username</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.managerReducer.SelectedManager===null) ? ("Please enter username"):(this.props.managerReducer.SelectedManager.Name)}
                                                                  ref={this.ManagerNameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Manager Real Name</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.managerReducer.SelectedManager===null) ? ("Please enter real name"):(this.props.managerReducer.SelectedManager.Real_Name)}
                                                                  ref={this.ManagerReal_NameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Manager Surname</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.managerReducer.SelectedManager===null) ? ("Please enter surname"):(this.props.managerReducer.SelectedManager.Surname)}
                                                                  ref={this.ManagerSurnameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Manager Password</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please enter password"
                                                                  ref={this.ManagerPasswordElement}/>
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


                <Modal show={this.props.managerReducer.Error}>
                    <Modal.Header closeButton onClick={this.props.setErrorFalseManager}>
                        <Modal.Title>Uppss, somethings went wrong...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.managerReducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.setErrorFalseManager}>
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
        managerReducer: state.managerReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchManagers: (token) => {
            dispatch(fetchManagers(token));
        },
        updateManager: (token, manager, managers) => {
            dispatch(updateManager(token, manager, managers));
        },
        deleteManager: (token, managerId, managers) => {
            dispatch(deleteManager(token, managerId, managers));
        },
        findManager: (token, managerId) => {
            dispatch(findManager(token, managerId));
        },
        setErrorFalseManager: () => {
            dispatch(setErrorFalseManager());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);

