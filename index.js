'use strict'

var mongoose = require('mongoose');
var app = require('./app');
require('dotenv').config();
//mongodb+srv://AndresBlanco07:ohv0SqUOAp6ckeil@clustersq.trssb.mongodb.net/SmartQuest.Kiev?retryWrites=true&w=majority
console.log(process.env.URL_FRONTEND);
mongoose.Promise = global.Promise;
mongoose.connect(
    `mongodb+srv://AndresBlanco07:${process.env.PASSWORD}@clustersq.trssb.mongodb.net/SmartQuest?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
    )
    .then(() => {
        // Creating the server
        app.listen(process.env.PORT || 3700, () => {
            console.log("Server running succesfully");
        });
    })
    .catch(error => console.log(error));

//ohv0SqUOAp6ckeil