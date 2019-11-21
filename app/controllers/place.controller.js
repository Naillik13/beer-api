const Place = require('../models/place.model.js');
const mongoose = require('mongoose');

// Create and Save a new Place
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Place name can not be empty."
        });
    } else if(!req.body.address) {
        return res.status(400).send({
            message: "Place address can not be empty."
        });
    }

    // Create a Note
    const place = new Place({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        coordinates: req.body.coordinates,
        description: req.body.description,
        draftBeers: req.body.draftBeers.map(beerId => mongoose.Types.ObjectId(beerId)),
        openingTimes: req.body.openingTimes
    });

    // Save Place in the database
    place.save()
        .then(data => {
            res.send(data.populate({path: "draftBeers", select: "name abv imgUrl"}));
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Place."
        });
    });
};

// Retrieve and return all places from the database.
exports.findAll = (req, res) => {
    Place.find().select("_id name address")
        .then(places => {
            res.send(places);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving places."
        });
    });
};

// Find a single place with a placeId
exports.findOne = (req, res) => {
    Place.findById(req.params.placeId).populate({path: "draftBeers", select: "name abv imgUrl"})
        .then(place => {
            if(!place) {
                return res.status(404).send({
                    message: "Place not found with id " + req.params.placeId
                });
            }
            res.send(place);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Place not found with id " + req.params.placeId
            });
        }
        return res.status(500).send({
            message: "Error retrieving place with id " + req.params.placeId
        });
    });
};

// Update a place identified by the placeId in the request
exports.update = (req, res) => {
// Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Place name can not be empty"
        });
    }

    // Find place and update it with the request body
    Place.findByIdAndUpdate(req.params.placeId, {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        coordinates: req.body.coordinates,
        description: req.body.description,
        draftBeers: req.body.draftBeers.map(beerId => mongoose.Types.ObjectId(beerId)),
        openingTimes: req.body.openingTimes
    }, {new: true})
        .then(place => {
            if(!place) {
                return res.status(404).send({
                    message: "Place not found with id " + req.params.placeId
                });
            }
            res.send(place);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Place not found with id " + req.params.placeId
            });
        }
        return res.status(500).send({
            message: "Error updating place with id " + req.params.placeId
        });
    });
};

// Delete a place with the specified placeId in the request
exports.delete = (req, res) => {
    Place.findByIdAndRemove(req.params.placeId)
        .then(place => {
            if(!place) {
                return res.status(404).send({
                    message: "Place not found with id " + req.params.placeId
                });
            }
            res.send({message: "Place deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Place not found with id " + req.params.placeId
            });
        }
        return res.status(500).send({
            message: "Could not delete place with id " + req.params.placeId
        });
    });
};