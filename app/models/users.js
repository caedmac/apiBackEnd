const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 3
    },
    gender:{
        type: String,
        enum: ['Male','Female','Other']
    },
    hobbie:{
        type: String,
        required: true
    },
    register_date:{
        type: Date,
        default: Date.now()
    },
});

UserSchema.pre('save',function(next){
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password,salts).then(hash => {
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

module.exports = mongoose.model('User', UserSchema);