'use strict';

const fs = require('fs');
const path = require('path');

const unzipper = require('unzipper');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const helper = require('cl.jotacalderon.cf.framework/lib/helper');

const filemanager = require('../filemanager');

const constants = require('./constants');

module.exports = {
  create: async function (input) {
    try {
      await fs.promises.writeFile(
        filemanager.get(input.id, input.host) + input.name,
        input.content || ''
      );

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.create + ' ' + constants.error.servicio);
    }
  },

  update: async function (input) {
    try {
      await fs.promises.writeFile(filemanager.get(input.id, input.host), input.content);

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.update + ' ' + constants.error.servicio);
    }
  },

  delete: async function (input) {
    try {
      const deleted = await fs.promises.unlink(filemanager.get(input.id, input.host));
      logger.info(deleted);

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.delete + ' ' + constants.error.servicio);
    }
  },

  rename: async function (input) {
    try {
      await fs.promises.rename(
        filemanager.get(input.id, input.host),
        filemanager.base(input.host) + '/' + input.name
      );

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.download + ' ' + constants.error.servicio);
    }
  },

  upload: async function (input) {
    try {
      const filename = filemanager.get(input.id, input.host) + input.file.name;

      await helper.upload_process(input.file, filename);

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.upload + ' ' + constants.error.servicio);
    }
  },

  extract: async function (input) {
    try {
      const zipDirectory = filemanager.get(input.id, input.host);
      if (!zipDirectory.endsWith('.zip')) {
        return constants.error.rest.extract_invalidZip + ' ' + constants.error.servicio;
      }

      const destinationFolder = path.dirname(zipDirectory);

      await fs
        .createReadStream(zipDirectory)
        .pipe(unzipper.Extract({ path: destinationFolder }))
        .promise();

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.extract + ' ' + constants.error.servicio);
    }
  },
};
