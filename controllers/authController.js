const User = require('../models/userModel');
const asyncErrorHander  = require('.././middlewares/aysncErrorHandler');

exports.signup = asyncErrorHander (async (req, res, next)=>{

    const user = await User.create(req.body);

    res.status(201).json({

        status:'success',
        data : {
            user:user
        }

    });

})