'use strict';

const constants = require('../constants');

const _constants = { ...constants };

_constants.error.rest.convertitmdhtml = 'Error al convertir md a html';
_constants.error.rest.convertitcsvjson = 'Error al obtener csv a json';

module.exports = _constants;
