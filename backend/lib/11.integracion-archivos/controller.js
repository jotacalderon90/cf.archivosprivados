'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');

const localip = require('../localip');

const constants = require('./constants');
const validator = require('./validator');
const service = require('./service');

const validIps = process.env.NODE_ENV === 'production' ? process.env.IPS_VALIDAS.split(',') : [];

const validaEjecucion = function (headers) {
  if (process.env.NODE_ENV === 'production') {
    if (!localip(headers['x-real-ip'])) {
      if (validIps.indexOf(headers['x-real-ip']) === -1) {
        throw new Error(constants.error.rest.bad_ip + ' ' + headers['x-real-ip']);
      }
      if (!headers['user-agent'] || headers['user-agent'] !== headers.host) {
        throw new Error(
          constants.error.rest.bad_useragent + ' ' + headers['user-agent'] + ' ' + headers.host
        );
      }
    }
  }
  return true;
};

module.exports = {
  collection: async function (req, res) {
    try {
      validaEjecucion(req.headers);

      const parseResult = validator.collection.safeParse(req.params);

      if (!parseResult.success) {
        response.renderError(req, res, constants.error.validacion);
        return;
      }

      const respuesta = await service.collection({
        ...parseResult.data,
        host: req.headers.host,
      });

      res.send({ data: respuesta });
    } catch (error) {
      logger.error(error);
      response.renderError(
        req,
        res,
        constants.error.rest.collection + ' ' + constants.error.controlador
      );
    }
  },

  download: async function (req, res) {
    try {
      validaEjecucion(req.headers);

      const parseResult = validator.download.safeParse(req.params);

      if (!parseResult.success) {
        response.renderError(req, res, constants.error.validacion);
        return;
      }

      const respuesta = await service.download({
        ...parseResult.data,
        host: req.headers.host,
      });

      res.download(respuesta);
    } catch (error) {
      logger.error(error);
      response.renderError(
        req,
        res,
        constants.error.rest.download + ' ' + constants.error.controlador
      );
    }
  },

  get: async function (req, res) {
    try {
      validaEjecucion(req.headers);

      const parseResult = validator.get.safeParse(req.params);

      if (!parseResult.success) {
        response.renderError(req, res, constants.error.validacion);
        return;
      }

      const respuesta = await service.get({ ...parseResult.data, host: req.headers.host });

      res.sendFile(respuesta);
    } catch (error) {
      logger.error(error);
      response.renderError(req, res, constants.error.rest.get + ' ' + constants.error.controlador);
    }
  },
};
