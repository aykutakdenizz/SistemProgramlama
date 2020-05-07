export function login(person) {
    return async dispatch => {
        let token=null;
        let response = "..";
        let error = false;
        let success = false;
        if(person.Role==="Manager"){
            person.Role = "Manager";
        }else{
            person.Role = "User";
        }
        await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(person)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                token =resData.Token;
                localStorage.setItem("token", token);
                localStorage.setItem("Role", resData.Role);
                localStorage.setItem("Id", resData.Id);
                success = true;
            }else{
                response = resData.Error;
                success=false;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "LOG_IN",
            payload: {
                Token: token,
                Error: error,
                Response: response,
                Success:success,
            }
        });
    };
}

export function signup(person) {
    return async dispatch => {
        let response = "..";
        let error = false;
        let show = false;
        await fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(person)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                error = true;
            }
            return res.json();
        }).then(resData => {
            if(!error){
                show = true;
                response = "You redirect login page";
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "SIGN_UP",
            payload: {
                Error: error,
                Response: response,
                Show: show,
            }
        });
    };
}

export function setErrorFalseMain() {
    return async dispatch => {
        dispatch({
            type: "setErrorFalseMain",
            payload: {
                Response: "...",
                Error:false
            }
        });
    };
}

export function setSuccessFalseMain() {
    return async dispatch => {
        dispatch({
            type: "setSuccessFalseMain",
            payload: {
                Success:false
            }
        });
    };
}

export function setShowFalseMain() {
    return async dispatch => {
        dispatch({
            type: "setShowFalseMain",
            payload: {
                Show:false
            }
        });
    };
}

