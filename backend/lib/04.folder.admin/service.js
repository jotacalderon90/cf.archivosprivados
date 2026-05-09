'use strict';

const fs = require('fs');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const constants = require('./constants');

const filemanager = require('../filemanager');

module.exports = {
  create: async function (input) {
    try {
      fs.mkdirSync(filemanager.get(input.id, input.host) + input.name);

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.create + ' ' + constants.error.servicio
      );
    }
  },

  update: async function (input) {
    try {
      fs.renameSync(
        filemanager.get(input.id, input.host),
        filemanager.base(input.host) + input.name
      );

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.update + ' ' + constants.error.servicio
      );
    }
  },

  delete: async function (input) {
    try {
      fs.rmdirSync(filemanager.get(input.id, input.host));

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.delete + ' ' + constants.error.servicio
      );
    }
  },
};
