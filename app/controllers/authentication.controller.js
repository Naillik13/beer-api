const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');

exports.isAuthenticated = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {

        let token = req.headers.authorization.split(" ")[1];
        let privateKey = fs.readFileSync('././private.pem', 'utf8');

        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            console.log(user.id);

            if (err) {
                res.status(401).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            }

            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
};

exports.signIn = (req, res) => {
    if(!req.body.email) {
        return res.status(400).send({
            message: "Email can not be empty."
        });
    } else if (!req.body.password) {
        return res.status(400).send({
            message: "Password can not be empty."
        });
    }

    const query = {email: req.body.email};
    console.log(query);
    User.findOne(query).then(user => {
        console.log(user);
        bcrypt.compare(req.body.password, user.password).then((isValidCredentials) => {
            if (!isValidCredentials || !user) {
                res.status(401).send({
                    message: "Invalid credentials"
                });
            }
            let privateKey = fs.readFileSync('././private.pem', 'utf8');
            let token = jwt.sign({"email": user.email}, privateKey, {algorithm: 'HS256'});
            res.send(token);
        }).catch((error) =>  {
            console.log(error);
            res.status(500).send({
                message: "Some error occurred while trying to authenticate " + req.body.email
            });
        });
    }).catch(_ => {
        res.status(500).send({
            message: "Some error occurred while trying to authenticate " + req.body.email
        });
    });


};