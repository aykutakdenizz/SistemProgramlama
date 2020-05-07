import React, {Component} from 'react';
import {connect} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

import {login, setErrorFalseMain, setSuccessFalseMain} from "../Actions/MainAction";
import {NavLink} from "react-router-dom";

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
    };

    goHome = () => {
        if (!this.props.mainReducer.Error) {
            this.props.history.push('/MainPage');
        } else {
            return null;
        }
    };

    render() {
        return (
            <React.Fragment>
                <Modal.Dialog>
                    <Modal.Header closeButton onClick={() => {
                        //this.props.history.push('/HomePage');
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
                                                    <Form.Control as="select" ref={this.RoleElement}>
                                                        <option>User</option>
                                                        <option>Manager</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <NavLink to="/SignUp">Dont't you have a account? Please click here to sign up</NavLink>
                                            </Col>
                                        </Row>
                                        <Col md="auto">
                                            <Button variant="success" type="submit">
                                                LOGIN
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

                <Modal show={this.props.mainReducer.Success}>
                    <Modal.Header closeButton onClick={()=>{this.props.setSuccessFalseMain();this.props.history.push('/MainPage');}}>
                        <Modal.Title>Login is successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Welcome</Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={()=>{this.props.setSuccessFalseMain();this.props.history.push('/MainPage');}}>
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
        mainReducer: state.mainReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (person) => {
            dispatch(login(person));
        },
        setErrorFalseMain: () => {
            dispatch(setErrorFalseMain());
        },
        setSuccessFalseMain:() =>{
            dispatch(setSuccessFalseMain());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

