module.exports = (app) => {
    const beers = require('../controllers/beer.controller.js');

    // Create a new Note
    app.post('/beers', beers.create);

    // Retrieve all Notes
    app.get('/beers', beers.findAll);

    // Retrieve a single Note with noteId
    app.get('/beers/:beerId', beers.findOne);

    // Update a Note with noteId
    app.put('/beers/:beerId', beers.update);

    // Delete a Note with noteId
    app.delete('/beers/:beerId', beers.delete);
}