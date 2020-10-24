var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth.controller');

var userController = require('../controllers/users/index.controller');

router.get('/', (req, res) => {
    res.send('Welcome');
});

// User Routes

router.get('/users', userController.GetUsers);
router.get('/users/:userID', userController.GetUser);
router.post('/users', userController.PostUser);


module.exports = router;