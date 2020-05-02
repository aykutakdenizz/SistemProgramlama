import {applyMiddleware, combineReducers, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";

import busReducer from "./Reducers/BusReducer";
import employeeReducer from "./Reducers/EmployeeReducer";
import ticketReducer from "./Reducers/TicketReducer";
import tripReducer from "./Reducers/TripReducer";
import mainReducer from "./Reducers/MainReducer";
import userReducer from "./Reducers/UserReducer";
import managerReducer from "./Reducers/ManagerReducer";

const store = createStore(
    combineReducers({
        busReducer:busReducer,
        employeeReducer:employeeReducer,
        ticketReducer:ticketReducer,
        mainReducer:mainReducer,
        tripReducer:tripReducer,
        userReducer:userReducer,
        managerReducer:managerReducer,
    }),
    {},
    applyMiddleware(createLogger(),thunk)
);
export default store;