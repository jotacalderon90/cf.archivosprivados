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
   */
  //@route('/api/filemanager/file/:id/total')
  //@method(['get'])
  //@roles(['root','filemanager'])
  total: controlador.total,

  /**
   * @swagger
   * /api/filemanager/file/:id/collection:
   *   get:
   *     tags:
   *       - File
   *     summary: colección de archivos
   *     description: colección de archivos
   */
  //@route('/api/filemanager/file/:id/collection')
  //@method(['get'])
  //@roles(['root','filemanager'])
  collection: controlador.collection,

  /**
   * @swagger
   * /api/filemanager/file/:id:
   *   get:
   *     tags:
   *       - File
   *     summary: leer contenido de archivo
   *     description: leer contenido de archivo
   */
  //@route('/api/filemanager/file/:id')
  //@method(['get'])
  //@roles(['root','filemanager'])
  read: controlador.read,

  /**
   * @swagger
   * /api/filemanager/file/:id/download:
   *   get:
   *     tags:
   *       - File
   *     summary: descargar archivo
   *     description: descargar archivo
   */
  //@route('/api/filemanager/file/:id/download')
  //@method(['get'])
  //@roles(['root','filemanager'])
  download: controlador.download,

  /**
   * @swagger
   * /api/filemanager/file/:id/getfile:
   *   get:
   *     tags:
   *       - File
   *     summary: leer archivo directamente
   *     description: leer archivo directamente
   */
  //@route('/api/filemanager/file/:id/getfile')
  //@method(['get'])
  //@roles(['root','filemanager'])
  get: controlador.get,
};
