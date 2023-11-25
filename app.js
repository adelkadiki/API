const express = require('express');
const userRoute = require('./routes/users');
const parser  = require('body-parser');

const app = express();

app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

// const cors = (req, res, next)=>{
//   res.header(`Access-Control-Allow-Origin`, `localhost:3000`);
//   res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
//   res.header(`Access-Control-Allow-Headers`, `Content-Type`);
//   next();
// }

app.use(cors);
app.use('/users', userRoute);

// Error handling

app.use((req, res, next)=>{

    const error = new Error('Route not found');

    error.status = 404;

    next(error);

});

// Second error handling

app.use((err, req, res, next)=>{

    res.status(err.status || 500);
    res.json({
        message : err.message
    });
});

module.exports = app;