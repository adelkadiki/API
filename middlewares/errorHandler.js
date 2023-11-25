// const errorHandler = (err ,req, res, next)=>{

//     const statusCode = res.statusCode ? res.statusCode : 500;
//     res.status(statusCode);
//     res.json({
//         message : err.message,
//         stack : process.env.NODE_ENV = 'production' ? null : err.stack
//     });
// }

const errorHandler = (err, req, res, next)=>{

    err.status = err.status || 'Error' ;
    err.statusCode = err.statusCode || 500 ;

    res.status(err.statusCode).json({

        status: err.statusCode,
        message: err.message
    });
}

module.exports = errorHandler