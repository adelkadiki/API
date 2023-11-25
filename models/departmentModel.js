const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({

    user : { type: mongoose.Schema.Types.ObjectId,
             required: true,
             ref: 'User'        
            },

    title : { type: String, required: [true, 'Please add a Department Title']},

            }, {

    timestamps : true
});