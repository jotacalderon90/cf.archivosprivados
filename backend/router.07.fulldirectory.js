'use strict';

const controlador = require('./lib/07.fulldirectory/controller');

module.exports = {
	
  /**
   * @swagger
   * /api/filemanager/folder/full:
   *   get:
   *     tags:
   *       - Folder Full
   *     summary: obtener directorio completo como json
   *     description: obtener directorio completo como json
   */
	//@route('/api/filemanager/folder/full')
	//@method(['get'])
	//@roles(['root'])
	fulldirectory: async function(req,res){
		controlador.fulldirectory(req,res);
	}
}