
const initialMain = {
    Token: null
};

const MainReducer = (state= initialMain, action) => {
    switch (action.type) {
        case "LOG_IN":
            state = {
                ...state,
                Token: action.payload
            };
            break;
        case "SIGN_UP":
            state = {
                ...state,
            };
            break;
        default:
            break;
    }
    return state;
};
export default MainReducer;

