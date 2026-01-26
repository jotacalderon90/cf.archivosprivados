"use strict";

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

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
	
	//@route('/api/convertitmdhtml')
	//@method(['post'])
	//@roles(['root','filemanager'])
	convertitmdhtml: async function(req,res){
		try{
			const htmlContent = md.render(req.body.markdown);
      res.json({ data: htmlContent });
		}catch(error){
			logger.error(error);
			response.APIError(req,res,error);
		}
	},
  
	//@route('/api/convertitcsvjson')
	//@method(['post'])
	//@roles(['root','filemanager'])
	convertitcsvjson: async function(req,res){
		try{
      
      const { csv } = req.body;
      
      if (!csv || typeof csv !== 'string') {
        return res.status(400).json({ error: 'CSV string es requerido' });
      }

      const jsonData = csvToJson(csv);
      
      return res.json({
        data: JSON.stringify(jsonData)
      });
      
		}catch(error){
			logger.error(error);
			response.APIError(req,res,error);
		}
	},
}