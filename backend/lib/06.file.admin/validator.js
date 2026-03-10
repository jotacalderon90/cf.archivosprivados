'use strict';

const { z } = require('zod');

const validator = require('../validator');

// Nombre de archivo: sin separadores de ruta para evitar path traversal
const fileName = z
  .string({ required_error: 'El nombre del archivo es requerido' })
  .min(1, 'El nombre no puede estar vacío')
  .max(255, 'El nombre excede el largo máximo permitido (255 caracteres)')
  .regex(/^[^/\\:*?"<>|]+$/, 'El nombre contiene caracteres no permitidos')
  .regex(/\.[a-zA-Z0-9]+$/, 'El archivo debe tener una extensión válida');

// Contenido de archivo: string opcional (puede ser vacío en create)
const fileContent = z
  .string()
  .max(10 * 1024 * 1024, 'El contenido excede el tamaño máximo permitido (10MB)')
  .optional()
  .default('');

// Contenido requerido (update siempre escribe)
const fileContentRequired = z
  .string({ required_error: 'El contenido del archivo es requerido' })
  .max(10 * 1024 * 1024, 'El contenido excede el tamaño máximo permitido (10MB)');

module.exports = {

  create: z.object({
    id:      validator.b64,
    name:    fileName,
    content: fileContent,
  }),

  update: z.object({
    id:      validator.b64,
    content: fileContentRequired,
  }),

  delete: z.object({
    id: validator.b64,
  }),

  rename: z.object({
    id:   validator.b64,
    name: z
      .string({ required_error: 'El nombre del archivo es requerido' })
      .min(1, 'El nombre no puede estar vacío')
      .regex(/\.[a-zA-Z0-9]+$/, 'El archivo debe tener una extensión válida'),
  }),

  upload: z.object({
    id: validator.b64,
    file: z.object({
        size: z
          .number()
          .max(50 * 1024 * 1024, 'El archivo supera el tamaño máximo permitido.')
      }).passthrough()
  }),

};