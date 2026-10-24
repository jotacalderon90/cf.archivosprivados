'use strict';

const constants = require('../constants');

const _constants = { ...constants };

_constants.error.rest.total = 'Error al obtener total de carpetas';
_constants.error.rest.collection = 'Error al obtener colleccion de carpetas';
_constants.error.rest.download = 'Error al descargar carpeta';

module.exports = _constants;
