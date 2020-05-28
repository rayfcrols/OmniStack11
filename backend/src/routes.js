const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required().length(8),
    }),
  }),
  SessionController.create
);

routes.get('/ongs', OngController.index);

routes.get(
  '/ongs/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required().length(8),
    }),
  }),
  OngController.show
);

routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(3),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().length(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    }),
  }),
  OngController.create
);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
  }),
  ProfileController.index
);

routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
    // [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
  }),
  IncidentController.index
);

routes.get(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
  }),
  IncidentController.show
);

routes.post(
  '/incidents',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().min(3),
      description: Joi.string().required(),
      value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
  }),
  IncidentController.create
);

routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
  }),
  IncidentController.delete
);

module.exports = routes;
