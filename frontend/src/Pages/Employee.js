import React, {Component} from 'react';
import {connect} from "react-redux";

import {
    deleteEmployee,
    fetchEmployees,
    updateEmployee,
    addEmployee,
    findEmployee,
    setErrorFalseEmployee
} from "../Actions/EmployeeAction";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";

let token = null;

class Employee extends Component {
    constructor(props){
        super(props);
        this.state = {
            update: false,
            add:false,
        };
        this.EmployeeNameElement = React.createRef();
        this.EmployeeSurnameElement = React.createRef();
        this.EmployeeAddressElement = React.createRef();
    }
    submitHandler = async (event) => {
        event.preventDefault();
        const employee = {
            Id: this.props.employeeReducer.SelectedEmployee.Id,
            Name : (this.EmployeeNameElement.current.value ==="") ? (this.props.employeeReducer.SelectedEmployee.Name):(this.EmployeeNameElement.current.value),
            Surname :(this.EmployeeSurnameElement.current.value ==="") ? (this.props.employeeReducer.SelectedEmployee.Surname):(this.EmployeeSurnameElement.current.value),
            Address:(this.EmployeeAddressElement.current.value ==="") ? (this.props.employeeReducer.SelectedEmployee.Address):(this.EmployeeAddressElement.current.value),
        };
        this.props.updateEmployee(token,employee,this.props.employeeReducer.Employees);
        this.setState({update: false});
    };
    submitHandlerAdd = async (event) => {
        event.preventDefault();
        const employee = {
            Name : (this.EmployeeNameElement.current.value ==="") ? null:(this.EmployeeNameElement.current.value),
            Surname :(this.EmployeeSurnameElement.current.value ==="") ? null:(this.EmployeeSurnameElement.current.value),
            Address:(this.EmployeeAddressElement.current.value ==="") ? null:(this.EmployeeAddressElement.current.value),
        };
        this.props.addEmployee(token,employee,this.props.employeeReducer.Employees);
        this.setState({add: false});
    };
    componentDidMount() {
        token = localStorage.getItem("token");
        this.props.fetchEmployees(token);
    }

    render() {
        const employeeList = this.props.employeeReducer.Employees.map(employee => {
                return (
                    <tr key={employee.Id} className="event__list-item">
                        <td>{employee.Id}</td>
                        <td>{employee.Name}</td>
                        <td>{employee.Surname}</td>
                        <td>{employee.Address}</td>
                        <td>
                            <ButtonGroup vertical>
                                {(localStorage.getItem("Role")==="Manager")?(
                                <Button variant="success" onClick={()=>{
                                    this.setState({update:true});
                                    this.props.employeeReducer.SelectedEmployee = employee;
                                }}>Update</Button>):null}
                                {(localStorage.getItem("Role")==="Manager")?(
                                <Button variant="danger" onClick={()=>{
                                    this.props.deleteEmployee(token,employee.Id, this.props.employeeReducer.Employees);
                                }}>Delete</Button>):null}
                                {(localStorage.getItem("Role")==="User")?("No permission"):null}
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
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Employee Surname</th>
                        <th>Employee Address</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{employeeList}</tbody>
                </Table>
                {(localStorage.getItem("Role")==="Manager")?(
                <Button onClick={() => {this.setState({add: true})}}>ADD NEW EMPLOYEE</Button>):null}




                <Modal show={this.state.update}>
                    <Modal.Header closeButton onClick={() => {
                        this.setState({update: false});
                    }}>
                        <Modal.Title>Employee Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Update a employee</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandler}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Plate</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.employeeReducer.SelectedEmployee===null) ? ("Please enter name"):(this.props.employeeReducer.SelectedEmployee.Name)}
                                                                  ref={this.EmployeeNameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Seat Plan</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.employeeReducer.SelectedEmployee===null) ? ("Please enter surname"):(this.props.employeeReducer.SelectedEmployee.Surname)}
                                                                  ref={this.EmployeeSurnameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Bus Empty Seats</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder={(this.props.employeeReducer.SelectedEmployee===null) ? ("Please enter address"):(this.props.employeeReducer.SelectedEmployee.Address)}
                                                                  ref={this.EmployeeAddressElement}/>
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
                        <Modal.Title>Employee Add</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="UpdateProject">
                            <Card className="UpdateProject-Card">
                                <Card.Header className="UpdateProject-Card_Header">Add a employee</Card.Header>
                                <Card.Body className="UpdateProject-Card_Body">
                                    <Form className="UpdateProject-Card_Form" onSubmit={this.submitHandlerAdd}>
                                        <Row>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Employee Name</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Name"
                                                                  ref={this.EmployeeNameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Employee Surname</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Surname"
                                                                  ref={this.EmployeeSurnameElement}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md="auto">
                                                <Form.Group controlId="formBasicProjectName">
                                                    <Form.Label>Employee Address</Form.Label>
                                                    <Form.Control type="text"
                                                                  placeholder="Address"
                                                                  ref={this.EmployeeAddressElement}/>
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

                <Modal show={this.props.employeeReducer.Error}>
                    <Modal.Header closeButton onClick={this.props.setErrorFalseEmployee}>
                        <Modal.Title>Uppss, somethings went wrong...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.employeeReducer.Response}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.setErrorFalseEmployee}>
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
        employeeReducer: state.employeeReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployees: (token) => {
            dispatch(fetchEmployees(token));
        },
        updateEmployee: (token, employee ,employees) => {
            dispatch(updateEmployee(token, employee ,employees));
        },
        deleteEmployee: (token, employeeId ,employees) => {
            dispatch(deleteEmployee(token, employeeId ,employees));
        },
        addEmployee: (token, employee, employees) => {
            dispatch(addEmployee(token, employee, employees));
        },
        findEmployee: (token, employeeId) => {
            dispatch(findEmployee(token, employeeId));
        },
        setErrorFalseEmployee: () => {
            dispatch(setErrorFalseEmployee());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);

