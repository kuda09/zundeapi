///<reference path="../../typings/modules/mongoose/index.d.ts"/>


let mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
});


export var users = mongoose.model('users', userSchema);