'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = Schema({
    name: String,
    surname: String,
    //code: String,
    grade: Number,
    type_user: String,
    email: String,
    password: String,
    date: Date
});

module.exports = mongoose.model('Users', UsersSchema);