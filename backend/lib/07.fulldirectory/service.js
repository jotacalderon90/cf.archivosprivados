'use strict';

const fs = require('fs');
const path = require('path');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const constants = require('./constants');

const directory = process.cwd() + '/frontend/assets/';

const getDirectory = function(src, dirbase){
  const tmpDir = fs.readdirSync(src);
	const directory = [];
	for(let i=0;i<tmpDir.length;i++){
    const direct = path.join(src, tmpDir[i]);
		const dir = {text: tmpDir[i], id: dirbase + tmpDir[i], type: (fs.statSync(direct).isDirectory())?'folder':'file'}
		if(fs.statSync(direct).isDirectory()){
      dir.children = getDirectory(direct, dirbase + tmpDir[i] + "/");
    }
		directory.push(dir);
  }
	return directory;
};
      
module.exports = {
  
  fulldirectory: async function() {
    try{
			
      return getDirectory(directory, '/');
      
		}catch(error){
			logger.error(error);
      throw new Error((error instanceof Error) ? error.message : constants.error.rest.fulldirectory + ' ' + constants.error.servicio);
		}
  }
  
}