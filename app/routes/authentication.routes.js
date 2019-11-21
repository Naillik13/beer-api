module.exports = (app) => {
    const jwt = require('jsonwebtoken');
    const fs = require('fs')

    app.get('/jwt', (req, res) => {
        let privateKey = fs.readFileSync('././private.pem', 'utf8');
        let token = jwt.sign({"body": "stuff"}, privateKey, {algorithm: 'HS256'});
        res.send(token);
    })
}