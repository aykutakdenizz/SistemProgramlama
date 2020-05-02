export function fetchUsers(token) {
    return async dispatch => {
        let users = [];
        await fetch('http://localhost:8000/user/getUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            const s = resData.User;
            for (let i = 0; i < s.length; i++) {
                let user = s[i];
                users.push(user);
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_USER",
            payload: users
        });
    };
}

export function updateUser(token, user, users) {
    return async dispatch => {
        let new_users = [];
        await fetch('http://localhost:8000/user/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(user)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            users.forEach(aUser => {
                if (aUser.Id !== user.Id) {
                    new_users.push(aUser);
                }
            });
            if(resData.User != null){
                new_users.push(resData.User);
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "UPDATE_USER",
            payload: new_users
        });
    };
}

export function deleteUser(token, userId, users) {
    return async dispatch => {
        let new_users = [];
        await fetch('http://localhost:8000/user/deleteUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + userId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            users.forEach(aUser => {
                if (aUser.Id !== userId) {
                    new_users.push(aUser);
                }
            });
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "DELETE_USER",
            payload: new_users
        });
    };
}
export function findUser(token, userId) {
    return async dispatch => {
        let selected_user = null;
        await fetch('http://localhost:8000/user/findUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + userId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            selected_user = resData.User;
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FIND_USER",
            payload: selected_user
        });
    };
}