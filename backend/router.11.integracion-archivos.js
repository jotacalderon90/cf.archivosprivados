'use strict';

const controlador = require('./lib/11.integracion-archivos/controller');

module.exports = {
  /**
   * @swagger
   * /api/integration/get/{id}:
   *   get:
   *     tags:
   *       - Configuración especial
   *     summary: Servicio para leer archivo privado desde otro sistema
   *     description: Servicio para leer archivo privado desde otro sistema
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
