const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const CustomError = require('../classes/customError');
const { findOne } = require('../models/userModel');
const {sendEmail} = require('../classes/email');
const crypto = require('crypto');
require('dotenv').config();

const config = process.env;


  // const protect = asyncHandler (async (req, res, next) => {
    
    
  //   //const token = req.headers.authorization.split(' ')[1];
  //   const token = req.headers.authorization;
  
  //   if (!token) {
  //     return res.status(401).send("ACCESS DENIED");
  //   }
  //       if(token){

  //         const authToken = req.headers.authorization.split(' ')[1];
  //       //  console.log(authToken);

  //         try {
  //           const decodedToken = jwt.verify(authToken, config.TOKEN_SECRET);
  //           req.user = await User.findById(decodedToken.id).select('-password');
  //           console.log('THE USER ID ====> '+decoded.id);
  //         } catch (err) {
  //           return res.status(401).send("Session has ended please sign in again");
  //         }

  //       }


  //   return next();
  // });

  const protect = async (req, res, next)=>{

      const tokenHeader = req.headers.authorization;

   
          
        if(tokenHeader){

           const  token = tokenHeader.split(' ')[1];
           jwt.verify(token, process.env.TOKEN_SECRET, async function(err, decoded){

               if(err) return res.status(403);
              // console.log(decoded.id);
                try {
                  const user = await User.findById(decoded.id).select('-password');
                 
                      req.user = user.role;

                } catch (error) {

                  console.log(error);

                }                       
                    
                     next();
                }) ;
             
          } else {

            const err = new CustomError('Token not found', 401);
          
            next(err);
          }

        
  }


  // Authorizatoin

  const restrict = (req, res, next) => {
    
  
    if (req.user !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
  
    next();
  };


  // Rest password functoin one

  const forgotPassword = async (req, res, next)=>{

    

        //  try {
          
        //   const user = await findOne({email: req.body.email});

        //         if(!user){
        //             return res.status(404).json({message:'User not found'});
        //         }
        //   const resetToken = crypto.randomBytes(32).toString('hex');

        //   user.passwordRestToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        //   user.passwordRestTokenExpire = Date.now() + 10 * 60 * 1000; // Reset expiratoin time after converting into seconds

        //   await user.save();

        //  } catch (error) {
        //       const err = new CustomError('Finding user error', error);
        //       next(err);
        //       return res.status(500).json({message:'Server error finding the user'});
        //  }
        
        try{
        const to = 'adelkdk@gmail.com';
        const subject = 'Email Subject';
        const text = 'Email text';

           await sendEmail(to, subject, text);
            res.status(200).json({ message: 'Email sent successfully' });

        }catch(err){

              console.error('Error sending email:', error.message);
              res.status(500).json({ error: 'Internal Server Error' });
        }
    

  }

 module.exports = {protect, restrict, forgotPassword};