const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String, 
        required: [true, 'Please add a name'] 
    },

    email: 
    {
        type: String, required : [true, 'Please add an email'], 
        unique : true,
        lowercase: true,
        validate: [validator.isEmail, 'Please input valid email address']

    },
    
    password: 
    {
        type: String, 
        required : [true, 'Please add a password'],
        minlength: 3    

    },

    confirmPassword : 
    {
        type: String,
        required : [true, 'Please confirm your password'],
        validate: {
            validator: function(confPass){
                return confPass == this.password;
            },

            message: 'Password and confirmed password do not match'
        }
    }

    
}, 

{ timestamps: true });

module.exports = mongoose.model('User', userSchema);

