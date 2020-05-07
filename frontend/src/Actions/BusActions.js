export function fetchBuses(token) {
    return async dispatch => {
        let buses = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/bus/getBuses', {
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
                const s = resData.Bus;
                for (let i = 0; i < s.length; i++) {
                    let bus = s[i];
                    buses.push(bus);
                }
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_BUS",
            payload: {
                Buses:buses,
                Response: response,
                Error: error,
            }
        });
    };
}

export function addBus(token, bus, buses) {
    return async dispatch => {
        let new_buses = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/bus/addBus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(bus)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                buses.forEach(aBus => {
                    new_buses.push(aBus);
                });
                new_buses.push(resData.Bus);
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "ADD_BUS",
            payload: {
                Buses: new_buses,
                Response: response,
                Error: error,
            }
        });
    };
}

export function updateBus(token, bus, buses) {
    return async dispatch => {
        let new_buses = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/bus/updateBus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(bus)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                buses.forEach(aBus => {
                    if (aBus.Id !== bus.Id) {
                        new_buses.push(aBus);
                    }
                });
                if(resData.Bus != null){
                    new_buses.push(resData.Bus);
                }
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "UPDATE_BUS",
            payload: {
                Buses: new_buses,
                Response: response,
                Error: error,
            }
        });
    };
}

export function deleteBus(token, busId, buses) {
    return async dispatch => {
        let new_buses = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/bus/deleteBus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + busId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                buses.forEach(aBus => {
                    if (aBus.Id !== busId) {
                        new_buses.push(aBus);
                    }
                });
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "DELETE_BUS",
            payload: {
                Buses: new_buses,
                Response: response,
                Error: error,
            }
        });
    };
}
export function findBus(token, busId) {
    return async dispatch => {
        let selected_bus = null;
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/bus/findBus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + busId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                selected_bus = resData.Bus;
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FIND_BUS",
            payload: {
                FindBus: selected_bus,
                Response: response,
                Error: error,
            }
        });
    };
}

export function setErrorFalseBus() {
    return async dispatch => {
        dispatch({
            type: "setErrorFalseBus",
            payload: {
                Response: "...",
                Error:false
            }
        });
    };
}