export function fetchTrips(token) {
    return async dispatch => {
        let trips = [];
        await fetch('http://localhost:8000/trip/getTrips', {
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
            const s = resData.Trip;
            for (let i = 0; i < s.length; i++) {
                let trip = s[i];
                trips.push(trip);
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_TRIP",
            payload: trips
        });
    };
}
export function addTrip(token, trip, trips) {
    return async dispatch => {
        let new_trips = [];
        await fetch('http://localhost:8000/trip/addTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(trip)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            trips.forEach(aTrip => {
                new_trips.push(aTrip);
            });
            new_trips.push(resData.Trip);
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "ADD_TRIP",
            payload: new_trips
        });
    };
}
export function updateTrip(token, trip, trips) {
    return async dispatch => {
        let new_trips = [];
        await fetch('http://localhost:8000/trip/updateTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(trip)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            trips.forEach(aTrip => {
                if (aTrip.Id !== trip.Id) {
                    new_trips.push(aTrip);
                }
            });
            if(resData.Trip!=null){
                new_trips.push(resData.Trip);
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "UPDATE_TRIP",
            payload: new_trips
        });
    };
}

export function deleteTrip(token, tripId, trips) {
    return async dispatch => {
        let new_trips = [];
        await fetch('http://localhost:8000/trip/deleteTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + tripId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            trips.forEach(aTrip => {
                if (aTrip.Id !== tripId) {
                    new_trips.push(aTrip);
                }
            });
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "DELETE_TRIP",
            payload: new_trips
        });
    };
}
export function findTrip(token, tripId) {
    return async dispatch => {
        let selected_trip = null;
        await fetch('http://localhost:8000/trip/findTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + tripId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            selected_trip = resData.Trip;
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FIND_TRIP",
            payload: selected_trip
        });
    };
}