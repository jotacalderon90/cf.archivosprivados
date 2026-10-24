'use strict';

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const constants = require('./constants');

const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  html: true,         // Permitir HTML en el markdown
  linkify: true,      // Auto-convertir URLs en links
  typographer: true   // Mejoras tipográficas
});

const csvToJson = function csvToJson(csvString) {
  // Dividir por líneas y filtrar líneas vacías
  const lines = csvString.trim().split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    return [];
  }
  
  // Primera línea son los headers
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Convertir el resto de líneas a objetos JSON
  const result = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.trim());
    const obj = {};
    
    headers.forEach((header, index) => {
      // Asignar valor o cadena vacía si no existe
      obj[header] = values[index] || '';
    });
    
    result.push(obj);
  }
  
  return result;
};

module.exports = {
  
  convertitmdhtml: async function(input) {
    try{
			
      const htmlContent = md.render(input.markdown);
      
      return htmlContent;
      
		}catch(error){
			logger.error(error);
      throw new Error((error instanceof Error) ? error.message : constants.error.rest.convertitmdhtml + ' ' + constants.error.servicio);
		}
  },
  
  convertitcsvjson: async function(input) {
    try {
      
      const jsonData = csvToJson(input.csv);
      
      return jsonData;
      
    }catch(error) {
      logger.error(error);
      throw new Error((error instanceof Error) ? error.message : constants.error.rest.convertitcsvjson + ' ' + constants.error.servicio);
    }
  }
}