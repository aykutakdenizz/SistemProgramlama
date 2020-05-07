
const initialMain = {
    Token: null,
    Error: false,
    Response: "...",
};

const MainReducer = (state= initialMain, action) => {
    switch (action.type) {
        case "LOG_IN":
            state = {
                ...state,
                Token: action.payload.Token,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "SIGN_UP":
            state = {
                ...state,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "setErrorFalseMain":
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
export default MainReducer;

