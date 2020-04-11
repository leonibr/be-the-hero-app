
const express = require('express');
const fs = require('fs');
 if (!fs.existsSync('.env.example')) {
     fs.writeFileSync('.env.example','SECRET=dummy');
     const secret = process.env.DOTENV_CONFIG_SECRET ?? 'none';
     fs.writeFileSync('.env',`SECRET=${secret}`);

 }
require("dotenv-safe").config({
    allowEmptyValues: true
});
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