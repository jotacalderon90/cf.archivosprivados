'use strict';

const controlador = require('./lib/04.folder.admin/controller');

module.exports = {
  /**
   * @swagger
   * /api/filemanager/folder:
   *   post:
   *     tags:
   *       - Folder Admin
   *     summary: crear carpeta
   *     description: crear carpeta
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
  //@route('/api/filemanager/folder')
  //@method(['post'])
  //@roles(['root','admin'])
  create: controlador.create,

  /**
   * @swagger
   * /api/filemanager/folder/:id:
   *   put:
   *     tags:
   *       - Folder Admin
   *     summary: actualizar carpeta
   *     description: actualizar carpeta
   *     x-roles: ['root','admin']
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
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
  //@route('/api/filemanager/folder/:id')
  //@method(['put'])
  //@roles(['root','admin'])
  update: controlador.update,

  /**
   * @swagger
   * /api/filemanager/folder/:id:
   *   delete:
   *     tags:
   *       - Folder Admin
   *     summary: eliminar carpeta
   *     description: eliminar carpeta
   *     x-roles: ['root','admin']
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/filemanager/folder/:id')
  //@method(['delete'])
  //@roles(['root','admin'])
  delete: controlador.delete,
};
