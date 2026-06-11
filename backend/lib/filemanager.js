'use strict';

const directory = process.cwd() + '/backend/assets/domains/';

const decode = function (value) {
  return decodeURIComponent(Buffer.from(value, 'base64').toString('utf8'));
};

module.exports = {
  base: function (host) {
    return directory + host;
  },
  get: function (id, host) {
    return directory + host + '/' + decode(id);
  },
};
