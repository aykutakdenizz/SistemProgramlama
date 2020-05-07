const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.UserData = decoded;
        const role = req.UserData.Role;
        if(role==="User"){
            next();
        }
        else{
            return res.status(401).json({
                Error: 'Auth failed (Only user)!'
            })
        }
    }catch (error){
        return res.status(401).json({
            Error: 'Auth failed !'
        })
    }
};