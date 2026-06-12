'use strict';

const constants = require('../constants');

const _constants = { ...constants };

_constants.error.rest.index = 'Error al generar pagina de inicio';
_constants.error.rest.configuration = 'Error al generar pagina de configuración';

module.exports = _constants;
