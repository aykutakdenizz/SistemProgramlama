
const initialTrip = {
    Trips: [],
    FindTrip: null,
    SelectedTrip : null,
    Error: false,
    Response: "...",
};

const TripReducer = (state= initialTrip, action) => {
    switch (action.type) {
        case "FETCH_TRIP":
            state = {
                ...state,
                Trips: action.payload.Trips,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "ADD_TRIP":
            state = {
                ...state,
                Trips: action.payload.Trips,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "UPDATE_TRIP":
            state = {
                ...state,
                Trips: action.payload.Trips,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "DELETE_TRIP":
            state = {
                ...state,
                Trips: action.payload.Trips,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "FIND_TRIP":
            state = {
                ...state,
                SelectedTrip: action.payload.FindTrip,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "setErrorFalseTrip":
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
export default TripReducer;

