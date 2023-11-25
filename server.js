const express = require('express');
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoutes');
const departmentRoute = require('./routes/departmentRoutes');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');
const User = require('./models/userModel');
const CustomError = require('./classes/customError');
// importing the authentication router
const authRouter = require('./routes/authRouter');

// import Asysncronous Error Hander
const asyncErrorHandler = require('./middlewares/aysncErrorHandler');

const port  = process.env.PORT || 5000;


connectDB();
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(errorHandler);
// middleware of authentication router
app.use('/authen',authRouter);


process.on('uncaughtException', (err)=>{

    console.log(err.message); 
    console.log('Uncaught Exceptoin occured');
    process.exit(1);

});
//  app.use('/user', userRoute);
//  app.use('/department', departmentRoute);



// app.get('/users', asyncErrorHandler (async (req, res)=>{

//     const search = 'user@email.com'

//     const users = await User.aggregate([
//          {$match : {email:search} },
//          { $group: { }}
        
//     ]);

//     if(!users){
//         return res.status(400);
//     }

//     return res.status(201).json(users);

// }));


app.get('/test', (req, res)=>{

    res.send('The response');

});

// Error hanlder function
// const asyncErrorHandler = (func)=>{

//     return  (req, res, next)=>{
    
//        func(req, res).catch(err => next(err)) ;
        
//     }

// }


app.get('/user/:email', asyncErrorHandler (async (req, res)=>{

    const email = req.params.email;

   // try {

        const user = await User.findOne({email: email});

        if(!user){

            res.status(404).send('User not found');
            return;
        }

            res.send(user);
        
    //} catch (error) {
        
    //    res.status(500).send('Server error') ;
    // }

    
}));



// Get all users function
app.get('/getUsers', asyncErrorHandler( async (req, res)=>{

    
    
        const users = await User.find();

            if(!users){

               throw new CustomError('Users not found', 400);
                       }

    res.status(200).json(users);

})
);




// Default route to handle undefinded routes

//app.all('*', (req, res, next)=>{

            // res.status(401).json({
            //     status: 'fail',
            //     message: 'Route not found'
            // });
            //res.send('<h3> Page not found </h3>');
            //res.render('404');  // this is to pass the Not Found page

 //   const err = new CustomError('URL not found', 404);
    
 //   next(err);

//});

app.use(errorHandler);


// To handle all wrong route requests
app.all('*', (req, res, next)=>{

    const err = new Error('Wrong URL was requested');
    err.statusCode = 404;
    err.status = 'fail';
    next(err); 

})


// Error handler middleware
app.use( (err, req, res, next)=>{

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({

        status: err.statusCode,
        message: err.message
    });

} )

    // Run the server 

const server = app.listen(port, ()=>{

    console.log(`Server started at port ${port}`);
});       


process.on('unhandledRejection', (err)=>{

    console.log(err.message);

    server.close(()=>{
        process.exit(1);
    });

        
});


// const http = require('http');
// const app = require('./app');
        
// const port = process.env.PORT || 3000;

// const server = http.createServer(app);

// server.listen(port);


