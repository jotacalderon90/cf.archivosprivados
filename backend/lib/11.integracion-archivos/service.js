'use strict';

const fs = require('fs');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const filemanager = require('../filemanager');
const AppError = require('../error');

const constants = require('./constants');

module.exports = {
  collection: async function (input) {
    try {
      const dir = filemanager.get(input.id, input.host);

      const entries = await fs.promises.readdir(dir, { withFileTypes: true });
      const respuesta = entries.filter((dirent) => dirent.isFile()).map((dirent) => dirent.name);

      return respuesta;
    } catch (error) {
      logger.error(error);
      const code = error?.code;
      const message = error?.message ?? String(error);
      if (code === 'ENOENT' || message.includes('ENOENT')) {
        throw new AppError('ENOENT', 404);
      }
      throw new Error(constants.error.rest.collection + ' ' + constants.error.servicio);
    }
  },
  download: async function (input) {
    try {
      return filemanager.get(input.id, input.host);
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.collection + ' ' + constants.error.servicio);
    }
  },
  get: async function (input) {
    try {
      return filemanager.get(input.id, input.host);
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.get + ' ' + constants.error.servicio);
    }
  },
};
