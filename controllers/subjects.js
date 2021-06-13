'use strict'

var Subjects = require('../models/subjects');
var Questions = require('../models/questions');

var controller = {
    getSubjects: function (req, res) {
        Subjects.find().exec((err, subjects) => {
            return res.status(200).send({
                subjects
            })
        });
    },
    getSubjectsByGrade: function (req, res) {
        var grade_student = req.body.grade;
        Subjects.find({grade:grade_student}).exec((err, subject) => {
            /* subject.map((item, index) => {
                Questions.countDocuments({name_subject: item.name}, (err, counter) => {
                    item.question_counter = counter;
                });
            }); */
            return res.status(200).send({
                subject
            });
        });
    },

    saveSubject: function(req, res) {
        var subject = new Subjects();
        var params = req.body;
        var grades = JSON.parse(params.grade);
        subject.name = params.name;
        subject.color = params.color;
        subject.grade = grades;
        subject.question_counter = 0;

        subject.save((err, subjectStored) => {
            return res.status(200).send({subject: subjectStored});
        });
    },

    updateSubject: function(req, res) {
        var subject = new Subjects();
        var params = req.body;
        var subject = req.query.id;
        var grades = JSON.parse(params.grade);
        subject.grade = grades;

        Questions.findByIdAndUpdate(subjectId, params, (err, subjectUpdated) => {
            if (err) return res.status(500).send({message: "Error al actualizar"})

            if(!subjectUpdated) return res.status(404).send({message: "No existe la materia"});

            return res.status(200).send({
                subject: subjectUpdated
            })
        });
    },

    deleteSubject: function(req, res) {
        var subjectId = req.query.id;

        Subjects.findByIdAndDelete(subjectId, (err, subjectDeleted) => {
            if (err) return res.status(500).send({message: "Error al eliminar"})

            if(!subjectDeleted) return res.status(404).send({message: "No existe la materia"});

            return res.status(200).send({
                subject: true
            })
        });
    }
}

module.exports = controller;