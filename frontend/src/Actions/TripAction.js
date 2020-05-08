export function fetchTrips(token) {
    return async dispatch => {
        let trips = [];
        let response = [];
        let error = false;
        await fetch('http://localhost:8000/trip/getTrips', {
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
                const s = resData.Trip;
                for (let i = 0; i < s.length; i++) {
                    let trip = s[i];
                    trips.push(trip);
                }
            }else{
                response.push(resData.Error);
            }

        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_TRIP",
            payload: {
                Trips: trips,
                Response: response,
                Error: error,
            }
        });
    };
}
export function addTrip(token, trip, trips) {
    return async dispatch => {
        let new_trips = [];
        let response = [];
        let error = false;
        trip.Departure_Time = new Date(trip.Departure_Time);
        await fetch('http://localhost:8000/trip/addTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(trip)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                trips.forEach(aTrip => {
                    new_trips.push(aTrip);
                });
                new_trips.push(resData.Trip);
            }else{
                response.push(resData.Error);
            }

        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "ADD_TRIP",
            payload: {
                Trips: new_trips,
                Response: response,
                Error: error,
            }
        });
    };
}
export function updateTrip(token, trip, trips) {
    return async dispatch => {
        let new_trips = [];
        let response = [];
        let error = false;
        trip.Departure_Time = new Date(trip.Departure_Time);
        await fetch('http://localhost:8000/trip/updateTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(trip)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                trips.forEach(aTrip => {
                    if (aTrip.Id !== trip.Id) {
                        new_trips.push(aTrip);
                    }
                });
                if(resData.Trip!=null){
                    new_trips.push(resData.Trip);
                }
            }else{
                response.push(resData.Error);
            }

        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "UPDATE_TRIP",
            payload: {
                Trips: new_trips,
                Response: response,
                Error: error,
            }
        });
    };
}

export function deleteTrip(token, tripId, trips) {
    return async dispatch => {
        let new_trips = [];
        let response = [];
        let error = false;
        await fetch('http://localhost:8000/trip/deleteTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + tripId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                trips.forEach(aTrip => {
                    if (aTrip.Id !== tripId) {
                        new_trips.push(aTrip);
                    }
                });
            }else{
                response.push(resData.Error);
            }

        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "DELETE_TRIP",
            payload: {
                Trips: new_trips,
                Response: response,
                Error: error,
            }
        });
    };
}
export function findTrip(token, tripId) {
    return async dispatch => {
        let selected_trip = null;
        let response = [];
        let error = false;
        let show = false;
        await fetch('http://localhost:8000/trip/findTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + tripId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                selected_trip = resData.Trip;
                response.push("Destination:"+selected_trip.Destination);
                response.push("Departure:"+selected_trip.Departure);
                response.push( "Departure Time:"+new Date(selected_trip.Departure_Time));
                response.push("Bus Id:"+selected_trip.Bus_Id);
                response.push("Driver Id:"+selected_trip.Driver_Id);
                response.push("Payment:"+selected_trip.Payment);
                show = true;
            }else{
                response.push(resData.Error);
            }

        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FIND_TRIP",
            payload: {
                FindTrip: selected_trip,
                Response: response,
                Error: error,
                Show: show,
            }
        });
    };
}

export function findTripWithTicket(token, id) {
    return async dispatch => {
        let selected_trip = null;
        let response = [];
        let error = false;
        let show = false;
        await fetch('http://localhost:8000/trip/findTripWithTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Ticket_Id":' + id + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                selected_trip = resData.Trip;
                response.push("Destination:"+selected_trip.Destination);
                response.push("Departure:"+selected_trip.Departure);
                response.push( "Departure Time:"+new Date(selected_trip.Departure_Time));
                response.push("Bus Id:"+selected_trip.Bus_Id);
                response.push("Driver Id:"+selected_trip.Driver_Id);
                response.push("Payment:"+selected_trip.Payment);
                show = true;
            }else{
                response.push(resData.Error);
            }

        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FIND_TRIP_WITH_TICKET",
            payload: {
                FindTrip: selected_trip,
                Response: response,
                Error: error,
                Show: show,
            }
        });
    };
}

export function setErrorFalseTrip() {
    return async dispatch => {
        dispatch({
            type: "setErrorFalseTrip",
            payload: {
                Response: [],
                Error:false
            }
        });
    };
}

export function setShowFalseTrip() {
    return async dispatch => {
        dispatch({
            type: "setShowFalseTrip",
            payload: {
                Response: [],
                Show:false
            }
        });
    };
}