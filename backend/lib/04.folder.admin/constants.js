'use strict';

const constants = require('../constants');

const _constants = { ...constants };

_constants.error.rest.create = 'Error al crear carpeta';
_constants.error.rest.update = 'Error al actualizar carpeta';
_constants.error.rest.delete = 'Error al eliminar carpeta';

module.exports = _constants;
