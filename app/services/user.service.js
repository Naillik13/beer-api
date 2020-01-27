// get all employee
const User = require('../models/beer.model.js');

exports.isAdminWithEmail = (email) => {
    const query = {email: email};
    User.findOne(query).then(user => {
        console.log(!user.admin);
        return !(!user || !user.admin);
    })
};