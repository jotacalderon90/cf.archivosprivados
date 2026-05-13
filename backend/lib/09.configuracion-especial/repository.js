'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const mongodb = require('cl.jotacalderon.cf.framework/lib/mongodb');

const constants = require('./constants');

const collectionName = 'archivos_privados_configuracion';

const map = (row) => {
  row.id = row._id.toString();
  delete row._id;
  return row;
};

module.exports = {
  total: async function (query, options) {
    try {
      const total = await mongodb.count(collectionName, query, options);

      if (isNaN(total)) {
        throw new Error(total);
      }

      return total;
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.total + ' ' + constants.error.repositorio);
    }
  },

  collection: async function (query, options) {
    try {
      const collection = await mongodb.find(collectionName, query, options);

      if (!Array.isArray(collection)) {
        throw new Error(collection);
      }

      return collection.map(map);
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.collection + ' ' + constants.error.repositorio);
    }
  },

  read: async function (id) {
    try {
      const doc = await mongodb.findOne(collectionName, id);

      if (!doc._id) {
        return null;
      }

      return map(doc);
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.read + ' ' + constants.error.repositorio);
    }
  },

  create: async function (input) {
    try {
      const newdoc = {
        path: input.path,
        host: input.host,
        roles: input.roles,
      };

      const created = await mongodb.insertOne(collectionName, newdoc);

      if (!created.acknowledged) {
        throw new Error(created);
      }

      return created.insertedId.toString();
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.create + ' ' + constants.error.repositorio);
    }
  },

  update: async function (input) {
    try {
      const set = {
        roles: input.roles,
      };

      const updated = await mongodb.updateOne(collectionName, input.id, { $set: set });

      if (!updated.acknowledged) {
        throw new Error(updated);
      }

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.update + ' ' + constants.error.repositorio);
    }
  },

  delete: async function (id) {
    try {
      const deleted = await mongodb.deleteOne(collectionName, id);

      if (!deleted.acknowledged) {
        throw new Error(deleted);
      }

      return true;
    } catch (error) {
      logger.error(error);
      throw new Error(constants.error.rest.delete + ' ' + constants.error.repositorio);
    }
  },
};
