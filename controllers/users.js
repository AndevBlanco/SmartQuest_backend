'use strict'

var bcrypt = require('bcrypt');
var Users = require('../models/users');

var controller = {
    saveUsers: function(req, res){
        var user = new Users();
        var params = req.body;
        user.date = params.date;
        user.name = params.name;
        user.surname = params.surname;
        //user.code = params.code;
        user.grade = params.grade;
        user.type_user = params.type_user;
        user.email = params.email;
        async function hashPassword(password) {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            console.log(hash)
            user.password = hash;
            user.save((err, userStored) => {
                return res.status(200).send({user: userStored});
            });
        }
        hashPassword(params.password);
    },

    login: function(req, res) {
        var params = req.body;
        var nameUser = params.xusername;
        var passUser = params.xpassword;

        Users.findOne({email: nameUser}, function(err, result){
            if(err) {
                return res.status(500).send({login: false});
            }

            if(!result){
                return res.status(404).send({login: false});
            }

            async function comparePassword(password) {
                const resultPass = await bcrypt.compare(passUser, password)
                return res.status(200).send({
                    login: resultPass,
                    id: result.id,
                    name: result.name + " " + result.surname,
                    code: result.code,
                    grade: result.grade,
                    type_user: result.type_user
                });
            }

            if(passUser){
                comparePassword(result.password);
            }
        });
    },

    getAll: function(req, res) {
        Users.find().exec((err, users) => {
            users.map((item, index) => {
                delete item.password;
            });
            return res.status(200).send({
                users
            })
        });
    },

    deleteUser: function(req, res) {
        var userId = req.query.id;

        Users.findByIdAndDelete(userId, (err, userDeleted) => {
            if (err) return res.status(500).send({ message: "Error al eliminar" })

            if (!userDeleted) return res.status(404).send({ message: "No existe el usuario" });

            return res.status(200).send({
                user: true
            })
        });
    }
}

module.exports = controller;