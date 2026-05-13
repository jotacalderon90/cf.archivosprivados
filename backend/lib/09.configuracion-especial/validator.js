'use strict';

const { z } = require('zod');

module.exports = {
  create: z.object({
    path: z
      .string()
      .regex(
        /^[a-zA-Z0-9_\-\/]+$/,
        'El path solo puede contener letras, números, /, guiones y guiones bajos. No se permiten dos puntos ni caracteres especiales'
      ),

    roles: z.record(
      z.string(),
      z
        .number()
        .int()
        .refine((val) => /^[01]{3}$/.test(String(val).padStart(3, '0')), {
          message: 'Cada rol debe ser un número de 3 dígitos usando solo 0 y 1 (ej: 110, 100, 011)',
        })
    ),
  }),

  update: z.object({
    roles: z.record(
      z.string(),
      z
        .number()
        .int()
        .refine((val) => /^[01]{3}$/.test(String(val).padStart(3, '0')), {
          message: 'Cada rol debe ser un número de 3 dígitos usando solo 0 y 1 (ej: 110, 100, 011)',
        })
    ),
  }),
};
