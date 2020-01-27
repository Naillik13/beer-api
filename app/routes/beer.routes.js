module.exports = (router) => {
    const beers = require('../controllers/beer.controller.js');
    const authentication = require('../controllers/authentication.controller');

    // Create a new Beer
    router.post('/beers', authentication.isAdmin, beers.create);

    // Retrieve all Beers
    router.get('/beers', beers.findAll);

    // Retrieve a single Beer with beerId
    router.get('/beers/:beerId', beers.findOne);

    // Update a Beer with beerId
    router.put('/beers/:beerId', authentication.isAdmin, beers.update);

    // Delete a Beer with beerId
    router.delete('/beers/:beerId', authentication.isAdmin, beers.delete);
};