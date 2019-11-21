module.exports = (router) => {
    const beers = require('../controllers/place.controller.js');

    // Create a new Note
    router.post('/places', beers.create);

    // Retrieve all Notes
    router.get('/places', beers.findAll);

    // Retrieve a single Note with noteId
    router.get('/places/:placeId', beers.findOne);

    // Update a Note with noteId
    router.put('/places/:placeId', beers.update);

    // Delete a Note with noteId
    router.delete('/places/:placeId', beers.delete);
}