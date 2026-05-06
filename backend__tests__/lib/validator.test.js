'use strict';

const { b64 } = require('../../backend/lib/validator');

describe('validator.b64', () => {
  test('debe aceptar un string base64 válido', () => {
    const input = Buffer.from('hola mundo').toString('base64'); // aG9sYSBtdW5kbw==
    const result = b64.safeParse(input);

    expect(result.success).toBe(true);
  });

  test('debe aceptar base64 con espacios (trim)', () => {
    const input = `   ${Buffer.from('test').toString('base64')}   `;
    const result = b64.safeParse(input);

    expect(result.success).toBe(true);
  });

  test('debe rechazar string vacío', () => {
    const result = b64.safeParse('');

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe('id es requerido');
  });

  test('debe rechazar string que no es base64', () => {
    const result = b64.safeParse('no-es-base64!!!');

    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe('id debe ser un string en base64 válido');
  });

  test('debe rechazar null o undefined', () => {
    const resultNull = b64.safeParse(null);
    const resultUndefined = b64.safeParse(undefined);

    expect(resultNull.success).toBe(false);
    expect(resultUndefined.success).toBe(false);
  });
});
