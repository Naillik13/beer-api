module.exports = (app) => {
    const beers = require('../controllers/place.controller.js');

    // Create a new Note
    app.post('/places', beers.create);

    // Retrieve all Notes
    app.get('/places', beers.findAll);

    // Retrieve a single Note with noteId
    app.get('/places/:placeId', beers.findOne);

    // Update a Note with noteId
    app.put('/places/:placeId', beers.update);

    // Delete a Note with noteId
    app.delete('/places/:placeId', beers.delete);
}