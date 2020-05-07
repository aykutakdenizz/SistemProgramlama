export function fetchEmployees(token) {
    return async dispatch => {
        let employees = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/employee/getEmployees', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                const s = resData.Employee;
                for (let i = 0; i < s.length; i++) {
                    let emp = s[i];
                    employees.push(emp);
                }
            }else{
                response = resData.Error;
            }

        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "FETCH_EMPLOYEE",
            payload: {
                Employees: employees,
                Response: response,
                Error: error,
            }
        });
    };
}

export function addEmployee(token, employee, employees) {
    return async dispatch => {
        let new_employees = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/employee/addEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(employee)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                employees.forEach(aEmployee => {
                    new_employees.push(aEmployee);
                });
                new_employees.push(resData.Employee);
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "ADD_EMPLOYEE",
            payload: {
                Employees: new_employees,
                Response: response,
                Error: error,
            }
        });
    };
}

export function updateEmployee(token, employee, employees) {
    return async dispatch => {
        let new_employees = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/employee/updateEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(employee)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error  = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                employees.forEach(aEmployee => {
                    if (aEmployee.Id !== employee.Id) {
                        new_employees.push(aEmployee);
                    }
                });
                if(resData.Employee!=null){
                    new_employees.push(resData.Employee);
                }
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });
        dispatch({
            type: "UPDATE_EMPLOYEE",
            payload: {
                Employees: new_employees,
                Response: response,
                Error: error,
            }
        });
    };
}

export function deleteEmployee(token, employeeId, employees) {
    return async dispatch => {
        let new_employees = [];
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/employee/deleteEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + employeeId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                employees.forEach(aEmployee => {
                    if (aEmployee.Id !== employeeId) {
                        new_employees.push(aEmployee);
                    }
                });
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });
        dispatch({
            type: "DELETE_EMPLOYEE",
            payload: {
                Employees: new_employees,
                Response: response,
                Error: error,
            }
        });
    };
}

export function findEmployee(token, employeeId) {
    return async dispatch => {
        let selected_employee = null;
        let response = "..";
        let error = false;
        await fetch('http://localhost:8000/employee/findEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: '{"Id":' + employeeId + '}'
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error=true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                selected_employee = resData.Employee;
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });
        dispatch({
            type: "FIND_EMPLOYEE",
            payload: {
                FindEmployee: selected_employee,
                Response: response,
                Error: error,
            }
        });
    };
}

export function setErrorFalseEmployee() {
    return async dispatch => {
        dispatch({
            type: "setErrorFalseEmployee",
            payload: {
                Response: "...",
                Error:false
            }
        });
    };
}