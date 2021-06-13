'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubjectsSchema = Schema({
    name: String,
    color: String,
    grade: Array,
    question_counter: Number
});

module.exports = mongoose.model('Subjects', SubjectsSchema);