'use strict';

const fs = require('fs');
const path = require('path');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const constants = require('./constants');

const directory = process.cwd() + '/backend/assets/';

const getDirectory = async function (src, dirbase) {
  const tmpDir = await fs.promises.readdir(src);
  const directory = [];
  for (let i = 0; i < tmpDir.length; i++) {
    const direct = path.join(src, tmpDir[i]);
    const stat = await fs.promises.stat(direct);
    const dir = {
      text: tmpDir[i],
      id: dirbase + tmpDir[i],
      type: stat.isDirectory() ? 'folder' : 'file',
    };
    if (stat.isDirectory()) {
      dir.children = await getDirectory(direct, dirbase + tmpDir[i] + '/');
    }
    directory.push(dir);
  }
  return directory;
};

module.exports = {
  fulldirectory: async function () {
    try {
      return await getDirectory(directory, '/');
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.fulldirectory + ' ' + constants.error.servicio
      );
    }
  },
};
