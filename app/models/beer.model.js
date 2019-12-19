const mongoose = require('mongoose');

const BeerSchema = mongoose.Schema({
    name: {type: String, unique: true, required:true},
    abv: Number,
    country: String,
    color: String,
    style: String,
    flavour: String,
    imgUrl: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Beer', BeerSchema);