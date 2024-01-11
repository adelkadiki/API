const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const asyncErrorHander = require('./../middlewares/aysncErrorHandler');

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
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please input valid email address']

    },
    
    password: 
    {
        type: String, 
        required : [true, 'Please add a password'],
        minlength: 3,
        select: false  

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
        },
        select: false
    }, 

    role: 
    {
        type: String,
        enum: ['user', 'admin'],
        default:'user'

    },

    passwordRestToken: String,
    passwordRestTokenExpire: Date
    
}, 

{ timestamps: true });

userSchema.pre('save', async function(next){

    if(this.isModified("password")){

        this.password =  await bcrypt.hash(this.password, 8);
        this.confirmPassword = undefined;
        next();
    }
});

userSchema.methods.verifyPassword = async function(password, dbPassword){

    return bcrypt.compare(password, dbPassword);
    
     
}

// userSchema('save', function(next){

//         if(this.isModified('password')){

//             bcrypt.hash()
//         }
// });

module.exports = mongoose.model('User', userSchema);

