const express = require('express');
const db = require('./Configuration/dbConfiguration');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
var cors = require('cors');

const app = express();

db.authenticate().then(() => {
    console.log('Database connected..');
}).catch(err => {
    console.log('Database can not connect; ' + err)
});

db.sync();//{force:true}//modellerle tablo olusturur


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*',);
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Accept,Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/login',require('./Route/LoginRoute'));
app.use('/signup',require('./Route/SignUpRoute'));

app.use('/bus',require('./Route/BusRoute'));
app.use('/employee',require('./Route/EmployeeRoute'));
app.use('/manager',require('./Route/ManagerRoute'));
app.use('/ticket',require('./Route/TicketRoute'));
app.use('/user',require('./Route/UserRoute'));
app.use('/trip',require('./Route/TripRoute'));

app.use('/hi', (req, res, next) => {
    res.status(200);
    res.json({
        response: '(TEST):Server is running'
    })
});


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
app.listen(port, () => {
    console.log(`Server started on port:${port}`);
});
module.exports = app;