'use strict';

const fs = require('fs');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const helper = require('cl.jotacalderon.cf.framework/lib/helper');

const filemanager = require('../filemanager');

const constants = require('./constants');

module.exports = {
  create: async function (input) {
    try {
      fs.writeFileSync(filemanager.get(input.id, input.host) + input.name, input.content || '');

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
      fs.writeFileSync(filemanager.get(input.id, input.host), input.content);

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
      const deleted = fs.unlinkSync(filemanager.get(input.id, input.host));
      logger.info(deleted);

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

  rename: async function (input) {
    try {
      fs.renameSync(
        filemanager.get(input.id, input.host),
        filemanager.base(input.host) + '/' + input.name
      );

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.download + ' ' + constants.error.servicio
      );
    }
  },

  upload: async function (input) {
    try {
      const filename = filemanager.get(input.id, input.host) + input.file.name;

      await helper.upload_process(input.file, filename);

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.upload + ' ' + constants.error.servicio
      );
    }
  },
};
