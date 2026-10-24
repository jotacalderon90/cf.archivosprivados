'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const constants = require('./constants');
const repository = require('./repository');

module.exports = {
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
};
