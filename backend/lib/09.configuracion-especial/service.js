'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const constants = require('./constants');
const repository = require('./repository');

module.exports = {
  total: async function (input) {
    try {
      return await repository.total({ host: input.host });
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
      return await repository.collection({ host: input.host });
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.collection + ' ' + constants.error.servicio
      );
    }
  },

  read: async function () {
    try {
      return '';
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.read + ' ' + constants.error.servicio
      );
    }
  },

  create: async function () {
    try {
      return '';
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.create + ' ' + constants.error.servicio
      );
    }
  },

  update: async function () {
    try {
      return '';
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.update + ' ' + constants.error.servicio
      );
    }
  },

  delete: async function () {
    try {
      return '';
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
