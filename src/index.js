require('dotenv').config();
require("./config/db");
const app = require('./config/express.config');

app.use(function(req, res, next){
    if (!req.headers['content-type'] || req.headers['content-type'] !== 'application/json') {
        const response = {
            responseCode: 401,
            responseMessage: 'Content-type is invalid',
            responseData: ''
        };
        res.send(response)
    }

    next()
});
/** --- Define a simple route ------ */
const indexRoutes = require('./routes/index.routes');

app.use('/', indexRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));