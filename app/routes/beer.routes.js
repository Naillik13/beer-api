module.exports = (router) => {
    const beers = require('../controllers/beer.controller.js');
    const authentication = require('../controllers/authentication.controller')

    // Create a new Note
    router.post('/beers', authentication.isAuthenticated, beers.create);

    // Retrieve all Notes
    router.get('/beers', authentication.isAuthenticated, beers.findAll);

    // Retrieve a single Note with noteId
    router.get('/beers/:beerId', beers.findOne);

    // Update a Note with noteId
    router.put('/beers/:beerId', beers.update);

    // Delete a Note with noteId
    router.delete('/beers/:beerId', beers.delete);
}