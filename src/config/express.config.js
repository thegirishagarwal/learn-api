const express = require('express');
const bodyParser = require('body-parser');

global.constant = require('../config/constants');
global.responseData = require('../helpers/common.helper');
global.apiMessage = require('../config/apiRes.msg');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '25mb', extended: true, type: 'application/json' }));
module.exports = app;