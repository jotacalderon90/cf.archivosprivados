'use strict';

const controlador = require('./lib/08.funciones-extras/controller');

module.exports = {
  /**
   * @swagger
   * /api/convertitmdhtml:
   *   post:
   *     tags:
   *       - Extras
   *     summary: convertir md a html
   *     description: convertir md a html
   *     x-roles: ['root','admin']
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/convertitmdhtml')
  //@method(['post'])
  //@roles(['root','admin'])
  convertitmdhtml: controlador.convertitmdhtml,

  /**
   * @swagger
   * /api/convertitcsvjson:
   *   post:
   *     tags:
   *       - Extras
   *     summary: convertur csv a json
   *     description: convertur csv a json
   *     x-roles: ['root','admin']
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/convertitcsvjson')
  //@method(['post'])
  //@roles(['root','admin'])
  convertitcsvjson: controlador.convertitcsvjson,
};
