module.exports = (app) => {
    const jwt = require('jsonwebtoken');
    const fs = require('fs')

    app.get('/auth', (req, res) => {
        let privateKey = fs.readFileSync('././private.pem', 'utf8');
        let token = jwt.sign({"id": "userid"}, privateKey, {algorithm: 'HS256'});
        res.send(token);
    })
}