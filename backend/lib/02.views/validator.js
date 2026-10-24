'use strict';

const { z } = require('zod');

const validator = require('../validator');

module.exports = {
  renderHtml: z.object({
    filepath: validator.b64,
  }),
};
