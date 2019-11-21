const mongoose = require('mongoose');

const OpeningTimeSchema = {
    startTime: String,
    endTime: String
};

const OpeningWeekSchema = {
    monday: OpeningTimeSchema,
    tuesday: OpeningTimeSchema,
    wednesday: OpeningTimeSchema,
    thursday: OpeningTimeSchema,
    friday: OpeningTimeSchema,
    saturday: OpeningTimeSchema,
    sunday: OpeningTimeSchema,
};

const PlaceSchema = mongoose.Schema({
    name: {type: String, unique: true, required: true},
    address: {type: String, unique: true, required: true},
    phone: String,
    coordinates: String,
    description: String,
    draftBeers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Beer' }],
    openingTimes: OpeningWeekSchema
}, {
    timestamps: true
});


module.exports = mongoose.model('Place', PlaceSchema);