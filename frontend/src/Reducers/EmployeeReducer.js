
const initialEmployee = {
    Employees: [],
    FindEmployee: null,
};

const EmployeeReducer = (state= initialEmployee, action) => {
    switch (action.type) {
        case "FETCH_EMPLOYEE":
            state = {
                ...state,
                Employees: action.payload
            };
            break;
        case "UPDATE_EMPLOYEE":
            state = {
                ...state,
                Employees: action.payload
            };
            break;
        case "DELETE_EMPLOYEE":
            state = {
                ...state,
                Employees: action.payload
            };
            break;
        case "ADD_EMPLOYEE":
            state = {
                ...state,
                Employees: action.payload
            };
            break;
        case "FIND_EMPLOYEE":
            state = {
                ...state,
                FindEmployee: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};
export default EmployeeReducer;

