'use strict';

const { z } = require('zod');

const decodeId = (val) => {
  const urlEncoded = Buffer.from(val, 'base64').toString('utf8');
  return decodeURIComponent(urlEncoded);
};

const isValidBase64 = (val) => {
  try {
    return Buffer.from(val, 'base64').toString('base64') === val;
  } catch {
    return false;
  }
};

const isValidPath = (val) => {
  try {
    const decoded = decodeId(val);
    if (!decoded.startsWith('/')) return false;
    if (decoded.includes('..')) return false;
    const segments = decoded.replace(/\/$/, '').split('/').filter(Boolean);
    if (segments.length < 2) return false;
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  b64: z
    .string()
    .trim()
    .min(1, 'id es requerido')
    .refine(isValidBase64, { message: 'id debe ser un string en base64 válido' }),

  b64Path: z
    .string()
    .trim()
    .min(1, 'id es requerido')
    .refine(isValidBase64, { message: 'id debe ser un string en base64 válido' })
    .refine(isValidPath, {
      message:
        'id debe representar un path válido con al menos 2 niveles (ej: /carpeta/sub o /carpeta/archivo.txt)',
    }),
};
