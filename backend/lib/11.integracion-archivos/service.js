'use strict';

const fs = require('fs');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const filemanager = require('../filemanager');

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
