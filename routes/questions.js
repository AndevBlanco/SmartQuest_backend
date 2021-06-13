'use strict'

var express = require('express');
var QuestionsController = require('../controllers/questions');

var router = express.Router();

router.get('', QuestionsController.getQuestionItem);
router.get('/getAll', QuestionsController.getQuestions);
router.get('/getAllFilter', QuestionsController.getQuestionsFilter);
router.post('', QuestionsController.saveQuestion);
router.put('/answer', QuestionsController.saveAnswer);
router.get('/byGrade', QuestionsController.getQuestionsByGrade);
router.get('/byGradeFilter', QuestionsController.getQuestionsByGradeFilter);
router.get('/byFilter', QuestionsController.getQuestionsByFilter);
router.delete('', QuestionsController.deleteQuestion);

module.exports = router;