const express = require('express');
const crypto = require('crypto');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/ongcontroller');
const IncidentsController = require('./controllers/incidentcontroller');
const ProfileController = require('./controllers/profilecontroller');
const SessionController = require('./controllers/sessioncontroller');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}) , SessionController.create);

routes.get('/ongs', OngController.index);

routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string().required()
    })
  }),
  OngController.create
);

routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentsController.index
);
routes.post(
  '/incidents',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string()
        .required()
        .min(3)
        .max(100),
      description: Joi.string()
        .required()
        .max(1000),
      value: Joi.number()
        .required()
        .min(0)
    })
  }),
  IncidentsController.create
);

routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentsController.delete
);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

module.exports = routes;
