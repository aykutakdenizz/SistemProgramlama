
const initialUser = {
    Managers: [],
    FindManager: null,
    SelectedManager : null,
    Error: false,
    Response: "...",
};

const ManagerReducer = (state= initialUser, action) => {
    switch (action.type) {
        case "FETCH_MANAGER":
            state = {
                ...state,
                Managers: action.payload.Managers,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "UPDATE_MANAGER":
            state = {
                ...state,
                Managers: action.payload.Managers,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "DELETE_MANAGER":
            state = {
                ...state,
                Managers: action.payload.Managers,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "FIND_MANAGER":
            state = {
                ...state,
                SelectedManager: action.payload.FindManager,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "setErrorFalseManager":
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
export default ManagerReducer;

