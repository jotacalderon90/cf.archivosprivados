'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const service = require('../../backend/lib/03.folder/service');
const filemanager = require('../../backend/lib/filemanager');

// Mock filemanager
jest.mock('../../backend/lib/filemanager');

describe('folder service download', () => {
  let tempDir;

  beforeAll(async () => {
    // Crear directorio temporal dummy para comprimir
    tempDir = path.join(os.tmpdir(), `test-folder-${crypto.randomBytes(6).toString('hex')}`);
    await fs.promises.mkdir(tempDir, { recursive: true });
    await fs.promises.writeFile(path.join(tempDir, 'file1.txt'), 'hello');
    await fs.promises.writeFile(path.join(tempDir, 'file2.txt'), 'world');
  });

  afterAll(async () => {
    // Limpiar directorio temporal dummy
    await fs.promises.rm(tempDir, { recursive: true, force: true });
  });

  test('debe generar un archivo zip conteniendo los archivos de la carpeta', async () => {
    const mockId = Buffer.from('/test-folder').toString('base64');
    const mockHost = 'localhost';

    filemanager.get.mockReturnValue(tempDir);

    const result = await service.download({ id: mockId, host: mockHost });

    expect(result.folderName).toBe('test-folder');
    expect(fs.existsSync(result.tempZipPath)).toBe(true);

    // Limpiar archivo zip generado por la prueba
    if (fs.existsSync(result.tempZipPath)) {
      await fs.promises.unlink(result.tempZipPath);
    }
  });

  test('debe arrojar error si la carpeta no existe', async () => {
    const mockId = Buffer.from('/non-existent').toString('base64');
    const mockHost = 'localhost';

    filemanager.get.mockReturnValue(path.join(tempDir, 'does-not-exist'));

    await expect(service.download({ id: mockId, host: mockHost })).rejects.toThrow();
  });
});
