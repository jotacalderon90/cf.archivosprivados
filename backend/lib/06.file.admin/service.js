'use strict';

const fs = require('fs');
const path = require('path');

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);
const helper = require('cl.jotacalderon.cf.framework/lib/helper');

const constants = require('./constants');

const filemanager = require('../filemanager');

module.exports = {
  
  create: async function(input) {
    try {
      
      fs.writeFileSync(filemanager.get(input.id) + input.name, input.content || '');
			
      return true;
      
    }catch(error) {
      logger.error(error);
      throw new Error((error instanceof Error) ? error.message : constants.error.rest.create + ' ' + constants.error.servicio);
    }
  },
  
  update: async function(input) {
    try {
      
      fs.writeFileSync(filemanager.get(input.id), input.content);
      
      return true;
      
    }catch(error) {
      logger.error(error);
      throw new Error((error instanceof Error) ? error.message : constants.error.rest.update + ' ' + constants.error.servicio);
    }
  },
  
  delete: async function(input) {
    try {
      
      const deleted = fs.unlinkSync(filemanager.get(input.id));
      console.log(deleted);
      
      return 1;
      
    }catch(error) {
      logger.error(error);
      throw new Error((error instanceof Error) ? error.message : constants.error.rest.delete + ' ' + constants.error.servicio);
    }
  },
  
  rename: async function(input) {
    try {
      
      fs.renameSync(filemanager.get(input.id) ,filemanager.base() + '/' + input.name);
      
      return true;
      
    }catch(error) {
      logger.error(error);
      throw new Error((error instanceof Error) ? error.message : constants.error.rest.download + ' ' + constants.error.servicio);
    }
  },
  
  upload: async function(input) {
    try {
      
			const filename = filemanager.get(input.id) + input.file.name;
      
      await helper.upload_process(input.file, filename);
      
      return true;
      
      /*
      if(process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_NAME != ''){
        const uploadResult = await cloudinary((directory + input.file.name).replace('archivospublicos', process.env.HOST_ARCHIVOSPUBLICOS + '/assets'));
        if(uploadResult != null){
          await mongodb.insertOne("cloudinary",uploadResult);
        }
      }*/
      
    }catch(error) {
      logger.error(error);
      throw new Error((error instanceof Error) ? error.message : constants.error.rest.upload + ' ' + constants.error.servicio);
    }
  }
  
}