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
   */
  //@route('/api/convertitmdhtml')
  //@method(['post'])
  //@roles(['root','filemanager'])
  convertitmdhtml: controlador.convertitmdhtml,

  /**
   * @swagger
   * /api/convertitcsvjson:
   *   post:
   *     tags:
   *       - Extras
   *     summary: convertur csv a json
   *     description: convertur csv a json
   */
  //@route('/api/convertitcsvjson')
  //@method(['post'])
  //@roles(['root','filemanager'])
  convertitcsvjson: controlador.convertitcsvjson,
};
