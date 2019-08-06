const cors = require('cors');

module.exports = function(app) {
    app.use(
        cors({
            origin: [process.env.FRONTEND_URL],
            credentials: true,
            optionsSuccessStatus: 200,
        })
    );
};