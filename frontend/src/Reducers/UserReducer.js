
const initialUser = {
    Users: [],
    FindUser: null,
};

const UserReducer = (state= initialUser, action) => {
    switch (action.type) {
        case "FETCH_USER":
            state = {
                ...state,
                Users: action.payload
            };
            break;
        case "UPDATE_USER":
            state = {
                ...state,
                Users: action.payload
            };
            break;
        case "DELETE_USER":
            state = {
                ...state,
                Users: action.payload
            };
            break;
        case "FIND_USER":
            state = {
                ...state,
                FindUser: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};
export default UserReducer;

