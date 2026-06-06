'use strict';

const fs = require('fs');
const path = require('path');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const redis = require('cl.jotacalderon.cf.framework/lib/redis');

const filemanager = require('../filemanager');

const constants = require('./constants');

module.exports = {
  total: async function (input) {
    try {
      const dir = filemanager.get(input.id, input.host);

      return fs.readdirSync(dir, 'utf8').filter(function (row) {
        return fs.statSync(path.join(dir, row)).isFile();
      }).length;
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.total + ' ' + constants.error.servicio
      );
    }
  },

  collection: async function (input) {
    try {
      if (redis.client) {
        const cached = await redis.get('file' + input.id + input.host);
        if (cached) return cached;
      }

      const dir = filemanager.get(input.id, input.host);

      const respuesta = fs.readdirSync(dir, 'utf8').filter(function (row) {
        return fs.statSync(path.join(dir, row)).isFile();
      });

      if (redis.client) {
        redis.set('file' + input.id + input.host, respuesta, 60);
      }

      return respuesta;
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.collection + ' ' + constants.error.servicio
      );
    }
  },

  read: async function (input) {
    try {
      return fs.readFileSync(filemanager.get(input.id, input.host), 'utf8');
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.read + ' ' + constants.error.servicio
      );
    }
  },

  download: async function (input) {
    try {
      return filemanager.get(input.id, input.host);
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.download + ' ' + constants.error.servicio
      );
    }
  },

  get: async function (input) {
    try {
      return filemanager.get(input.id, input.host);
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.get + ' ' + constants.error.servicio
      );
    }
  },
};
