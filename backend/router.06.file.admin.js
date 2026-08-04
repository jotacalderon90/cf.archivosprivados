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
  //@route('/api/filemanager/file/:id')
  //@method(['post'])
  //@roles(['root','admin'])
  create: controlador.create,

  /**
   * @swagger
   * /api/filemanager/file/:id:
   *   put:
   *     tags:
   *       - File Admin
   *     summary: actualizar archivo
   *     description: actualizar archivo
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
  //@route('/api/filemanager/file/:id')
  //@method(['put'])
  //@roles(['root','admin'])
  update: controlador.update,

  /**
   * @swagger
   * /api/filemanager/file/:id:
   *   delete:
   *     tags:
   *       - File Admin
   *     summary: eliminar archivo
   *     description: eliminar archivo
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
  //@route('/api/filemanager/file/:id')
  //@method(['delete'])
  //@roles(['root','admin'])
  delete: controlador.delete,

  /**
   * @swagger
   * /api/filemanager/file/:id/rename:
   *   put:
   *     tags:
   *       - File Admin
   *     summary: renombrar archivo
   *     description: renombrar archivo
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
  //@route('/api/filemanager/file/:id/rename')
  //@method(['put'])
  //@roles(['root','admin'])
  rename: controlador.rename,

  /**
   * @swagger
   * /api/filemanager/file/:id/uploader:
   *   post:
   *     tags:
   *       - File Admin
   *     summary: subir archivo
   *     description: subir archivo
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
  //@route('/api/filemanager/file/:id/uploader')
  //@method(['post'])
  //@roles(['root','admin'])
  upload: controlador.upload,

  /**
   * @swagger
   * /api/filemanager/file/{id}/extract:
   *   post:
   *     tags:
   *       - File Admin
   *     summary: descomprime archivo .zip
   *     description: descomprime archivo .zip
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
  //@route('/api/filemanager/file/:id/extract')
  //@method(['post'])
  //@roles(['root','admin'])
  extract: controlador.extract,
};
