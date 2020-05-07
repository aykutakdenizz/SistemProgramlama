export function fetchManagers(token) {
    return async dispatch => {
        let managers = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/manager/getManagers', {
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
                const s = resData.Manager;
                for (let i = 0; i < s.length; i++) {
                    let manager = s[i];
                    managers.push(manager);
                }
            }else{
                response = resData.Error;
            }

        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_MANAGER",
            payload: {
                Managers: managers,
                Response: response,
                Error: error,
            }
        });
    };
}

export function updateManager(token, manager, managers) {
    return async dispatch => {
        let new_managers = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/manager/updateManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(manager)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                managers.forEach(aManager => {
                    if (aManager.Id !== manager.Id) {
                        new_managers.push(aManager);
                    }
                });
                if(resData.Manager != null){
                    new_managers.push(resData.Manager);
                }
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "UPDATE_MANAGER",
            payload: {
                Managers: new_managers,
                Response: response,
                Error: error,
            }
        });
    };
}

export function deleteManager(token, managerId, managers) {
    return async dispatch => {
        let new_managers = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/manager/deleteManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + managerId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                managers.forEach(aManager => {
                    if (aManager.Id !== managerId) {
                        new_managers.push(aManager);
                    }
                });
            }else{
                response = resData.Error;
            }

        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "DELETE_MANAGER",
            payload: {
                Managers: new_managers,
                Response: response,
                Error: error,
            }
        });
    };
}
export function findManager(token, managerId) {
    return async dispatch => {
        let selected_manager = null;
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/manager/findManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + managerId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                selected_manager = resData.Manager;
            }else{
                response = resData.Error;
            }

        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FIND_MANAGER",
            payload: {
                FindManager: selected_manager,
                Response: response,
                Error: error,
            }
        });
    };
}

export function setErrorFalseManager() {
    return async dispatch => {
        dispatch({
            type: "setErrorFalseManager",
            payload: {
                Response: "...",
                Error:false
            }
        });
    };
}