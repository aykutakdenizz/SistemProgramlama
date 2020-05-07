
const initialTrip = {
    Trips: [],
    FindTrip: null,
    SelectedTrip : null,
    Show:false,
    Error: false,
    Response: [],
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
        case "FIND_TRIP_WITH_TICKET":
            state = {
                ...state,
                SelectedTrip: action.payload.FindTrip,
                Error: action.payload.Error,
                Response: action.payload.Response,
                Show: action.payload.Show,
            };
            break;
        case "setErrorFalseTrip":
            state = {
                ...state,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "setShowFalseTrip":
            state = {
                ...state,
                Show: action.payload.Show,
                Response: action.payload.Response
            };
            break;
        default:
            break;
    }
    return state;
};
export default TripReducer;

