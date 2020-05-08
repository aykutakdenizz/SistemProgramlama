import React, {Component} from 'react';
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import {deleteManager, fetchManagers, findManager, setErrorFalseManager, updateManager} from "../Actions/ManagerAction";
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

class Manager extends Component {
    constructor(props){
        super(props);
        this.buttonsRender = this.buttonsRender.bind(this);
        this.state = {
            update: false,
            add:false,
            sure:false,
            managerId:null,
            download:false,
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
    buttonsRender(id) {
        return (
            <ButtonGroup vertical>
                <Button variant="success" onClick={()=>{
                    this.setState({update:true});
                    this.props.findManager(token,id);
                }}>Update</Button>
                <Button variant="danger" onClick={()=>{
                    this.setState({sure:true,managerId:id});
                }}>Delete</Button>
            </ButtonGroup>
        );
    }

    componentDidMount() {
        token = localStorage.getItem("token");
        this.props.fetchManagers(token);
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
                        { title: '' , prop:'Id',render: this.buttonsRender.bind(this), order:false}
                    ]}
                    initialData={this.props.managerReducer.Managers}
                    initialPageLength={5}
                    initialSortBy={{ prop: 'Id', order: 'descending' }}
                    pageLengthOptions={[ 5, 20, 50 ]}
                />

                <Button variant="success" onClick={()=>{this.setState({download:!this.state.download});}}>
                    Download.CSV
                </Button>
                {this.state.download && <CSVLink data={this.props.managerReducer.Managers} headers={headers} filename="managers.csv">Click Here</CSVLink>}


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
                        <Button variant="danger" onClick={this.props.setErrorFalseManager}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.sure}>
                    <Modal.Header closeButton onClick={()=>{this.setState({sure:false})}}>
                        <Modal.Title>Deleting Manager</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to delete?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={()=>{this.setState({sure:false});
                            this.props.deleteManager(token,this.state.managerId, this.props.managerReducer.Managers);}}>
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

