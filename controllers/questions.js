'use strict'
var Questions = require('../models/questions');
var Subjects = require('../models/subjects');

var controller = {

    getQuestionItem: function (req, res) {
        var questionId = req.query.id;
        Questions.findById(questionId, (err, question) => {

            if (err) {
                return res.status(500).send({ message: "Error al devolver el id" });
            }

            if (!question) {
                return res.status(404).send({ message: "La pregunta no se encontro" });
            }

            question.answers_counter = question.answers.length;

            return res.status(200).send({
                question
            })
        })
    },

    getQuestions: function (req, res) {
        Questions.find().exec((err, questions) => {
            questions.map((item, index) => {
                item.answers_counter = item.answers.length;
            });
            return res.status(200).send({
                questions
            })
        });
    },

    getQuestionsFilter: function (req, res) {
        var nameS = req.query.subject_filter
        Questions.find({ name_subject: nameS }).exec((err, questions) => {
            questions.map((item, index) => {
                item.answers_counter = item.answers.length;
            });
            return res.status(200).send({
                questions
            })
        });
    },

    saveQuestion: function (req, res) {
        var question = new Questions();
        var params = req.body;
        var grades = JSON.parse(params.subject_grade);
        question.date = new Date();
        question.name = params.name;
        question.description = params.description;
        question.student = params.student;
        question.name_subject = params.subject_name,
        question.grade_subject = grades,
        question.color_subject = params.subject_color

        question.save((err, questionStored) => {
            Subjects.findOneAndUpdate({name: params.subject_name}, {$inc: {question_counter: 1}}).exec((err, subjectStored) => {
                if (err) return res.status(500).send({ message: "Error al insertar" +err })
    
                if (!subjectStored) return res.status(404).send({ message: "No existe la materia" });
    
                return res.status(200).send({ question: questionStored });
            });
        });
    },

    getQuestionsByGrade: function (req, res) {
        var grade_student = req.query.grade;
        Questions.find({ grade_subject: grade_student }).exec((err, question) => {
            question.map((item, index) => {
                item.answers_counter = item.answers.length;
            })
            return res.status(200).send({
                question
            });
        });
    },

    getQuestionsByGradeFilter: function (req, res) {
        var grade_student = req.query.grade;
        var nameS = req.query.subject;
        if(nameS !== '' && nameS !== null && nameS !== undefined){
            Questions.find({ grade_subject: grade_student, name_subject: nameS }).exec((err, question) => {
                question.map((item, index) => {
                    item.answers_counter = item.answers.length;
                })
                return res.status(200).send({
                    question
                });
            });
        }else{
            Questions.find({ grade_subject: grade_student }).exec((err, question) => {
                question.map((item, index) => {
                    item.answers_counter = item.answers.length;
                })
                return res.status(200).send({
                    question
                });
            }); 
        }
    },

    saveAnswer: function (req, res) {
        var answer = new Questions();
        var questionId = req.query.id;
        var params = req.body;
        params.date_answer = new Date();

        Questions.findByIdAndUpdate(questionId, { $push: { answers: params } }, (err, questionUpdated) => {
            if (err) return res.status(500).send({ message: "Error al actualizar" })

            if (!questionUpdated) return res.status(404).send({ message: "No existe la pregunta" });

            return res.status(200).send({
                question: questionUpdated
            })
        });
    },

    deleteQuestion: function (req, res) {
        var questionId = req.query.id;

        Questions.findByIdAndDelete(questionId, (err, questionDeleted) => {
            if (err) return res.status(500).send({ message: "Error al eliminar" })

            if (!questionDeleted) return res.status(404).send({ message: "No existe la pregunta" });

            return res.status(200).send({
                question: true
            })
        });
    },

    getQuestionsByFilter: function(req, res) {
        var question_filter = req.query.keyword;

        
        Questions.find({ name: { $regex: '.*' + question_filter + '.*' } }, (err, question_found) => {
            if (err) return res.status(500).send({ message: "Error el buscar" });
    
            if (!question_found) return res.status(404).send({ message: "No existe la pregunta" });
            
            return res.status(200).send({
                question: question_found
            })
        });
    },
}

module.exports = controller;
