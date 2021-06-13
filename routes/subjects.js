'use strict'

var express = require('express');
var SubjectsController = require('../controllers/subjects');

var router = express.Router();

router.get('/getAll', SubjectsController.getSubjects);
router.post('/byGrade', SubjectsController.getSubjectsByGrade);
router.post('', SubjectsController.saveSubject);
router.put('', SubjectsController.updateSubject);
router.delete('', SubjectsController.deleteSubject);

module.exports = router;