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
   *     x-roles: ['admin','archivosprivados']
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/filemanager/folder/:id/total')
  //@method(['get']
  //@roles(['admin','archivosprivados']))
  total: controlador.total,

  /**
   * @swagger
   * /api/filemanager/folder/:id/collection:
   *   get:
   *     tags:
   *       - Folder
   *     summary: colecction de carpetas
   *     description: colecction de carpetas
   *     x-roles: ['admin','archivosprivados']
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/filemanager/folder/:id/collection')
  //@method(['get'])
  //@roles(['admin','archivosprivados'])
  collection: controlador.collection,
};
