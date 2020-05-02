export function fetchBuses(token) {
    return async dispatch => {
        let buses = [];
        await fetch('http://localhost:8000/bus/getBuses', {
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
            const s = resData.Bus;
            for (let i = 0; i < s.length; i++) {
                let bus = s[i];
                buses.push(bus);
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_BUS",
            payload: buses
        });
    };
}
export function addBus(token, bus, buses) {
    return async dispatch => {
        let new_buses = [];
        await fetch('http://localhost:8000/bus/addBus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(bus)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            buses.forEach(aBus => {
                new_buses.push(aBus);
            });
            new_buses.push(resData.Bus);
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "ADD_BUS",
            payload: new_buses
        });
    };
}
export function updateBus(token, bus, buses) {
    return async dispatch => {
        let new_buses = [];
        await fetch('http://localhost:8000/bus/updateBus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(bus)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            buses.forEach(aBus => {
                if (aBus.Id !== bus.Id) {
                    new_buses.push(aBus);
                }
            });
            if(resData.Bus != null){
                new_buses.push(resData.Bus);
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "UPDATE_BUS",
            payload: new_buses
        });
    };
}

export function deleteBus(token, busId, buses) {
    return async dispatch => {
        let new_buses = [];
        await fetch('http://localhost:8000/bus/deleteBus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + busId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            buses.forEach(aBus => {
                if (aBus.Id !== busId) {
                    new_buses.push(aBus);
                }
            });
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "DELETE_BUS",
            payload: new_buses
        });
    };
}
export function findBus(token, busId) {
    return async dispatch => {
        let selected_bus = null;
        await fetch('http://localhost:8000/bus/findBus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + busId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            selected_bus = resData.Bus;
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FIND_BUS",
            payload: selected_bus
        });
    };
}