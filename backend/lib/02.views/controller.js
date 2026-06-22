'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');

const domain = require('../domain');

const constants = require('./constants');
const validator = require('./validator');

module.exports = {
  index: async function (req, res) {
    try {
      res.render('filemanager/index/_', {
        roles: req.user ? req.user.roles : [],
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
        roles: req.user ? req.user.roles : [],
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

  renderHtml: async function (req, res) {
    try {
      const parseResult = validator.renderHtml.safeParse(req.params);

      if (!parseResult.success) {
        response.APIError(req, res, constants.error.validacion);
        return;
      }

      res.render('filemanager/html_editor/_', {
        roles: req.user ? req.user.roles : [],
        __hostAccount: domain.getHostAccount(req),
        filepath: parseResult.data.filepath,
      });
    } catch (error) {
      logger.error(error);
      response.renderError(
        req,
        res,
        constants.error.rest.renderHtml + ' ' + constants.error.controlador
      );
    }
  },
};
