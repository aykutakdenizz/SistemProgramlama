export function fetchTickets(token) {
    return async dispatch => {
        let tickets = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/ticket/getTickets', {
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
                const s = resData.Ticket;
                for (let i = 0; i < s.length; i++) {
                    let ticket = s[i];
                    tickets.push(ticket);
                }
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_TICKET",
            payload: {
                Tickets :tickets,
                Response: response,
                Error: error,
            }
        });
    };
}

export function fetchTicketsWithToken(token) {
    return async dispatch => {
        let tickets = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/ticket/getTicketsWithToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Token":"' + token + '"}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                const s = resData.Ticket;
                for (let i = 0; i < s.length; i++) {
                    let ticket = s[i];
                    tickets.push(ticket);
                }
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_TICKET_with_token",
            payload: {
                Tickets: tickets,
                Response: response,
                Error: error,
            }
        });
    };
}

export function addTicket(token, ticket, tickets) {
    return async dispatch => {
        let new_tickets = [];
        let response = "..";
        let error = false;
        let success = false;
        await fetch('http://localhost:8000/ticket/addTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(ticket)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                if(resData.Ticket === 1){
                    response = "Ticket bought";
                    success = true;
                }else{
                    response = "Error occurred try again";
                    error = true;
                }
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "ADD_TICKET",
            payload: {
                Tickets: new_tickets,
                Response: response,
                Error: error,
                Success:success,
            }
        });
    };
}

export function updateTicket(token, ticket, tickets) {
    return async dispatch => {
        let new_tickets = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/ticket/updateTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(ticket)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                tickets.forEach(aTicket => {
                    if (aTicket.Id !== ticket.Id) {
                        new_tickets.push(aTicket);
                    }
                });
                if(resData.Ticket != null){
                    new_tickets.push(resData.Ticket);
                }
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "UPDATE_TICKET",
            payload: {
                Tickets: new_tickets,
                Response: response,
                Error: error,
            }
        });
    };
}

export function deleteTicket(token, ticketId, tickets) {
    return async dispatch => {
        let new_tickets = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/ticket/deleteTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + ticketId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                tickets.forEach(aTicket => {
                    if (aTicket.Id !== ticketId) {
                        new_tickets.push(aTicket);
                    }
                });
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "DELETE_TICKET",
            payload: {
                Tickets: new_tickets,
                Response: response,
                Error: error,
            }
        });
    };
}

export function findTicket(token, ticketId) {
    return async dispatch => {
        let selected_ticket = null;
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/ticket/findTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + ticketId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                selected_ticket = resData.Ticket;
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FIND_TICKET",
            payload: {
                FindTicket: selected_ticket,
                Response: response,
                Error: error,
            }
        });
    };
}

export function setErrorFalseTicket() {
    return async dispatch => {
        dispatch({
            type: "setErrorFalseTicket",
            payload: {
                Response: "...",
                Error:false
            }
        });
    };
}

export function setSuccessFalseTicket() {
    return async dispatch => {
        dispatch({
            type: "setSuccessFalseTicket",
            payload: {
                Response: "...",
                Success:false
            }
        });
    };
}