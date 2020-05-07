const initialUser = {
    Users: [],
    FindUser: null,
    SelectedUser : null,
    Error: false,
    Response: "...",
};

const UserReducer = (state = initialUser, action) => {
    switch (action.type) {
        case "FETCH_USER":
            state = {
                ...state,
                Users: action.payload.Users,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "FETCH_USER_WITH_TOKEN":
            state = {
                ...state,
                Users: action.payload.Users,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "UPDATE_USER":
            state = {
                ...state,
                Users: action.payload.Users,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "DELETE_USER":
            state = {
                ...state,
                Users: action.payload.Users,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "FIND_USER":
            state = {
                ...state,
                SelectedUser: action.payload.FindUser,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "setErrorFalseUser":
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
export default UserReducer;

