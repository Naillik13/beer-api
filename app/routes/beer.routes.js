module.exports = (router) => {
    const beers = require('../controllers/beer.controller.js');
    const authentication = require('../controllers/authentication.controller');

    // Create a new Note
    router.post('/beers', authentication.isAdmin, beers.create);

    // Retrieve all Notes
    router.get('/beers', beers.findAll);

    // Retrieve a single Note with noteId
    router.get('/beers/:beerId', beers.findOne);

    // Update a Note with noteId
    router.put('/beers/:beerId', authentication.isAdmin, beers.update);

    // Delete a Note with noteId
    router.delete('/beers/:beerId', authentication.isAdmin, beers.delete);
}