import React, {Component} from 'react';
import {connect} from "react-redux";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {deleteUser, fetchUsers, findUser, setErrorFalseUser, updateUser} from "../Actions/UserAction";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

let token = null;

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
            add: false,
        };
        this.UserNameElement = React.createRef();
        this.UserSurnameElement = React.createRef();
        this.UserReal_NameElement = React.createRef();
        this.UserPasswordElement = React.createRef();
        this.UserMoneyElement = React.createRef();
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const user = {
            Id: this.props.userReducer.SelectedUser.Id,
            Name: (this.UserNameElement.current.value === "") ? (this.props.userReducer.SelectedUser.Name) : (this.UserNameElement.current.value),
            Surname: (this.UserSurnameElement.current.value === "") ? (this.props.userReducer.SelectedUser.Surname) : (this.UserSurnameElement.current.value),
            Real_Name: (this.UserReal_NameElement.current.value === "") ? (this.props.userReducer.SelectedUser.Real_Name) : (this.UserReal_NameElement.current.value),
            Password: (this.UserPasswordElement.current.value === "") ? (this.props.userReducer.SelectedUser.Password) : (this.UserPasswordElement.current.value),
            Money: (this.UserMoneyElement.current.value === "") ? (this.props.userReducer.SelectedUser.Money) : (this.UserMoneyElement.current.value),
        };
        this.props.updateUser(token, user, this.props.userReducer.Users);
        this.setState({update: false});
    };

    componentDidMount() {
        token = localStorage.getItem("token");
        this.props.fetchUsers(token);
    }

    render() {
        const userList = this.props.userReducer.Users.map(user => {
                return (
                    <tr key={user.Id} className="event__list-item">
                        <td>{user.Id}</td>
                        <td>{user.Name}</td>
                        <td>{user.Real_Name}</td>
                        <td>{user.Surname}</td>
                        <td>{user.Money}</td>
                        <td>
                            <ButtonGroup vertical>
                                <Button variant="success" onClick={() => {
                                    this.setState({update: true});
                                    this.props.userReducer.SelectedUser = user;
                                }}>Update</Button>
                                <Button variant="danger" onClick={() => {
                                    this.props.deleteUser(token, user.Id, this.props.userReducer.Users);
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
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>User Real_Name</th>
                        <th>User Surname</th>
                        <th>User Money</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{userList}</tbody>
                </Table>


                <Modal show={this.state.update}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({update: false});
                    }}>
                        <Modal.Title>User Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Update a user</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandler}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>User Username</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.userReducer.SelectedUser === null) ? ("Please enter username") : (this.props.userReducer.SelectedUser.Name)}
                                                                  ref={this.UserNameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>User Real Name</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.userReducer.SelectedUser === null) ? ("Please enter real name") : (this.props.userReducer.SelectedUser.Real_Name)}
                                                                  ref={this.UserReal_NameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>User Surname</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.userReducer.SelectedUser === null) ? ("Please enter surname") : (this.props.userReducer.SelectedUser.Surname)}
                                                                  ref={this.UserSurnameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>User Password</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Please enter password"
                                                                  ref={this.UserPasswordElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>User Money</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.userReducer.SelectedUser === null) ? ("Please enter money") : (this.props.userReducer.SelectedUser.Money)}
                                                                  ref={this.UserPasswordElement}/>
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


                <Modal show={this.props.userReducer.Error}>
                    <Modal.Header closeButton onClick={this.props.setErrorFalseUser}>
                        <Modal.Title>Uppss, somethings went wrong...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.userReducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.setErrorFalseUser}>
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
        userReducer: state.userReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: (token) => {
            dispatch(fetchUsers(token));
        },
        updateUser: (token, user, users) => {
            dispatch(updateUser(token, user, users));
        },
        deleteUser: (token, userId, users) => {
            dispatch(deleteUser(token, userId, users));
        },
        findUser: (token, userId) => {
            dispatch(findUser(token, userId));
        },
        setErrorFalseUser: () => {
            dispatch(setErrorFalseUser());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

