
const initialTrip = {
    Trips: [],
    FindTrip: null,
};

const TripReducer = (state= initialTrip, action) => {
    switch (action.type) {
        case "FETCH_TRIP":
            state = {
                ...state,
                Trips: action.payload
            };
            break;
        case "ADD_TRIP":
            state = {
                ...state,
                Trips: action.payload
            };
            break;
        case "UPDATE_TRIP":
            state = {
                ...state,
                Trips: action.payload
            };
            break;
        case "DELETE_TRIP":
            state = {
                ...state,
                Trips: action.payload
            };
            break;
        case "FIND_TRIP":
            state = {
                ...state,
                FindTrip: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};
export default TripReducer;

