module.exports = (app) => {
    const beers = require('../controllers/beer.controller.js');
    const authentication = require('../controllers/authentication.controller')

    // Create a new Note
    app.post('/beers', authentication.isAuthenticated, beers.create);

    // Retrieve all Notes
    app.get('/beers', beers.findAll);

    // Retrieve a single Note with noteId
    app.get('/beers/:beerId', beers.findOne);

    // Update a Note with noteId
    app.put('/beers/:beerId', beers.update);

    // Delete a Note with noteId
    app.delete('/beers/:beerId', beers.delete);
}