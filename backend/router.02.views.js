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
};
