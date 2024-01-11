const User = require('../models/userModel');
const asyncErrorHander  = require('.././middlewares/aysncErrorHandler');
const jwt = require('jsonwebtoken'); 
const CustomError = require('./../classes/customError');
const bcrypt = require('bcryptjs');


// Generate token function
const generateToken = id =>{
  return  jwt.sign({id}, process.env.TOKEN_SECRET, 
        {expiresIn: process.env.LOGIN_EXPIRES});
}


// Sigin 
exports.signup = asyncErrorHander (async (req, res, next)=>{

    const user = await User.create(req.body);

            // const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET, 
            //                         {expiresIn: process.env.LOGIN_EXPIRES});

          const token = generateToken(user._id);

    res.status(201).json({

        status:'success',
        token,
        data : {
            user:user
        }

    });

});

// Verify password

const verifyPassword = asyncErrorHander (async function(password, dbPassword){

    return await bcrypt.compare(password, dbPassword);
});



// Signin 

exports.signin = asyncErrorHander (async (req, res, next)=>{

    const email = req.body.email;
    const password = req.body.password;

        if(!email || !password){

            //const err = new CustomError('Please provide email and password', 400);
            return res.status(401).json({
                message: 'Provide email and password'
            });

        }     
            const user = await User.findOne({email}).select("+password");
            

            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
              }

              const isPasswordValid = await bcrypt.compare(password, user.password);

                    if (!isPasswordValid) {
                            return res.status(401).json({ message: 'Invalid email or password' });
                        }

               const token = generateToken(user._id);         

          return res.status(200).json({
             message: 'Login successful', 
             name: user.name,
             token
            });

        });

        

       
