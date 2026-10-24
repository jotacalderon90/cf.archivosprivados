'use strict';

const { z } = require('zod');

const validator = require('../validator');

module.exports = {
  collection: z.object({
    id: validator.b64Path,
  }),
  download: z.object({
    id: validator.b64Path,
  }),
  get: z.object({
    id: validator.b64Path,
  }),
  put: z.object({
    id: validator.b64Path,
    content: z.string()
  }),
  upload: z.object({
    id: validator.b64Path,
    content: validator.b64
  }),
};
