"use strict";

const logger = require('cl.jotacalderon.cf.framework/lib/log')(__filename);

const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  html: true,         // Permitir HTML en el markdown
  linkify: true,      // Auto-convertir URLs en links
  typographer: true   // Mejoras tipográficas
});

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
}