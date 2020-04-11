
const express = require('express');
const fs = require('fs');
 if (!fs.existsSync('.env.example')) {
     fs.writeFileSync('.env.example','SECRET=dummy');
     const secret = process.env.DOTENV_CONFIG_SECRET ? process.env.DOTENV_CONFIG_SECRET : 'none';
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

const whitelist = [
'http://localhost:3333', 
'http://[::1]:3333', 
'[::1]:3333',
`https://${process.env.VIRTUAL_HOST}`]
const corsOptions = (req, callback)  =>{ 
    const origin = req.header('Origin');
    let options = {};
    if (whitelist.indexOf(origin) !== -1) {
        options = { origin: true }
    } else {
        options = { origin: false }
    }
    callback(null, options);  
}


app.use(cors(corsOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(routes);
app.use(errors());


module.exports = app;