var express = require('express');
var router = express.Router();

var authController = require('../controllers/users/index.controller');

var userController = require('../controllers/users/index.controller');

router.get('/', (req, res) => {
    res.send('Welcome');
});

// User Routes
router.route('/users').get(userController.GetUsers).post(userController.PostUser);
router.route('/users/deleteAll').delete(userController.DeleteAll);
router.route('/users/:userID([a-zA-Z0-9]{24})').get(userController.GetUser).put(userController.PutUser).delete(userController.DeleteUser);



// Routes 404
router.use(function(req, res) {
    res.status(404);
    res.send({message: `${req.url} is invalid path`})
})

module.exports = router;