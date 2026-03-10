'use strict';

const controlador = require('./lib/08.funciones-extras/controller');

module.exports = {
	
  /**
   * @swagger
   * /api/convertitmdhtml:
   *   post:
   *     tags:
   *       - Extras
   *     summary: convertur md a html
   *     description: convertur md a html
   */
	//@route('/api/convertitmdhtml')
	//@method(['post'])
	//@roles(['root','filemanager'])
	convertitmdhtml: async function(req,res){
		controlador.convertitmdhtml(req,res);
	},
  
  /**
   * @swagger
   * /api/convertitcsvjson:
   *   post:
   *     tags:
   *       - Extras
   *     summary: convertur csv a json
   *     description: convertur csv a json
   */
	//@route('/api/convertitcsvjson')
	//@method(['post'])
	//@roles(['root','filemanager'])
	convertitcsvjson: async function(req,res){
		controlador.convertitcsvjson(req,res);
	}
}