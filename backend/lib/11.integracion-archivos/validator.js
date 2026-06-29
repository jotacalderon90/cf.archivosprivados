'use strict';

const { z } = require('zod');

const validator = require('../validator');

module.exports = {
  get: z.object({
    id: validator.b64,
  }),
};
