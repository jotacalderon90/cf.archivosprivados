'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');

const constants = require('./constants');
const service = require('./service');

const getHost = function (host) {
  return host.split(':')[0].match(/([^.]+\.[^.]+)$/)[1];
};

module.exports = {
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
};
