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
   *     x-roles: ['root','admin','archivosprivados']
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
  //@roles(['root','admin','archivosprivados']))
  total: controlador.total,

  /**
   * @swagger
   * /api/filemanager/folder/:id/collection:
   *   get:
   *     tags:
   *       - Folder
   *     summary: colecction de carpetas
   *     description: colecction de carpetas
   *     x-roles: ['root','admin','archivosprivados']
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
  //@roles(['root','admin','archivosprivados'])
  collection: controlador.collection,

  /**
   * @swagger
   * /api/filemanager/folder/:id/download:
   *   get:
   *     tags:
   *       - Folder
   *     summary: descargar carpeta en formato zip
   *     description: descargar carpeta en formato zip
   *     x-roles: ['root','admin','archivosprivados']
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
   *           application/zip:
   *             schema:
   *               type: string
   *               format: binary
   */
  //@route('/api/filemanager/folder/:id/download')
  //@method(['get'])
  //@roles(['root','admin','archivosprivados'])
  download: controlador.download,
};
