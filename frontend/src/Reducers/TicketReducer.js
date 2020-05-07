
const initialTicket = {
    Tickets: [],
    User:null,
    SelectedTicket : null,
    Error: false,
    Response: "...",
};

const TicketReducer = (state= initialTicket, action) => {
    switch (action.type) {
        case "FETCH_TICKET":
            state = {
                ...state,
                Tickets: action.payload.Tickets,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "FETCH_USER_TICKET":
            state = {
                ...state,
                Tickets: action.payload.Tickets,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "ADD_TICKET":
            state = {
                ...state,
                Tickets: action.payload.Tickets,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "UPDATE_TICKET":
            state = {
                ...state,
                Tickets: action.payload.Tickets,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "DELETE_TICKET":
            state = {
                ...state,
                Tickets: action.payload.Tickets,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "FIND_TICKET":
            state = {
                ...state,
                SelectedTicket: action.payload.Tickets,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "setErrorFalseTicket":
            state = {
                ...state,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        default:
            break;
    }
    return state;
};
export default TicketReducer;

