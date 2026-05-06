'use strict';

const controlador = require('./lib/06.file.admin/controller');

module.exports = {
  /**
   * @swagger
   * /api/filemanager/file/:id:
   *   post:
   *     tags:
   *       - File Admin
   *     summary: crear archivo
   *     description: crear archivo
   */
  //@route('/api/filemanager/file/:id')
  //@method(['post'])
  //@roles(['root'])
  create: controlador.create,

  /**
   * @swagger
   * /api/filemanager/file/:id:
   *   put:
   *     tags:
   *       - File Admin
   *     summary: actualizar archivo
   *     description: actualizar archivo
   */
  //@route('/api/filemanager/file/:id')
  //@method(['put'])
  //@roles(['root'])
  update: controlador.update,

  /**
   * @swagger
   * /api/filemanager/file/:id:
   *   delete:
   *     tags:
   *       - File Admin
   *     summary: eliminar archivo
   *     description: eliminar archivo
   */
  //@route('/api/filemanager/file/:id')
  //@method(['delete'])
  //@roles(['root'])
  delete: controlador.delete,

  /**
   * @swagger
   * /api/filemanager/file/:id/rename:
   *   put:
   *     tags:
   *       - File Admin
   *     summary: renombrar archivo
   *     description: renombrar archivo
   */
  //@route('/api/filemanager/file/:id/rename')
  //@method(['put'])
  //@roles(['root'])
  rename: controlador.rename,

  /**
   * @swagger
   * /api/filemanager/file/:id/uploader:
   *   post:
   *     tags:
   *       - File Admin
   *     summary: subir archivo
   *     description: subir archivo
   */
  //@route('/api/filemanager/file/:id/uploader')
  //@method(['post'])
  //@roles(['root','filemanager'])
  upload: controlador.upload,
};
