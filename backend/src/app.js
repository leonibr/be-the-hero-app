
const express = require('express');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const{ errors } = require('celebrate');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());


module.exports = app;