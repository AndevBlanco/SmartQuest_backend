const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    console.log("Hi there!");
    const authHeader = req.headers['authorization'];
    console.log("Auth: ", authHeader);
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log("Verifying...");
        if(err){
            return res.status(403).send({login: false});
        }
        next();
    });
}

module.exports = verifyJWT;