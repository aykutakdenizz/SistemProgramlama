
const initialUser = {
    Managers: [],
    FindManager: null,
};

const ManagerReducer = (state= initialUser, action) => {
    switch (action.type) {
        case "FETCH_MANAGER":
            state = {
                ...state,
                Managers: action.payload
            };
            break;
        case "UPDATE_MANAGER":
            state = {
                ...state,
                Managers: action.payload
            };
            break;
        case "DELETE_MANAGER":
            state = {
                ...state,
                Managers: action.payload
            };
            break;
        case "FIND_MANAGER":
            state = {
                ...state,
                FindManager: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};
export default ManagerReducer;

