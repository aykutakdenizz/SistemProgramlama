import React, {Component} from 'react';
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

import {signup, setErrorFalseMain, setSuccessFalseMain, setShowFalseMain} from "../Actions/MainAction";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "User",
        };
        this.NameElement = React.createRef();
        this.PasswordElement = React.createRef();
        //this.RoleElement = React.createRef();
        this.Real_NameElement = React.createRef();
        this.SurnameElement = React.createRef();
        this.MasterNameElement = React.createRef();
        this.MasterPasswordElement = React.createRef();
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const person = {
            Name: this.NameElement.current.value,
            Password: this.PasswordElement.current.value,
            Role: this.state.role,
            Real_Name: this.Real_NameElement.current.value,
            Surname: this.SurnameElement.current.value,
        };
        if(this.state.role ==="Manager"){
            person.Master_Manager_Name= this.MasterNameElement.current.value;
            person.Master_Manager_Password= this.MasterPasswordElement.current.value;
        }
        await this.props.signup(person);
    };

    render() {
        return (
            <React.Fragment>
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={() => {
                        this.props.history.push('/Login');
                    }}>
                        <Modal.Title>SIGN UP</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="x1">
                            <Card className="login_card">
                                <Card.Header className="login_header">Sign up screen</Card.Header>
                                <Card.Body className="login_body">
                                    <Form className="x5" onSubmit={this.submitHandler}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please Enter username"
                                                                  ref={this.NameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectEmail">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password"
                                                                  placeholder="Please Enter Password"
                                                                  ref={this.PasswordElement}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Account Type</Form.Label>
                                                    <DropdownButton
                                                        alignRight
                                                        title={this.state.role}
                                                        id="dropdown-menu-align-right">
                                                        <Dropdown.Item eventKey="User" onClick={() => {
                                                            this.setState({role: "User"})
                                                        }}>User</Dropdown.Item>

                                                        <Dropdown.Item eventKey="Manager" onClick={() => {
                                                            this.setState({role: "Manager"})
                                                        }}>Manager</Dropdown.Item>
                                                    </DropdownButton>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Col md="auto">
                                            <Form.Group controlId="formBasicProjectName">
                                                <Form.Label>Real Name</Form.Label>
                                                <Form.Control type="text"
                                                              placeholder="Please Enter Real Name"
                                                              ref={this.Real_NameElement}/>
                                            </Form.Group>
                                        </Col>
                                        <Col md="auto">
                                            <Form.Group controlId="formBasicProjectName">
                                                <Form.Label>Surname</Form.Label>
                                                <Form.Control type="text"
                                                              placeholder="Please Enter Surname"
                                                              ref={this.SurnameElement}/>
                                            </Form.Group>
                                        </Col>
                                        { this.state.role ==="Manager" &&
                                        <Col md="auto">
                                            <Form.Group controlId="formBasicProjectName">
                                                <Form.Label>Master Name</Form.Label>
                                                <Form.Control type="text"
                                                              placeholder="Please Enter Master Name"
                                                              ref={this.MasterNameElement}/>
                                            </Form.Group>
                                        </Col>}
                                        {this.state.role === "Manager" &&
                                        <Col md="auto">
                                            <Form.Group controlId="formBasicProjectName">
                                                <Form.Label>Master Password</Form.Label>
                                                <Form.Control type="password"
                                                              placeholder="Please Enter Master Password"
                                                              ref={this.MasterPasswordElement}/>
                                            </Form.Group>
                                        </Col>}

                                        <Row/>
                                        <Col md="auto">
                                            <Button variant="success" type="submit">
                                                SIGN UP
                                            </Button>
                                        </Col>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </Modal.Body>
                </Modal.Dialog>

                <Modal show={this.props.mainReducer.Error}>
                    <Modal.Header closeButton onClick={this.props.setErrorFalseMain}>
                        <Modal.Title>Uppss, somethings went wrong...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.mainReducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.setErrorFalseMain}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.mainReducer.Show}>
                    <Modal.Header closeButton onClick={() => {
                        this.props.setShowFalseMain();
                        this.props.history.push('/Login');
                    }}>
                        <Modal.Title>Sign up is successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.mainReducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={() => {
                            this.props.setShowFalseMain();
                            this.props.history.push('/Login');
                        }}>
                            Go Login
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        mainReducer: state.mainReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (person) => {
            dispatch(signup(person));
        },
        setErrorFalseMain: () => {
            dispatch(setErrorFalseMain());
        },
        setSuccessFalseMain: () => {
            dispatch(setSuccessFalseMain());
        },
        setShowFalseMain: () => {
            dispatch(setShowFalseMain());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

