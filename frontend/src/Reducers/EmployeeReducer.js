
const initialEmployee = {
    Employees: [],
    FindEmployee: null,
    SelectedEmployee : null,
    Error: false,
    Response: "...",
};

const EmployeeReducer = (state= initialEmployee, action) => {
    switch (action.type) {
        case "FETCH_EMPLOYEE":
            state = {
                ...state,
                Employees: action.payload.Employees,
                Error: action.payload.Error,
                Response: action.payload.Response,
            };
            break;
        case "UPDATE_EMPLOYEE":
            state = {
                ...state,
                Employees: action.payload.Employees,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "DELETE_EMPLOYEE":
            state = {
                ...state,
                Employees: action.payload.Employees,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "ADD_EMPLOYEE":
            state = {
                ...state,
                Employees: action.payload.Employees,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "FIND_EMPLOYEE":
            state = {
                ...state,
                SelectedEmployee: action.payload.FindEmployee,
                Error: action.payload.Error,
                Response: action.payload.Response
            };
            break;
        case "setErrorFalseEmployee":
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
export default EmployeeReducer;

