const { auth } = require('../handlers');

module.exports = function(app) {

    // Retrieve all Users
    app.post('/register', auth.register);

    // Retrieve all Users
    app.post('/login', auth.login);

    // Retrieve all Users
    app.get('/logout', auth.logout);

    // Retrieve all Users
    app.post('/reset-request', auth.resetRequest);

    // Retrieve all Users
    app.post('/reset-password', auth.resetPassword);
   
};
