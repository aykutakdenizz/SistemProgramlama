import React, {Component} from 'react';
import {connect} from "react-redux";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {deleteUser, fetchUsers, findUser, updateUser} from "../Actions/UserAction";

let token = null;

class User extends Component {

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
                        <td>{user.Password}</td>
                        <td>{user.Money}</td>
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
                        <th>User Money</th>
                    </tr>
                    </thead>
                    <tbody>{userList}</tbody>
                </Table>
                <Button onClick={() => {this.props.deleteUser(token,6, this.props.userReducer.Users);}} >SIL</Button>

                <Button onClick={() => {this.props.updateUser(token,
                    {Id:38,Name:"name1",Real_Name:"Real_name1",Surname:"surname1",Password:"1",Money:12}, this.props.userReducer.Users);}} >UPDATE</Button>
                <Button onClick={() => {this.props.findUser(token,1);}} >FIND</Button>
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
        updateUser: (token, user ,users) => {
            dispatch(updateUser(token, user ,users));
        },
        deleteUser: (token, userId ,users) => {
            dispatch(deleteUser(token, userId ,users));
        },
        findUser: (token, userId) => {
            dispatch(findUser(token, userId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

