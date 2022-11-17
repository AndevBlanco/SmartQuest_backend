'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const { model } = require('mongoose');
var cors = require('cors');

var app = express();

// Cargar archivo de Rutas
var QuestionsRoutes = require('./routes/questions');
var SubjectsRoutes = require('./routes/subjects');
var UsersRoutes = require('./routes/users');

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Rutas
app.use('/questions', cors({origin: process.env.URL_FRONTEND}), QuestionsRoutes);
app.use('/subjects', cors({origin: process.env.URL_FRONTEND}), SubjectsRoutes);
app.use('/users', cors({origin: process.env.URL_FRONTEND}), UsersRoutes);

module.exports = app;