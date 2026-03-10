'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');

const constants = require('./constants');
const validator = require('./validator');
const service = require('./service');

module.exports = {
  
  create: async function(req, res) {
    try{
      
      const parseResult = validator.create.safeParse(req.body);
      
      if (!parseResult.success) {
        logger.error(parseResult);
        response.APIError(req, res, constants.error.validacion);
        return;
      }
      
      const respuesta = await service.create(parseResult.data);
      
      res.send({data: respuesta});
      
		}catch(error){
			logger.error(error);
			response.APIError(req, res, constants.error.rest.create + ' ' + constants.error.controlador);
		}
  },
  
  update: async function(req, res) {
    try{
      
      const parseResult = validator.update.safeParse(req.body);
      
      if (!parseResult.success) {
        logger.error(parseResult);
        response.APIError(req, res, constants.error.validacion);
        return;
      }
      
      const respuesta = await service.update(parseResult.data);
      
      res.send({data: respuesta});
      
		}catch(error){
			logger.error(error);
			response.APIError(req, res, constants.error.rest.update + ' ' + constants.error.controlador);
		}
  },
  
  delete: async function(req, res) {
    try{
      
      const parseResult = validator.delete.safeParse(req.params);
      
      if (!parseResult.success) {
        logger.error(parseResult);
        response.APIError(req, res, constants.error.validacion);
        return;
      }
      
      const respuesta = await service.delete(parseResult.data);
      
      res.send({data: respuesta});
      
		}catch(error){
			logger.error(error);
			response.APIError(req, res, constants.error.rest.delete + ' ' + constants.error.controlador);
		}
  }
}