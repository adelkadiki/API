const asyncHanlder = require('express-async-handler');
const Department = require('../models/departmentModel');


const postDepartment = (req, res)=>{

    const department = new Department();

    res.status(200).json({ message: 'A new departemnt was created'});

}

module.exports = { postDepartment}
