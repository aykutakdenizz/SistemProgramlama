import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import {
    deleteUser,
    findUser,
    getUsersWithToken,
    setErrorFalseUser,
    updateUser
} from "../Actions/UserAction";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {CSVLink} from "react-csv";
const DataTable = require('react-data-components').DataTable;

let token = null;
const headers = [
    { label: 'Id', key: 'Id' },
    { label: 'Name', key: 'Name' },
    { label: 'Surname', key: 'Surname' },
    { label: 'Real_Name', key: 'Real_Name' },
];

class User extends Component {
    constructor(props) {
        super(props);
        this.buttonsRender = this.buttonsRender.bind(this);
        this.state = {
            update: false,
            add: false,
            sure:false,
            userId:null,
            download:false
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

    buttonsRender(id) {
        return (
            <ButtonGroup vertical>
                {(localStorage.getItem("Role")==="Manager")?(
                    <Button variant="success" onClick={() => {
                        this.setState({update: true});
                        this.props.findUser(token,id);
                    }}>Update</Button>):null}
                {(localStorage.getItem("Role")==="Manager")?(
                    <Button variant="danger" onClick={() => {
                        this.setState({sure: true,userId:id});
                    }}>Delete</Button>):null}
                {(localStorage.getItem("Role")==="User")?("No permission"):null}
            </ButtonGroup>
        );
    }

    componentDidMount() {
        token = localStorage.getItem("token");
        this.props.getUsersWithToken(token);
    }

    render() {
        return (
            <React.Fragment>
                <DataTable
                    keys="name3"
                    columns={[
                        { title: 'Id', prop: 'Id' },
                        { title: 'Name', prop: 'Name' },
                        { title: 'Real_Name', prop: 'Real_Name' },
                        { title: 'Surname', prop: 'Surname' },
                        { title: 'Money', prop: 'Money' },
                        { title: '' , prop:'Id',render: this.buttonsRender.bind(this), order:false}
                    ]}
                    initialData={this.props.userReducer.Users}
                    initialPageLength={5}
                    initialSortBy={{ prop: 'Id', order: 'descending' }}
                    pageLengthOptions={[ 5, 20, 50 ]}
                />

                <Button variant="success" onClick={()=>{this.setState({download:!this.state.download});}}>
                    Download.CSV
                </Button>
                {this.state.download && <CSVLink data={this.props.userReducer.Users} headers={headers} filename="users.csv">Click Here</CSVLink>}


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
                                                                  ref={this.UserMoneyElement}/>
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

                <Modal show={this.state.sure}>
                    <Modal.Header closeButton onClick={()=>{this.setState({sure:false})}}>
                        <Modal.Title>Deleting Ticket</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to delete?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={()=>{this.setState({sure:false});
                            this.props.deleteUser(token, this.state.userId, this.props.userReducer.Users);}}>
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
        userReducer: state.userReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsersWithToken: (token) => {
            dispatch(getUsersWithToken(token));
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

