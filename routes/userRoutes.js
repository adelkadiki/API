const express = require('express');
const router = express.Router();
const {getUsers, postUser, deleteUser, getUser, updateUser, 
        registerUser, loginUser, userName} = require('../controllers/userController');
const {protect, restrict, forgotPassword} = require('../middlewares/authMiddleware');         

// Authentication 

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/forgotPassword', forgotPassword);

// User
router.get('/users', protect, restrict, getUsers);
router.get('/userName/:email', userName);
//router.route('/').get(getUsers).post(postUser);
//router.get('/', protect, getUsers);
//router.route('/:id').put(updateUser).delete(deleteUser).get(getUser);

//Protect part 
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);
router.get('/:id', protect, getUser);
//Protect part


// router.get('/', getUsers);

// // POST
// router.post('/', postUsers);

// // PUT
// router.put('/:id', putUsers);

// // Delete
// router.delete('/:id', deleteUsers);


module.exports = router;