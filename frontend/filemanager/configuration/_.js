'use strict';

const configuration = function () {
  
};

configuration.prototype.start = async function (parent) {
	this.parent = parent;
};

app.modules.configuration = configuration;