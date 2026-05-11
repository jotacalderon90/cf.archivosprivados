const modal = function() {
  this.notifyMsg = '';
	this.notifyType = '';
}

modal.prototype.open = function (id) {
	const el = document.getElementById(id);
	if (!el) return;
	bootstrap.Modal.getOrCreateInstance(el).show();
};

modal.prototype.close = function (id) {
	const el = document.getElementById(id);
	if (!el) return;
	bootstrap.Modal.getOrCreateInstance(el).hide();
};

modal.prototype.notify = function (msg, type) {
	this.notifyMsg  = msg;
	this.notifyType = type || 'success';
	this.open('mdNotify');
};

app.modules.modal = modal;