const express = require('express');
const bodyParser = require('body-parser');
const formValidator = require('./middlewares/form-validator');

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formValidator);

const routes = require('./routes');
app.use('/', routes);

module.exports = app;
