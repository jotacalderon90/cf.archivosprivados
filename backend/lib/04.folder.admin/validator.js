'use strict';

const { z } = require('zod');

const validator = require('../validator');

// Nombre de carpeta: sin separadores de ruta para evitar path traversal
const folderName = z
  .string({ required_error: 'El nombre de la carpeta es requerido' })
  .min(1, 'El nombre no puede estar vacío');

module.exports = {

  // POST /api/filemanager/folder/:id
  // params: id (base64 del path padre)
  // body:   name (nombre de la nueva carpeta)
  create: z.object({
    id:   validator.b64,
    name: folderName,
  }),

  // PUT /api/filemanager/folder/:id
  // params: id (base64 del path actual)
  // body:   name (nuevo nombre)
  update: z.object({
    id:   validator.b64,
    name: folderName,
  }),

  // DELETE /api/filemanager/folder/:id
  // params: id (base64 del path a eliminar)
  delete: z.object({
    id: validator.b64,
  }),

};