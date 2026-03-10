'use strict';

const controlador = require('./lib/03.folder/controller');

module.exports = {
	
  /**
   * @swagger
   * /api/filemanager/folder/:id/total:
   *   get:
   *     tags:
   *       - Folder
   *     summary: total de carpetas
   *     description: total de carpetas
   */
	//@route('/api/filemanager/folder/:id/total')
	//@method(['get']
	//@roles(['root','filemanager']))
	total: async function(req,res){
		controlador.total(req, res);
	},
	
  /**
   * @swagger
   * /api/filemanager/folder/:id/collection:
   *   get:
   *     tags:
   *       - Folder
   *     summary: colecction de carpetas
   *     description: colecction de carpetas
   */
	//@route('/api/filemanager/folder/:id/collection')
	//@method(['get'])
	//@roles(['root','filemanager'])
	collection: async function(req,res){
    controlador.collection(req, res);
	}
	
}