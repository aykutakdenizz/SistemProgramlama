
const initialTicket = {
    Tickets: [],
    User:null,
    SelectedTicket : null,
    Success:false,
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
        case "FETCH_TICKET_with_token":
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
                Success: action.payload.Success,
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
                SelectedTicket: action.payload.FindTicket,
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
        case "setSuccessFalseTicket":
            state = {
                ...state,
                Success: action.payload.Success,
                Response: action.payload.Response
            };
            break;
        default:
            break;
    }
    return state;
};
export default TicketReducer;

