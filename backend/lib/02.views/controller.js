'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');
const constants = require('./constants');

const getHostAccount = function (req) {
  let hostAccount = '';
  if (process.env.NODE_ENV === 'production' && process.env.FRONT_MULTIDOMAIN === '1') {
    hostAccount = req.protocol + '://' + req.headers.host.replace(/^([^.:]+)/, 'account');
  } else {
    hostAccount = process.env.HOST_ACCOUNT;
  }
  return hostAccount;
};

module.exports = {
  index: async function (req, res) {
    try {
      res.render('filemanager/_', {
        user: req.user,
        __hostAccount: getHostAccount(req),
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
};
