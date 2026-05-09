'use strict';

const controlador = require('./lib/06.file.admin/controller');

module.exports = {
  /**
   * @swagger
   * /api/filemanager/file/:id:
   *   post:
   *     tags:
   *       - File Admin
   *     summary: crear archivo
   *     description: crear archivo
   *     x-roles: ['admin']
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
  //@route('/api/filemanager/file/:id')
  //@method(['post'])
  //@roles(['admin'])
  create: controlador.create,

  /**
   * @swagger
   * /api/filemanager/file/:id:
   *   put:
   *     tags:
   *       - File Admin
   *     summary: actualizar archivo
   *     description: actualizar archivo
   *     x-roles: ['admin']
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
  //@route('/api/filemanager/file/:id')
  //@method(['put'])
  //@roles(['admin'])
  update: controlador.update,

  /**
   * @swagger
   * /api/filemanager/file/:id:
   *   delete:
   *     tags:
   *       - File Admin
   *     summary: eliminar archivo
   *     description: eliminar archivo
   *     x-roles: ['admin']
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
  //@route('/api/filemanager/file/:id')
  //@method(['delete'])
  //@roles(['admin'])
  delete: controlador.delete,

  /**
   * @swagger
   * /api/filemanager/file/:id/rename:
   *   put:
   *     tags:
   *       - File Admin
   *     summary: renombrar archivo
   *     description: renombrar archivo
   *     x-roles: ['admin']
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
  //@route('/api/filemanager/file/:id/rename')
  //@method(['put'])
  //@roles(['admin'])
  rename: controlador.rename,

  /**
   * @swagger
   * /api/filemanager/file/:id/uploader:
   *   post:
   *     tags:
   *       - File Admin
   *     summary: subir archivo
   *     description: subir archivo
   *     x-roles: ['admin']
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
  //@route('/api/filemanager/file/:id/uploader')
  //@method(['post'])
  //@roles(['admin'])
  upload: controlador.upload,
};
