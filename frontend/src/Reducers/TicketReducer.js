
const initialTicket = {
    Tickets: [],
    User:null
};

const TicketReducer = (state= initialTicket, action) => {
    switch (action.type) {
        case "FETCH_TICKET":
            state = {
                ...state,
                Tickets: action.payload
            };
            break;
        case "bos_BUS":
            state = {
                ...state,
                Tickets: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};
export default TicketReducer;

