module.exports = (router) => {
    const beers = require('../controllers/place.controller.js');
    const authentication = require('../controllers/authentication.controller');

    // Create a new Place
    router.post('/places', authentication.isAdmin, beers.create);

    // Retrieve all Places
    router.get('/places', beers.findAll);

    // Retrieve a single Place with placeId
    router.get('/places/:placeId', beers.findOne);

    // Update a Place with placeId
    router.put('/places/:placeId', authentication.isAdmin, beers.update);

    // Delete a Place with placeId
    router.delete('/places/:placeId', authentication.isAdmin, beers.delete);
};