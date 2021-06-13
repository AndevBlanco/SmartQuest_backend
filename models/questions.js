'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionsSchema = Schema({
    date: Date,
    name: String,
    name_subject: String,
    grade_subject: [],
    color_subject: String,
    description: String,
    student: String,
    answers: [{
        description_answer: String,
        teacher: String,
        date_answer: Date
    }],
    answers_counter: String
});

module.exports = mongoose.model('Questions', QuestionsSchema);