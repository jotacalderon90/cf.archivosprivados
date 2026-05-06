'use strict';

const controlador = require('./lib/01.default/controller');

module.exports = {
  /**
   * @swagger
   * /favicon.ico:
   *   get:
   *     tags:
   *       - Default
   *     summary: obtener favicon
   *     description: obtiene favicon
   */
  //@route('/favicon.ico')
  //@method(['get'])
  favicon: controlador.favicon,

  /**
   * @swagger
   * /robots.txt:
   *   get:
   *     tags:
   *       - Default
   *     summary: obtener robots
   *     description: obtiene robots.txt
   */
  //@route('/robots.txt')
  //@method(['get'])
  robots: controlador.robots,
};
