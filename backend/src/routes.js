
const express = require('express');
const crypto = require('crypto');


const OngController = require('./controllers/ongcontroller');
const IncidentsController = require('./controllers/incidentcontroller');
const ProfileController = require('./controllers/profilecontroller');
const SessionController = require('./controllers/sessioncontroller');




const routes = express.Router();


routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

routes.get('/profile', ProfileController.index)



module.exports = routes;