'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');
const constants = require('./constants');

const domain = require('../domain');

module.exports = {
  index: async function (req, res) {
    try {
      res.render('filemanager/index/_', {
        user: req.usera,
        __hostAccount: domain.getHostAccount(req),
      });
    } catch (error) {
      logger.error(error);
      response.renderError(
        req,
        res,
        constants.error.rest.index + ' ' + constants.error.controlador
      );
    }
  },

  configuration: async function (req, res) {
    try {
      res.render('filemanager/configuration/_', {
        user: req.user,
        __hostAccount: domain.getHostAccount(req),
      });
    } catch (error) {
      logger.error(error);
      response.renderError(
        req,
        res,
        constants.error.rest.configuration + ' ' + constants.error.controlador
      );
    }
  },
};
