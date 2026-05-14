'use strict';

const controlador = require('./lib/10.configuracion-especial-roles/controller');

module.exports = {
  /**
   * @swagger
   * /api/admin/roles/collection:
   *   get:
   *     tags:
   *       - Configuración especial
   *     summary: colección de roles
   *     description: colección de roles
   *     x-roles: ['admin']
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/admin/roles/collection')
  //@method(['get'])
  //@roles(['admin'])
  collection: controlador.collection,
};
