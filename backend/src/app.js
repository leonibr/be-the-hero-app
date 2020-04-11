
const express = require('express');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const app = express();
const{ errors } = require('celebrate');

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(routes);
app.use(errors());


module.exports = app;