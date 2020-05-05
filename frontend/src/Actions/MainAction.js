export function login(person) {
    return async dispatch => {
        let token=null;
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
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            token =resData.token;
            localStorage.setItem("token", resData.token);
        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "LOG_IN",
            payload: token
        });
    };
}

export function signup(person) {
    return async dispatch => {
        await fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(person)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {

        }).catch(err => {
            console.log(err);
        });

        dispatch({
            type: "SIGN_UP",
            payload: null
        });
    };
}
