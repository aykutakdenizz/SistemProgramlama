import React, {Component} from 'react';
import {connect} from "react-redux";

import {deleteEmployee, fetchEmployees, updateEmployee, addEmployee, findEmployee} from "../Actions/EmployeeAction";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

let token = null;

class Employee extends Component {

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
                    </tr>

                )
            }
        );
        return (
            <React.Fragment>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Employee Surname</th>
                        <th>Employee Address</th>
                    </tr>
                    </thead>
                    <tbody>{employeeList}</tbody>
                </Table>
                <Button onClick={() => {this.props.deleteEmployee(token,6, this.props.employeeReducer.Employees);}} >SIL</Button>
                <Button onClick={() => {this.props.addEmployee(token,
                    {Name:"name1",Surname:"surname1",Address:"address"}, this.props.employeeReducer.Employees);}} >ADD</Button>
                <Button onClick={() => {this.props.updateEmployee(token,
                    {Id:38,Name:"name1",Surname:"surname1",Address:"address"}, this.props.employeeReducer.Employees);}} >UPDATE</Button>
                <Button onClick={() => {this.props.findEmployee(token,1);}} >FIND</Button>
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);

