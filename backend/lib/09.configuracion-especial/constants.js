'use strict';

const constants = require('../constants');

const _constants = { ...constants };

_constants.error.rest.total = 'Error al obtener total de configuracion especial';
_constants.error.rest.collection = 'Error al obtener lista de configuracion especial';
_constants.error.rest.read = 'Error al obtener configuracion especial';
_constants.error.rest.create = 'Error al crear configuracion especial';
_constants.error.rest.update = 'Error al actualizar configuracion especial';
_constants.error.rest.delete = 'Error al eliminar configuracion especial';

module.exports = _constants;
