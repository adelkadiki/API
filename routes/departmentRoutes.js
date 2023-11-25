const express = require('express');
const router = express.Router();
const {postDepartment}  = require('../controllers/departmentController');

router.post('/', postDepartment);


module.exports = router;
