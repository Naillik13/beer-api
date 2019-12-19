const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: {type: String},
    admin: {type: Boolean}
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);