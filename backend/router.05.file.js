'use strict';

const controlador = require('./lib/05.file/controller');

module.exports = {
  /**
   * @swagger
   * /api/filemanager/file/:id/total:
   *   get:
   *     tags:
   *       - File
   *     summary: total de archivos
   *     description: total de archivos
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
  //@route('/api/filemanager/file/:id/total')
  //@method(['get'])
  //@roles(['admin','archivosprivados'])
  total: controlador.total,

  /**
   * @swagger
   * /api/filemanager/file/:id/collection:
   *   get:
   *     tags:
   *       - File
   *     summary: colección de archivos
   *     description: colección de archivos
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
  //@route('/api/filemanager/file/:id/collection')
  //@method(['get'])
  //@roles(['admin','archivosprivados'])
  collection: controlador.collection,

  /**
   * @swagger
   * /api/filemanager/file/:id:
   *   get:
   *     tags:
   *       - File
   *     summary: leer contenido de archivo
   *     description: leer contenido de archivo
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
  //@route('/api/filemanager/file/:id')
  //@method(['get'])
  //@roles(['admin','archivosprivados'])
  read: controlador.read,

  /**
   * @swagger
   * /api/filemanager/file/:id/download:
   *   get:
   *     tags:
   *       - File
   *     summary: descargar archivo
   *     description: descargar archivo
   *     x-roles: ['admin','archivosprivados']
   *     responses:
   *       200:
   *         description: Archivo descargado correctamente
   *         content:
   *           application/octet-stream:
   *             schema:
   *               type: string
   *               format: binary
   */
  //@route('/api/filemanager/file/:id/download')
  //@method(['get'])
  //@roles(['admin','archivosprivados'])
  download: controlador.download,

  /**
   * @swagger
   * /api/filemanager/file/:id/getfile:
   *   get:
   *     tags:
   *       - File
   *     summary: leer archivo directamente
   *     description: leer archivo directamente
   *     x-roles: ['admin','archivosprivados']
   *     responses:
   *       200:
   *         description: Archivo obtenido correctamente
   *         content:
   *           application/octet-stream:
   *             schema:
   *               type: string
   *               format: binary
   */
  //@route('/api/filemanager/file/:id/getfile')
  //@method(['get'])
  //@roles(['admin','archivosprivados'])
  get: controlador.get,
};
