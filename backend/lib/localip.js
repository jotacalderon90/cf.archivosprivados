'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

module.exports = function (ip) {
  try {
    // Eliminar prefijo IPv6 mapped IPv4 (::ffff:)
    const cleanIP = ip.replace(/^::ffff:/, '');

    // Localhost
    if (cleanIP === '127.0.0.1' || cleanIP === '::1' || cleanIP === 'localhost') {
      return true;
    }

    const parts = cleanIP.split('.').map(Number);

    if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
      return false; // IPv6 u otro formato no reconocido
    }

    const [a, b] = parts;

    return (
      a === 10 || // 10.0.0.0/8
      (a === 172 && b >= 16 && b <= 31) || // 172.16.0.0/12
      (a === 192 && b === 168) || // 192.168.0.0/16
      (a === 169 && b === 254) // 169.254.0.0/16 (link-local)
    );
  } catch (error) {
    logger.error(error);
    return false;
  }
};
