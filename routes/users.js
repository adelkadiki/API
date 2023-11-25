// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');


// //// Database

// // const dbURI = 'mongodb+srv://adel:adel1975@cluster0.o7em083.mongodb.net/Project1?retryWrites=true&w=majority';
// //  mongoose.set('strictQuery', false);
// //  mongoose.connect(dbURI)
// //  .then( (data)=>{console.log('Seccessful DB connection'); app.listen(3000);} )
// //  .catch(err => console.log(err));

//  //// Database

// router.get('/all', (req, res)=>{

//     // User.find()
//     // .then(data=>{
//     //     res.send(data);
//     // }).catch(err=>{ console.log(err);});

//     res.status(200).json([{ id:101, name:'Adel'}, { id:102, name:'Samira'}]);

// });

// // Post user

// router.post('/user', (req, res, next)=>{

//     const user = {

//         id : req.body.id,
//         name : req.body.name
//     }

//     res.status(201).json({
//         msg: 'user information received',
//         user: user
//     });
// });

// // Get by ID

// router.get('/find/:userId', (req, res)=>{

//     const id= req.params.userId;

//     if(id === '101') {
//         res.status(201).json({
//             msg: 'User with 101 id was found'
//         });
//     }else  {
//         res.status(401).json({
//             msg: 'User is not found' 
//         });
//     }
// });

// // Patch by id

// router.patch('/update/:userId', (req, res, next)=>{

//     var id = req.params.userId;
//     res.status(201).json({
//         response : 'User id recieved'
//     });
// });

// router.delete('/delete/:userId', (req, res, next)=>{

//     res.status(200).json({
//         res: 'User id received for delete'
//     });
// });

// module.exports = router;