"use strict";

const fs = require("fs");
const path = require("path");
const logger = require('cl.jotacalderon.cf.framework/lib/log')('api.01.filemanager.default');
const response = require('cl.jotacalderon.cf.framework/lib/response');
const directory = process.cwd() + "/frontend/assets/";

const decode = function(value){
	return decodeURIComponent(new Buffer(value,"base64"));
}

module.exports = {

	
	//@route('/api/filemanager/folder/:id/total')
	//@method(['get'])
	//@roles(['root','filemanager'])
	total: async function(req,res){
		try{
			const dir = directory + decode(req.params.id);
			const response = fs.readdirSync(dir,"utf8").filter(function(row){
				return !fs.statSync(path.join(dir,row)).isFile();
			}).length;
			res.send({data: response});
		}catch(error){
			logger.error(error);
			response.APIError(req,res,error);
		}
	},
	
	//@route('/api/filemanager/folder/:id/collection')
	//@method(['get'])
	//@roles(['root','filemanager'])
	collection: async function(req,res){
		try{
			const dir = directory + decode(req.params.id);
			const response = fs.readdirSync(dir,"utf8").filter(function(row){
				return !fs.statSync(path.join(dir,row)).isFile();
			});
			res.send({data: response});
		}catch(error){
			logger.error(error);
			response.APIError(req,res,error);
		}
	},
	
	//@route('/api/filemanager/folder/:id')
	//@method(['post'])
	//@roles(['root','filemanager'])
	create: async function(req,res){
		try{
			fs.mkdirSync(directory + decode(req.params.id) + req.body.name);
			res.send({data: true});
		}catch(error){
			logger.error(error);
			response.APIError(req,res,error);
		}
	},
	
	//@route('/api/filemanager/folder/:id')
	//@method(['put'])
	//@roles(['root'])
	update: async function(req,res){
		try{
			fs.renameSync(directory + decode(req.params.id), directory + "/" + req.body.name);
			res.send({data: true});
		}catch(error){
			logger.error(error);
			response.APIError(req,res,error);
		}
	},
	
	//@route('/api/filemanager/folder/:id')
	//@method(['delete'])
	//@roles(['root'])
	delete: async function(req,res){
		try{
			fs.rmdirSync(directory + decode(req.params.id));
			res.send({data: true});
		}catch(error){
			logger.error(error);
			response.APIError(req,res,error);
		}
	}
}