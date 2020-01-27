// get all employee
const Beer = require('../models/beer.model.js');

exports.getAll = () => {
    Beer.find()
        .then(beers => {
            return beers
    });
};