const Beer = require('../models/beer.model.js');

// Create and Save a new Beer
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Beer name can not be empty."
        });
    }

    // Create a Note
    const beer = new Beer({
        name: req.body.name,
        abv: req.body.abv,
        country: req.body.country,
        color: req.body.color,
        style: req.body.style,
        flavour: req.body.flavour,
        imgUrl: req.body.imgUrl,
        description: req.body.description
    });

    // Save Beer in the database
    beer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Beer."
        });
    });
};

// Retrieve and return all beers from the database.
exports.findAll = (req, res) => {
    if (req.query.name) {
        const nameRegex = new RegExp(req.query.name, "i")
        const query = {name: nameRegex};
        Beer.find(query)
            .then(beers => {
                res.send(beers);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving beers."
            });
        });
    } else if (req.query.minAbv && req.query.maxAbv) {
        const query = {abv: {$gte: req.query.minAbv, $lte: req.query.maxAbv}};
        Beer.find(query)
            .then(beers => {
                res.send(beers);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving beers."
            });
        });
    } else {
        Beer.find()
            .then(beers => {
                res.send(beers);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving beers."
            });
        });
    }
};

// Find a single beer with a beerId
exports.findOne = (req, res) => {
    Beer.findById(req.params.beerId)
        .then(beer => {
            if(!beer) {
                return res.status(404).send({
                    message: "Beer not found with id " + req.params.beerId
                });
            }
            res.send(beer);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Beer not found with id " + req.params.beerId
            });
        }
        return res.status(500).send({
            message: "Error retrieving beer with id " + req.params.beerId
        });
    });
};

// Update a beer identified by the beerId in the request
exports.update = (req, res) => {
// Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Beer name can not be empty"
        });
    }

    // Find beer and update it with the request body
    Beer.findByIdAndUpdate(req.params.beerId, {
        name: req.body.name,
        abv: req.body.abv,
        country: req.body.country,
        color: req.body.color,
        style: req.body.style,
        flavour: req.body.flavour,
        imgUrl: req.body.imgUrl,
        description: req.body.description
    }, {new: true})
        .then(beer => {
            if(!beer) {
                return res.status(404).send({
                    message: "Beer not found with id " + req.params.beerId
                });
            }
            res.send(beer);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Beer not found with id " + req.params.beerId
            });
        }
        return res.status(500).send({
            message: "Error updating beer with id " + req.params.beerId
        });
    });
};

// Delete a beer with the specified beerId in the request
exports.delete = (req, res) => {
    Beer.findByIdAndRemove(req.params.beerId)
        .then(beer => {
            if(!beer) {
                return res.status(404).send({
                    message: "Beer not found with id " + req.params.beerId
                });
            }
            res.send({message: "Beer deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Beer not found with id " + req.params.beerId
            });
        }
        return res.status(500).send({
            message: "Could not delete beer with id " + req.params.beerId
        });
    });
};