const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
require('dotenv').config();

const config = process.env;

  const protect =  async (req, res, next) => {
    
    
    //const token = req.headers.authorization.split(' ')[1];
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
        if(token){

          const authToken = req.headers.authorization.split(' ')[1];

          try {
            const decoded = jwt.verify(authToken, config.TOKEN_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            console.log('THE USER ID ====> '+decoded.id);
          } catch (err) {
            return res.status(401).send("Invalid Token");
          }

        }

    // try {
    //   const decoded = jwt.verify(token, config.TOKEN_SECRET);
    //   req.user = await User.findById(decoded.id).select('-password');
    //   console.log('THE USER ID ====> '+decoded.id);
    // } catch (err) {
    //   return res.status(401).send("Invalid Token");
    // }


    return next();
  };


 module.exports = protect;