"use strict";

module.exports = {
	
	//@route('/')
	//@method(['get'])
	//@roles(['root','filemanager'])
	renderAdmin: function(req,res){
		res.render('filemanager/page/_',{user: req.user});
	}
	
}