'use strict';

const controlador = require('./lib/07.fulldirectory/controller');

module.exports = {
  /**
   * @swagger
   * /api/filemanager/folder/full:
   *   get:
   *     tags:
   *       - Folder Full
   *     summary: obtener directorio completo como json
   *     description: obtener directorio completo como json
   *     x-roles: ['root','admin']
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/filemanager/folder/full')
  //@method(['get'])
  //@roles(['root','admin'])
  fulldirectory: controlador.fulldirectory,
};
