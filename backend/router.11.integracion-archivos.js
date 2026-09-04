'use strict';

const controlador = require('./lib/11.integracion-archivos/controller');

module.exports = {
  /**
   * @swagger
   * /api/integration/collection/{id}:
   *   get:
   *     tags:
   *       - Configuración especial
   *     summary: Servicio para obtener colección de archivos privados desde otro sistema, ejm eciotec
   *     description: Servicio para colección de archivos privados desde otro sistema, ejm eciotec
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/integration/collection/:id')
  //@method(['get'])
  collection: controlador.collection,

  /**
   * @swagger
   * /api/integration/download/{id}:
   *   get:
   *     tags:
   *       - Configuración especial
   *     summary: Servicio para transferir archivo desde otro sistema, ejm eciotec
   *     description: Servicio para para transferir archivo desde otro sistema, ejm eciotec
   *     responses:
   *       200:
   *         description: Archivo descargado correctamente
   *         content:
   *           application/octet-stream:
   *             schema:
   *               type: string
   *               format: binary
   */
  //@route('/api/integration/download/:id')
  //@method(['get'])
  download: controlador.download,

  /**
   * @swagger
   * /api/integration/get/{id}:
   *   get:
   *     tags:
   *       - Configuración especial
   *     summary: Servicio para leer archivo privado desde otro sistema, ejm ecommerce
   *     description: Servicio para leer archivo privado desde otro sistema, ejm ecommerce
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/integration/get/:id')
  //@method(['get'])
  get: controlador.get,
};
