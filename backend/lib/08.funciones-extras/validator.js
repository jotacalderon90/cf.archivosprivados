'use strict';

const { z } = require('zod');

module.exports = {
  
  convertitmdhtml: z.object({
    markdown: z
      .string({ required_error: 'El campo markdown es requerido' })
      .min(1, 'El markdown no puede estar vacío')
      .max(500000, 'El markdown excede el tamaño máximo permitido (500KB)')
  }),
  
  convertitcsvjson: z.object({
    csv: z
      .string({ required_error: 'El campo csv es requerido' })
      .min(1, 'El CSV no puede estar vacío')
      .max(20 * 1024 * 1024, 'El CSV excede el tamaño máximo permitido (20MB)')
      .refine(
        (val) => val.includes('\n') || val.includes(','),
        { message: 'El contenido no parece ser un CSV válido (debe contener comas o saltos de línea)' }
      )
  })
  
}