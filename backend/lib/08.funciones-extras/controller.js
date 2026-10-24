'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');

const constants = require('./constants');
const validator = require('./validator');
const service = require('./service');

module.exports = {
  
  convertitmdhtml: async function(req, res) {
    try{
      
      const parseResult = validator.convertitmdhtml.safeParse(req.body);
      
      if (!parseResult.success) {
        logger.error(parseResult);
        response.APIError(req, res, constants.error.validacion);
        return;
      }
      
      const respuesta = await service.convertitmdhtml(parseResult.data);
      
      res.send({data: respuesta});
      
		}catch(error){
			logger.error(error);
			response.APIError(req, res, constants.error.rest.convertitmdhtml + ' ' + constants.error.controlador);
		}
  },
  
  convertitcsvjson: async function(req, res) {
    try{
      
      const parseResult = validator.convertitcsvjson.safeParse(req.body);
      
      if (!parseResult.success) {
        logger.error(parseResult);
        response.APIError(req, res, constants.error.validacion);
        return;
      }
      
      const respuesta = await service.convertitcsvjson(parseResult.data);
      
      res.send({data: respuesta});
      
		}catch(error){
			logger.error(error);
			response.APIError(req, res, constants.error.rest.convertitcsvjson + ' ' + constants.error.controlador);
		}
  }
  
}