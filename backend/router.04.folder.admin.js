'use strict';

const controlador = require('./lib/04.folder.admin/controller');

module.exports = {
  /**
   * @swagger
   * /api/filemanager/folder:
   *   post:
   *     tags:
   *       - Folder Admin
   *     summary: crear carpeta
   *     description: crear carpeta
   */
  //@route('/api/filemanager/folder')
  //@method(['post'])
  //@roles(['root'])
  create: controlador.create,

  /**
   * @swagger
   * /api/filemanager/folder/:id:
   *   put:
   *     tags:
   *       - Folder Admin
   *     summary: actualizar carpeta
   *     description: actualizar carpeta
   */
  //@route('/api/filemanager/folder/:id')
  //@method(['put'])
  //@roles(['root'])
  update: controlador.update,

  /**
   * @swagger
   * /api/filemanager/folder/:id:
   *   delete:
   *     tags:
   *       - Folder Admin
   *     summary: eliminar carpeta
   *     description: eliminar carpeta
   */
  //@route('/api/filemanager/folder/:id')
  //@method(['delete'])
  //@roles(['root'])
  delete: controlador.delete,
};
