export function fetchEmployees(token) {
    return async dispatch => {
        let employees = [];
        await fetch('http://localhost:8000/employee/getEmployees', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            const s = resData.Employee;
            for (let i = 0; i < s.length; i++) {
                let emp = s[i];
                employees.push(emp);
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_EMPLOYEE",
            payload: employees
        });
    };
}
export function addEmployee(token, employee, employees) {
    return async dispatch => {
        let new_employees = [];
        await fetch('http://localhost:8000/employee/addEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(employee)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            employees.forEach(aEmployee => {
                new_employees.push(aEmployee);
            });
            new_employees.push(resData.Employee);
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "ADD_EMPLOYEE",
            payload: new_employees
        });
    };
}
export function updateEmployee(token, employee, employees) {
    return async dispatch => {
        let new_employees = [];
        await fetch('http://localhost:8000/employee/updateEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(employee)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            employees.forEach(aEmployee => {
                if (aEmployee.Id !== employee.Id) {
                    new_employees.push(aEmployee);
                }
            });
            if(resData.Employee!=null){
                new_employees.push(resData.Employee);
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "UPDATE_EMPLOYEE",
            payload: new_employees
        });
    };
}

export function deleteEmployee(token, employeeId, employees) {
    return async dispatch => {
        let new_employees = [];
        await fetch('http://localhost:8000/employee/deleteEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + employeeId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            employees.forEach(aEmployee => {
                if (aEmployee.Id !== employeeId) {
                    new_employees.push(aEmployee);
                }
            });
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "DELETE_EMPLOYEE",
            payload: new_employees
        });
    };
}
export function findEmployee(token, employeeId) {
    return async dispatch => {
        let selected_employee = null;
        await fetch('http://localhost:8000/employee/findEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + employeeId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            selected_employee = resData.Employee;
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FIND_EMPLOYEE",
            payload: selected_employee
        });
    };
}