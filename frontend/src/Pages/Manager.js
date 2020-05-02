import React, {Component} from 'react';
import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {deleteManager, fetchManagers, findManager, updateManager} from "../Actions/ManagerAction";

let token = null;

class Manager extends Component {

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
                        <td>{manager.Password}</td>
                    </tr>

                )
            }
        );
        return (
            <React.Fragment>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>User Real_Name</th>
                        <th>User Surname</th>
                        <th>User Password</th>
                    </tr>
                    </thead>
                    <tbody>{managerList}</tbody>
                </Table>
                <Button onClick={() => {this.props.deleteManager(token,6, this.props.managerReducer.Managers);}} >SIL</Button>

                <Button onClick={() => {this.props.updateManager(token,
                    {Id:38,Name:"name1",Real_Name:"Real_name1",Surname:"surname1",Password:"1"},
                    this.props.managerReducer.Managers);}} >UPDATE</Button>
                <Button onClick={() => {this.props.findManager(token,1);}} >FIND</Button>
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
        updateManager: (token, manager ,managers) => {
            dispatch(updateManager(token, manager ,managers));
        },
        deleteManager: (token, managerId ,managers) => {
            dispatch(deleteManager(token, managerId ,managers));
        },
        findManager: (token, managerId) => {
            dispatch(findManager(token, managerId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);

