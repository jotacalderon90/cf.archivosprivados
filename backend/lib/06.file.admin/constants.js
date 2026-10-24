'use strict';

const constants = require('../constants');

const _constants = { ...constants };

_constants.error.rest.create = 'Error al crear archivo';
_constants.error.rest.update = 'Error al actualizar archivo';
_constants.error.rest.delete = 'Error al eliminar archivo';
_constants.error.rest.rename = 'Error al renombrar archivo';
_constants.error.rest.upload = 'Error al subir archivo';
_constants.error.rest.extract = 'Error al extraer archivo zip';
_constants.error.rest.extract_invalidZip = 'El archivo debe ser .zip';

module.exports = _constants;
