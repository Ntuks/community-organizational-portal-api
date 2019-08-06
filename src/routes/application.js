const { application } = require('../handlers');

module.exports = function(app) {

    // Retrieve all Users
    app.get('/clean', application.clean);

};
