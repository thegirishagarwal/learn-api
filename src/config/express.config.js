const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '25mb', extended: true, type: 'application/json' }));
module.exports = app;