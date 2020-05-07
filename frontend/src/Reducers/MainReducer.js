
const initialMain = {
    Token: null,
    Success:false,
    Show:false,
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
                Success:action.payload.Success,
            };
            break;
        case "SIGN_UP":
            state = {
                ...state,
                Error: action.payload.Error,
                Response: action.payload.Response,
                Show: action.payload.Show,
            };
            break;
        case "setErrorFalseMain":
            state = {
                ...state,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "setSuccessFalseMain":
            state = {
                ...state,
                Success: action.payload.Success
            };
            break;
        case "setShowFalseMain":
            state = {
                ...state,
                Show: action.payload.Show
            };
            break;
        default:
            break;
    }
    return state;
};
export default MainReducer;

