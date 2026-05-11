'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');

const constants = require('./constants');
//const validator = require('./validator');
const service = require('./service');

const getHost = function (host) {
  return host.split(':')[0].match(/([^.]+\.[^.]+)$/)[1];
};

module.exports = {
  total: async function (req, res) {
    try {
      const respuesta = await service.total({ host: getHost(req.headers.host) });

      if (typeof respuesta === 'string') {
        logger.error(respuesta);
        response.APIError(req, res, respuesta);
        return;
      }

      res.send({ data: respuesta });
    } catch (error) {
      logger.error(error);
      response.APIError(req, res, constants.error.rest.total + ' ' + constants.error.controlador);
    }
  },

  collection: async function (req, res) {
    try {
      const respuesta = await service.collection({ host: getHost(req.headers.host) });

      if (typeof respuesta === 'string') {
        logger.error(respuesta);
        response.APIError(req, res, respuesta);
        return;
      }

      res.send({ data: respuesta });
    } catch (error) {
      logger.error(error);
      response.APIError(
        req,
        res,
        constants.error.rest.collection + ' ' + constants.error.controlador
      );
    }
  },

  read: async function (req, res) {
    try {
      const respuesta = await service.read({ ...req.params.id, host: getHost(req.headers.host) });

      if (typeof respuesta === 'string') {
        logger.error(respuesta);
        response.APIError(req, res, respuesta);
        return;
      }

      res.send({ data: respuesta });
    } catch (error) {
      logger.error(error);
      response.APIError(req, res, constants.error.rest.read + ' ' + constants.error.controlador);
    }
  },

  create: async function (req, res) {
    try {
      const respuesta = await service.create({ ...req.body, host: getHost(req.headers.host) });

      if (typeof respuesta === 'string') {
        logger.error(respuesta);
        response.APIError(req, res, respuesta);
        return;
      }

      res.send({ data: respuesta });
    } catch (error) {
      logger.error(error);
      response.APIError(req, res, constants.error.rest.create + ' ' + constants.error.controlador);
    }
  },

  update: async function (req, res) {
    try {
      const respuesta = await service.update({
        ...req.body,
        id: req.params.id,
        host: getHost(req.headers.host),
      });

      if (typeof respuesta === 'string') {
        logger.error(respuesta);
        response.APIError(req, res, respuesta);
        return;
      }

      res.send({ data: respuesta });
    } catch (error) {
      logger.error(error);
      response.APIError(req, res, constants.error.rest.update + ' ' + constants.error.controlador);
    }
  },

  delete: async function (req, res) {
    try {
      const respuesta = await service.delete({ ...req.params.id, host: getHost(req.headers.host) });

      if (typeof respuesta === 'string') {
        logger.error(respuesta);
        response.APIError(req, res, respuesta);
        return;
      }

      res.send({ data: respuesta });
    } catch (error) {
      logger.error(error);
      response.APIError(req, res, constants.error.rest.delete + ' ' + constants.error.controlador);
    }
  },
};
