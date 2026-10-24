'use strict';

const controlador = require('./lib/09.configuracion-especial/controller');

module.exports = {
  /**
   * @swagger
   * /api/admin/configuracion-especial/total:
   *   get:
   *     tags:
   *       - Configuración especial
   *     summary: total de configuración especial
   *     description: total de configuración especial
   *     x-roles: ['root','admin']
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/admin/configuracion-especial/total')
  //@method(['get'])
  //@roles(['root','admin'])
  total: controlador.total,

  /**
   * @swagger
   * /api/admin/configuracion-especial/collection:
   *   get:
   *     tags:
   *       - Configuración especial
   *     summary: colección de configuración especial
   *     description: colección de configuración especial
   *     x-roles: ['root','admin', 'archivosprivados']
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/admin/configuracion-especial/collection')
  //@method(['get'])
  //@roles(['root','admin', 'archivosprivados'])
  collection: controlador.collection,

  /**
   * @swagger
   * /api/admin/configuracion-especial/:id:
   *   get:
   *     tags:
   *       - Configuración especial
   *     summary: obtener una configuración especial
   *     description: obtener una configuración especial
   *     x-roles: ['root','admin']
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  //@route('/api/admin/configuracion-especial/:id')
  //@method(['get'])
  //@roles(['root','admin'])
  read: controlador.read,

  /**
   * @swagger
   * /api/admin/configuracion-especial:
   *   post:
   *     tags:
   *       - Configuración especial
   *     summary: crear configuracion especial
   *     description: crear configuracion especial
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
  //@route('/api/admin/configuracion-especial')
  //@method(['post'])
  //@roles(['root','admin'])
  create: controlador.create,

  /**
   * @swagger
   * /api/admin/configuracion-especial/:id:
   *   put:
   *     tags:
   *       - Configuración especial
   *     summary: actualizar configuracion especial
   *     description: actualizar configuracion especial
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
  //@route('/api/admin/configuracion-especial/:id')
  //@method(['put'])
  //@roles(['root','admin'])
  update: controlador.update,

  /**
   * @swagger
   * /api/admin/configuracion-especial/:id:
   *   delete:
   *     tags:
   *       - Configuración especial
   *     summary: eliminar configuracion especial
   *     description: eliminar configuracion especial
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
  //@route('/api/admin/configuracion-especial/:id')
  //@method(['delete'])
  //@roles(['root','admin'])
  delete: controlador.delete,
};
