export function login(person) {
    return async dispatch => {
        let token=null;
        let response = "..";
        let error = false;
        //console.log("Xx"+JSON.stringify(person));
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
            }else{
                response = resData.Error;
            }
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "LOG_IN",
            payload: {
                Token: token,
                Error: error,
                Response: response
            }
        });
    };
}

export function signup(person) {
    return async dispatch => {
        let response = "..";
        let error = false;
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
                Response: response
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
