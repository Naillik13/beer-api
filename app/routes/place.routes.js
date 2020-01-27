module.exports = (router) => {
    const beers = require('../controllers/place.controller.js');

    // Create a new Place
    router.post('/places', beers.create);

    // Retrieve all Places
    router.get('/places', beers.findAll);

    // Retrieve a single Place with placeId
    router.get('/places/:placeId', beers.findOne);

    // Update a Place with placeId
    router.put('/places/:placeId', beers.update);

    // Delete a Place with placeId
    router.delete('/places/:placeId', beers.delete);
};