'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const response = require('cl.jotacalderon.cf.framework/lib/response');

const constants = require('./constants');
const service = require('./service');

module.exports = {
  
  fulldirectory: async function(req, res) {
    try{
      
      const respuesta = await service.fulldirectory();
      
      res.send({data: respuesta});
      
		}catch(error){
			logger.error(error);
			response.APIError(req, res, constants.error.rest.fulldirectory + ' ' + constants.error.controlador);
		}
  }
  
}