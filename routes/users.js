'use strict'

var express = require('express');
var UsersController = require('../controllers/users');

var router = express.Router();

router.post('', UsersController.saveUsers);
router.post('/login', UsersController.login);
router.get('/getAll', UsersController.getAll);
router.delete('', UsersController.deleteUser);

module.exports = router;