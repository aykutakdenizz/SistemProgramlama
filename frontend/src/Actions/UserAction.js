export function fetchUsers(token) {
    return async dispatch => {
        let users = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/user/getUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                const s = resData.User;
                for (let i = 0; i < s.length; i++) {
                    let user = s[i];
                    users.push(user);
                }
            }else{
                response=resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_USER",
            payload: {
                Users: users,
                Response: response,
                Error: error,
            }
        });
    };
}

export function updateUser(token, user, users) {
    return async dispatch => {
        let new_users = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/user/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(user)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                users.forEach(aUser => {
                    if (aUser.Id !== user.Id) {
                        new_users.push(aUser);
                    }
                });
                if(resData.User != null){
                    new_users.push(resData.User);
                }
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "UPDATE_USER",
            payload: {
                Users: new_users,
                Response: response,
                Error: error,
            }
        });
    };
}

export function deleteUser(token, userId, users) {
    return async dispatch => {
        let new_users = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/user/deleteUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + userId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                users.forEach(aUser => {
                    if (aUser.Id !== userId) {
                        new_users.push(aUser);
                    }
                });
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "DELETE_USER",
            payload: {
                Users: new_users,
                Response: response,
                Error: error,
            }
        });
    };
}
export function findUser(token, userId) {
    return async dispatch => {
        let selected_user = null;
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/user/findUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + userId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                selected_user = resData.User;
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FIND_USER",
            payload: {
                FindUser: selected_user,
                Response: response,
                Error: error,
            }
        });
    };
}

export function setErrorFalseUser() {
    return async dispatch => {
        dispatch({
            type: "setErrorFalseUser",
            payload: {
                Response: "...",
                Error:false
            }
        });
    };
}