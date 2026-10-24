'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const filemanager = require('../filemanager');

const constants = require('./constants');

module.exports = {
  total: async function (input) {
    try {
      const dir = filemanager.get(input.id, input.host);

      const entries = await fs.promises.readdir(dir, { withFileTypes: true });

      return entries.filter((dirent) => !dirent.isFile()).length;
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.total + ' ' + constants.error.servicio
      );
    }
  },

  collection: async function (input) {
    try {
      const dir = filemanager.get(input.id, input.host);

      const respuesta = (await fs.promises.readdir(dir, { withFileTypes: true }))
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      return respuesta;
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.collection + ' ' + constants.error.servicio
      );
    }
  },

  download: async function (input) {
    try {
      const dir = filemanager.get(input.id, input.host);

      if (!fs.existsSync(dir)) {
        throw new Error('La carpeta no existe');
      }

      const stats = await fs.promises.stat(dir);
      if (!stats.isDirectory()) {
        throw new Error('La ruta especificada no es una carpeta');
      }

      const decodedPath = decodeURIComponent(Buffer.from(input.id, 'base64').toString('utf8'));
      const folderName = path.basename(decodedPath.replace(/\/$/, '')) || 'folder';

      const tempZipPath = path.join(
        os.tmpdir(),
        `folder-${crypto.randomBytes(6).toString('hex')}.zip`
      );

      const { ZipArchive } = await import('archiver');

      await new Promise((resolve, reject) => {
        const output = fs.createWriteStream(tempZipPath);
        const archive = new ZipArchive({
          zlib: { level: 9 },
        });

        output.on('close', resolve);
        archive.on('error', (err) => reject(err));

        archive.pipe(output);
        archive.directory(dir, false);
        archive.finalize();
      });

      return { tempZipPath, folderName };
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : constants.error.rest.download + ' ' + constants.error.servicio
      );
    }
  },
};
