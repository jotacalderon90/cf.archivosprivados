'use strict';

const controlador = require('./lib/02.views/controller');

module.exports = {
	
  /**
   * @swagger
   * /:
   *   get:
   *     tags:
   *       - Views
   *     summary: renderizar inicio
   *     description: renderizar inicio
   */
	//@route('/')
	//@method(['get'])
	//@roles(['root','filemanager'])
	index: function(req,res){
    controlador.index(req, res);
	}
	
}