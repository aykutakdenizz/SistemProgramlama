
const initialBus = {
    Buses: [],
    FindBus: null,
};

const BusReducer = (state= initialBus, action) => {
    switch (action.type) {
        case "FETCH_BUS":
            state = {
                ...state,
                Buses: action.payload
            };
            break;
        case "UPDATE_BUS":
            state = {
                ...state,
                Buses: action.payload
            };
            break;
        case "DELETE_BUS":
            state = {
                ...state,
                Buses: action.payload
            };
            break;
        case "ADD_BUS":
            state = {
                ...state,
                Buses: action.payload
            };
            break;
        case "FIND_BUS":
            state = {
                ...state,
                FindBus: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};
export default BusReducer;

