'use strict'

var mongoose = require('mongoose');
var app = require('./app');
//mongodb+srv://AndresBlanco07:ohv0SqUOAp6ckeil@clustersq.trssb.mongodb.net/SmartQuest.Kiev?retryWrites=true&w=majority

mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb+srv://AndresBlanco07:nvMIeGS7T3lSEVbI@clustersq.trssb.mongodb.net/SmartQuest?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
    )
    .then(() => {
        console.log("Conexión establecida con éxito");

        // Creación del servidor
        app.listen(process.env.PORT || 3700, () => {
            console.log("Servidor corriendo correctamente");
        });
    })
    .catch(error => console.log(error));


//ohv0SqUOAp6ckeil