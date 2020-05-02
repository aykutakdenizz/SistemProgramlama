export function fetchManagers(token) {
    return async dispatch => {
        let managers = [];
        await fetch('http://localhost:8000/manager/getManagers', {
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
            const s = resData.Manager;
            for (let i = 0; i < s.length; i++) {
                let manager = s[i];
                managers.push(manager);
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_MANAGER",
            payload: managers
        });
    };
}

export function updateManager(token, manager, managers) {
    return async dispatch => {
        let new_managers = [];
        await fetch('http://localhost:8000/manager/updateManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(manager)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            managers.forEach(aManager => {
                if (aManager.Id !== manager.Id) {
                    new_managers.push(aManager);
                }
            });
            if(resData.Manager != null){
                new_managers.push(resData.Manager);
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "UPDATE_MANAGER",
            payload: new_managers
        });
    };
}

export function deleteManager(token, managerId, managers) {
    return async dispatch => {
        let new_managers = [];
        await fetch('http://localhost:8000/manager/deleteManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + managerId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            managers.forEach(aManager => {
                if (aManager.Id !== managerId) {
                    new_managers.push(aManager);
                }
            });
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "DELETE_MANAGER",
            payload: new_managers
        });
    };
}
export function findManager(token, managerId) {
    return async dispatch => {
        let selected_manager = null;
        await fetch('http://localhost:8000/manager/findManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + managerId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            selected_manager = resData.Manager;
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FIND_MANAGER",
            payload: selected_manager
        });
    };
}