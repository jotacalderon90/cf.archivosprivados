"use strict";

const logger = require('cl.jotacalderon.cf.framework/lib/log')('api.00.account.default');
const accesscontrol = require('cl.jotacalderon.cf.framework/lib/accesscontrol');
const response = require('cl.jotacalderon.cf.framework/lib/response');

module.exports = {
	
	//@route('/api/account')
	//@method(['get'])
	account: async function(req,res){
		try{
			req.user = await accesscontrol.getUser(req);
			res.send({data: req.user});
		}catch(error){
			logger.error(error);
			response.APIError(req,res,error);
		}
	}
}