
const initialBus = {
    Buses: [],
    FindBus: null,
    SelectedBus : null,
    Response: "...",
    Error: false,
};

const BusReducer = (state= initialBus, action) => {
    switch (action.type) {
        case "FETCH_BUS":
            state = {
                ...state,
                Buses: action.payload.Buses,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "UPDATE_BUS":
            state = {
                ...state,
                Buses: action.payload.Buses,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "DELETE_BUS":
            state = {
                ...state,
                Buses: action.payload.Buses,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "ADD_BUS":
            state = {
                ...state,
                Buses: action.payload.Buses,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "FIND_BUS":
            state = {
                ...state,
                SelectedBus: action.payload.FindBus,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "FIND_BUS_WITH_TRIP":
            state = {
                ...state,
                SelectedBus: action.payload.FindBus,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "setErrorFalseBus":
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
export default BusReducer;

