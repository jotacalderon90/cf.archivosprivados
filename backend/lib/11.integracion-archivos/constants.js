'use strict';

const constants = require('../constants');

const _constants = { ...constants };

_constants.error.rest.collection = 'Error al obtener colección de archivos';
_constants.error.rest.download = 'Error al transferir archivo';
_constants.error.rest.get = 'Error al leer archivo';
_constants.error.rest.bad_ip = 'Ip cliente inválida :|';
_constants.error.rest.bad_origin = 'Origin inválido :O';

module.exports = _constants;
