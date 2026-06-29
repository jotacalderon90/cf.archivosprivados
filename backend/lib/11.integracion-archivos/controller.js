'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');

const localip = require('../localip');

const constants = require('./constants');
const validator = require('./validator');
const service = require('./service');

const validIps = process.env.NODE_ENV === 'production' ? process.env.IPS_VALIDAS.split(',') : [];

module.exports = {
  get: async function (req, res) {
    try {
      if (process.env.NODE_ENV === 'production') {
        if (!localip(req.headers['x-real-ip'])) {
          if (validIps.indexOf(req.headers['x-real-ip']) === -1) {
            throw new Error(constants.error.rest.bad_ip + ' ' + req.headers['x-real-ip']);
          }
          if (!req.headers['user-agent'] || req.headers['user-agent'] !== req.headers.host) {
            throw new Error(
              constants.error.rest.bad_useragent +
                ' ' +
                req.headers['user-agent'] +
                ' ' +
                req.headers.host
            );
          }
        }
      }

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
