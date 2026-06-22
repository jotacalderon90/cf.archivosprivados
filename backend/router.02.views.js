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
   *     x-roles: ['root','admin','archivosprivados']
   *     responses:
   *       200:
   *         description: Respuesta en HTML
   *         content:
   *           text/html:
   *             schema:
   *               type: string
   */
  //@route('/')
  //@method(['get'])
  //@roles(['root','admin','archivosprivados'])
  index: controlador.index,

  /**
   * @swagger
   * /admin/configuration:
   *   get:
   *     tags:
   *       - Views
   *     summary: renderizar configuracion
   *     description: renderizar configuracion
   *     x-roles: ['root','admin']
   *     responses:
   *       200:
   *         description: Respuesta en HTML
   *         content:
   *           text/html:
   *             schema:
   *               type: string
   */
  //@route('/admin/configuration')
  //@method(['get'])
  //@roles(['root','admin'])
  configuration: controlador.configuration,

  /**
   * @swagger
   * /html/{filepath}:
   *   get:
   *     tags:
   *       - Vistas
   *     summary: obtener vista de edición de archivos HTML
   *     description: obtener vista de edición de archivos HTML
   *     x-roles: ['root', 'admin','cms']
   *     responses:
   *       200:
   *         description: Respuesta en HTML
   *         content:
   *           text/html:
   *             schema:
   *               type: string
   */
  //@route('/html/:filepath')
  //@method(['get'])
  //@roles(['root', 'admin','cms'])
  renderHtml: controlador.renderHtml,
};
