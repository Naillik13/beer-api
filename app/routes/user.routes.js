module.exports = (router) => {
    const users = require('../controllers/user.controller.js');
    const authentication = require('../controllers/authentication.controller');

    // Create a new User
    router.post('/users', users.create);

    // Retrieve a single User with userId
    router.get('/users/:userId', users.findOne);

    // Delete a User with userId
    router.delete('/users/:userId', authentication.isAuthenticated, users.delete);
}