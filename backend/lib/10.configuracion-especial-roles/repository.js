'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const mongodb = require('cl.jotacalderon.cf.framework/lib/mongodb');

const constants = require('./constants');

module.exports = {
  collection: async function (query) {
    try {
      const collection = await mongodb.find('roles', query, { projection: { _id: 1, nombre: 1 } });

      if (!Array.isArray(collection)) {
        throw new Error(collection);
      }

      return collection.map((r) => ({ ...r, id: r._id.toString() }));
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.collection + ' ' + constants.error.repositorio);
    }
  },
};
