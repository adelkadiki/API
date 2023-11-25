const asyncHanlder = require('express-async-handler');
const User = require('../models/userModel');
//const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authentication



    // Registratoin
const registerUser = asyncHanlder (async (req, res)=>{{

    const {name, email, password} = req.body;

            if(!name || !email || !password){

                res.status(400);
                throw new Error('Please provide all required fields');
            }

            const foundUser = await User.findOne({email});

                if(foundUser){

                     res.status(400).json({ message : 'User is found already'});
                    
                }

                        // Hashing the password
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password, salt);

                                // Create user
                                const user = await User.create({

                                    name, email, password : hashedPassword
                                });

                                        // Confirm new user
                                        if(user){

                                            res.status(200).json({

                                                id: user.id,
                                                name: user.name,
                                                email: user.email,
                                                token : generateToken(user.id) 
                                            });

                                        }else {

                                            res.status(400).json({ message : 'Failed to add a new user'});
                                        }

    await res.status(200).json({ message : 'user registration controller'});
}})

    // Login 
const loginUser = asyncHanlder (async (req, res)=>{{


    const {email, password} = req.body;

        // Check user email
        const user = await User.findOne({email});

            // if(user && (await bcrypt.compare(password, user.password))){

            //         res.status(201).json({

            //             id : user.id,
            //             name : user.name,

            //         })

            //     }

                if(!user){
                    res.status(400);
                    throw new Error('Invalid credentials');
                }

                if(user){

                        const userPassword = await bcrypt.compare(password, user.password);

                            if(userPassword){

                                    res.status(201).json(
                                        {
                                        id: user.id, 
                                        name: user.name,
                                        token: generateToken(user.id)
                                    });
                                        
                            } else {

                                res.status(400);
                                throw new Error('Invalid credentials');
                            }
                }
                

    await res.status(200).json({ message : 'user login controller'});
}})

// Generate token

const generateToken = (id)=>{

    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: '1d'});
}

// Get users 
const getUsers = asyncHanlder (async (req, res)=>{

    const users = await User.find();
    
    res.status(200).json(users);
})

// Get a user
const getUser = asyncHanlder (async (req, res)=>{

    const id = req.params.id;
    const user = await User.findById(id);

    if(!user){

        res.status(400);
        throw new Error('User is not found');
    }

    res.status(201).json(user);

})

// Update user

const updateUser = asyncHanlder( async (req, res)=>{

    const id = req.params.id;
    const user = await User.findById(id);
    const updatedInfo = req.body;

        if(!user){
            res.status(400);
            throw new Error('User is not found');
        }
    const newUser = await User.findByIdAndUpdate(id, updatedInfo, {new: true});
    res.status(200).json(newUser);

} );


// Post users
const postUser = asyncHanlder (async (req, res)=>{

    const user = new User();
    
    res.status(200).json({message : `Post request from Controller`});
})



// Delete users
const deleteUser = asyncHanlder (async (req, res)=>{

    const id = req.params.id;
    const user = User.findById(id);

        if(!user){
            res.status(400);
            throw new Error('User not found');
        }
      
     await user.remove();

    res.status(200).json({id : id});
})


// Find userName with specific 

const userName = asyncHanlder (async (req, res)=>{

   // const userEmail = req.params.email;
      const userEmail = req.request.email; 

    // const name = await User.find({email:userEmail}).select('name');
    // console.log(name);

    // if(!name){
    //     res.status(400);
    //     throw new Error('Could not find users');
    // }

    res.status(200).json({email: userEmail});

})

module.exports = { getUsers, postUser, deleteUser, getUser, updateUser, registerUser, loginUser,
userName}