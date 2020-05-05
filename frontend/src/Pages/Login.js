import React, {Component} from 'react';
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

import {login} from "../Actions/MainAction";

class Login extends Component {
    constructor(props) {
        super(props);
        this.NameElement = React.createRef();
        this.PasswordElement = React.createRef();
        this.RoleElement = React.createRef();

    }

    submitHandler = async (event) => {
        event.preventDefault();
        const person = {
            Name: this.NameElement.current.value,
            Password: this.PasswordElement.current.value,
            Role: this.RoleElement.current.value,
        };
        await this.props.login(person);
        this.props.history.push('/MainPage');
    };

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header closeButton onClick={() => {
                    this.props.history.push('/HomePage');
                }}>
                    <Modal.Title>LOGIN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="x1">
                        <Card className="login_card">
                            <Card.Header className="login_header">Login screen</Card.Header>
                            <Card.Body className="login_body">
                                <Form className="x5" onSubmit={this.submitHandler}>
                                    <Row>
                                        <Col md="auto">
                                            <Form.Group controlId="formBasicProjectName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text"
                                                              placeholder="Please Enter Name"
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
                                                <Form.Label>Role select</Form.Label>
                                                <Form.Control as="select" ref = {this.RoleElement}>
                                                    <option>User</option>
                                                    <option>Manager</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                    <Col md="auto">
                                        <Button variant="primary" type="submit">
                                            LOGIN
                                        </Button>
                                    </Col>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Modal.Body>
            </Modal.Dialog>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        mainReducer: state.mainReducer,
        busReducer: state.busReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login : (person) => {
            dispatch(login(person));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

