'use strict';

// ─────────────────────────────────────────────
//  Constructor
// ─────────────────────────────────────────────
const filemanager = function () {
	this.service_read             = createService('GET',    ':path:id');
	this.service_folder_collection = createService('GET',   ':path:id/collection');
	this.service_file_collection   = createService('GET',   ':path:id/collection');
	this.service_delete            = createService('DELETE',':path:id');
	this.service_update            = createService('PUT',   ':path:id');
	this.service_file_create       = createService('POST',  ':path:id');
	this.service_folder_create     = createService('POST',  '/api/filemanager/folder');
	this.service_rename_file       = createService('PUT',   '/api/filemanager/file/:id/rename');
	this.service_rename_folder     = createService('PUT',   ':path:id');
	this.service_convertitmdhtml   = createService('POST',  '/api/convertitmdhtml');
	this.service_convertitcsvjson  = createService('POST',  '/api/convertitcsvjson');
  
	this.archive     = null;
	this.textFiles   = ['txt','html','css','js','json','csv','md','gitignore','bowerrc'];
	this.mediaFiles  = ['jpg','gif','png','ico','mp3','mp4','pdf'];

	// Estado de modales
	this.modal = {
		newName:        '',
		error:          '',
		relocateTarget: '',
		relocatePath:   '',
		notifyMsg:      '',
		notifyType:     'success'
	};
  
  this.uploadUrl = '/';
};

// ─────────────────────────────────────────────
//  Arranque
// ─────────────────────────────────────────────
filemanager.prototype.start = async function (parent) {
	this.parent = parent;
	this.createFolderNode(document.getElementById('ul_directory'), 'd0', {
		name:   '/',
		file:   '/api/filemanager/file/',
		folder: '/api/filemanager/folder/',
		path:   '/'
	});
  this.dropzone();
};

// ─────────────────────────────────────────────
//  Helpers de modal Bootstrap 5
// ─────────────────────────────────────────────
filemanager.prototype._openModal = function (id) {
	this.modal.error = '';
	const el = document.getElementById(id);
	if (!el) return;
	bootstrap.Modal.getOrCreateInstance(el).show();
};

filemanager.prototype._closeModal = function (id) {
	const el = document.getElementById(id);
	if (!el) return;
	bootstrap.Modal.getOrCreateInstance(el).hide();
};

filemanager.prototype._notify = function (msg, type) {
	this.modal.notifyMsg  = msg;
	this.modal.notifyType = type || 'success';
	this._openModal('mdNotify');
};

// ─────────────────────────────────────────────
//  Roles
// ─────────────────────────────────────────────
filemanager.prototype.hasRole = function (role) {
	return !!(roles && roles.indexOf(role) > -1);
};

filemanager.prototype.canAdmin = function () {
	return this.hasRole('root');
};

// ─────────────────────────────────────────────
//  Selección y cierre
// ─────────────────────────────────────────────
filemanager.prototype.close = function () {
	document.querySelectorAll('#ul_directory .selected').forEach(el => el.classList.remove('selected'));
	this.archive        = null;
	this.isFile         = false;
	this.isFolder       = false;
	this.isTextFile     = false;
	this.isMediaFile    = false;
	this.isMdFile       = false;
	this.isCsvFile      = false;
	this.name           = '';
	this.fullname       = '';
	this.fileContent    = '';
};

filemanager.prototype.clean = function () {
	document.querySelectorAll('#ul_directory .selected').forEach(el => el.classList.remove('selected'));
	this.archive = null;
};

filemanager.prototype.select = async function (li) {
	try {
		const label = li.querySelector('label');
		label.classList.add('selected');
		this.archive = li;

		const type      = label.getAttribute('data-type');
		this.isFile     = type === 'file';
		this.isFolder   = type === 'folder';
		this.name       = label.textContent.trim();
		this.fullname   = decodeURIComponent(label.getAttribute('data-api-path'));
		this.cleanURL   = this.fullname;

		// Directorio padre: para archivos es todo antes del último segmento,
		// para carpetas el path ya incluye la barra final, así que subimos un nivel.
		if (this.isFile) {
			const parts = this.fullname.split('/');
			parts.pop(); // quita el nombre del archivo
			this.parentPath = parts.join('/') + '/';
		} else {
			// fullname para carpeta termina en '/', ej: '/carpeta demo/'
			// el padre es todo hasta la penúltima barra
			const trimmed = this.fullname.replace(/\/$/, '');
			const parts   = trimmed.split('/');
			parts.pop();
			this.parentPath = parts.join('/') + '/';
		}
		// Reset de flags
		this.isTextFile  = false;
		this.isMediaFile = false;
		this.isMdFile    = false;
		this.isCsvFile   = false;
		this.fileContent = '';

		if (this.isFile) {
			this.type         = this.name.split('.').pop().toLowerCase();
			this.isTextFile   = this.textFiles.includes(this.type);
			this.isMediaFile  = this.mediaFiles.includes(this.type);
			this.isMdFile     = this.type === 'md';
			this.isCsvFile    = this.type === 'csv';
			this.fullnameDOWNLOAD = label.getAttribute('data-api-file') + btoa(this.fullname) + '/download';
			this.fullnameGET      = label.getAttribute('data-api-file') + btoa(this.fullname) + '/getfile';

			if (this.isTextFile) {
				this.parent.loader.active = true;
				const result = await this.service_read({
					id:   btoa(this.fullname),
					path: label.getAttribute('data-api-file')
				});
				this.fileContent = result.data;
				this.parent.loader.active = false;
			} else if (this.isMediaFile) {
				const src = this.fullnameGET;
				let child = null;

				if (['jpg','png','gif','ico'].includes(this.type)) {
					child = document.createElement('img');
					child.src = src;
					child.className = 'img-fluid mt-2';
				} else if (this.type === 'mp3') {
					child = document.createElement('audio');
					child.controls = true;
					child.src = src;
				} else if (this.type === 'mp4') {
					child = document.createElement('video');
					child.controls = true;
					child.src = src;
					child.className = 'w-100';
				} else if (this.type === 'pdf') {
					child = document.createElement('object');
					child.data = src;
					child.type = 'application/pdf';
					child.style.width  = '100%';
					child.style.height = '600px';
				}

				const dv = document.querySelector('.dv-visualcontent');
				dv.innerHTML = '';
				if (child) dv.appendChild(child);
			}
		} else {
			// Es carpeta: configurar el uploader
			const n = label.getAttribute('data-api-file') + btoa(encodeURIComponent(label.getAttribute('data-api-path'))) + '/uploader';
			document.getElementById('fileupload').setAttribute('action', n);
      this.uploadUrl = btoa(encodeURIComponent(label.getAttribute('data-api-path')));
		}
	} catch (e) {
		console.error(e);
		this._notify('Error al seleccionar: ' + e.message, 'error');
	}
};

// ─────────────────────────────────────────────
//  Eliminar
// ─────────────────────────────────────────────
filemanager.prototype.confirmDelete = function () {
	this._openModal('mdDelete');
};

filemanager.prototype.delete = async function () {
	this._closeModal('mdDelete');
	try {
		const label = this.archive.querySelector('label');
		let p, i;

		if (this.isFile) {
			p = label.getAttribute('data-api-file');
			i = btoa(this.fullname);
		} else if (this.isFolder) {
			p = label.getAttribute('data-api-folder');
			i = btoa(this.fullname);//.replace(/^\//, ''));
		}

		this.parent.loader.active = true;
		const result = await this.service_delete({ id: i, path: p });
		this.parent.loader.active = false;

		if (result && result.error) throw new Error(result.error);

		this.close();
		this._notify('Eliminado correctamente.', 'success');
		setTimeout(() => location.reload(), 1200);
	} catch (e) {
		this.parent.loader.active = false;
		console.error(e);
		this._notify('Error al eliminar: ' + e.message, 'error');
	}
};

// ─────────────────────────────────────────────
//  Guardar (actualizar contenido)
// ─────────────────────────────────────────────
filemanager.prototype.update = async function () {
	this._closeModal('mdUpdate');
	try {
		const label = this.archive.querySelector('label');
		const p     = label.getAttribute('data-api-file');
		const i     = btoa(this.fullname);

		this.parent.loader.active = true;
		const result = await this.service_update(
			{ id: i, path: p },
			JSON.stringify({ content: this.fileContent })
		);
		this.parent.loader.active = false;

		if (result && result.error) throw new Error(result.error);

		this._notify('Archivo guardado correctamente.', 'success');
	} catch (e) {
		this.parent.loader.active = false;
		console.error(e);
		this._notify('Error al guardar: ' + e.message, 'error');
	}
};

// ─────────────────────────────────────────────
//  Renombrar
// ─────────────────────────────────────────────
filemanager.prototype.openRename = function () {
	this.modal.newName = this.name;
	this._openModal('mdRename');
	setTimeout(() => {
		const input = document.querySelector('#mdRename input');
		if (input) { input.focus(); input.select(); }
	}, 300);
};

filemanager.prototype.rename = async function () {
	const newName = (this.modal.newName || '').trim();
	if (!newName) {
		this.modal.error = 'El nombre no puede estar vacío.';
		return;
	}
	if (/[/\\:*?"<>|]/.test(newName)) {
		this.modal.error = 'El nombre contiene caracteres no permitidos.';
		return;
	}
	if (this.isFile && !/\.[a-zA-Z0-9]+$/.test(newName)) {
		this.modal.error = 'El archivo debe tener una extensión válida.';
		return;
	}

	this._closeModal('mdRename');
	try {
		const label = this.archive.querySelector('label');
		const i     = btoa(this.fullname);
		let result;

		// El backend hace: fs.renameSync(base + decode(id), base + name)
		// Por lo tanto "name" debe ser la ruta completa desde la raíz de assets:
		// directorio padre actual + nuevo nombre ingresado por el usuario.
		const fullNewName = this.parentPath + newName;
		this.parent.loader.active = true;

		if (this.isFile) {
			const p = label.getAttribute('data-api-file');
			result = await this.service_rename_file(
				{ id: i, path: p },
				JSON.stringify({ name: fullNewName })
			);
		} else {
			const p = label.getAttribute('data-api-folder');
			result = await this.service_rename_folder(
				{ id: i, path: p },
				JSON.stringify({ id: i, name: fullNewName })
			);
		}

		this.parent.loader.active = false;
		if (result && result.error) throw new Error(result.error);

		this._notify('Renombrado correctamente.', 'success');
		setTimeout(() => location.reload(), 1200);
	} catch (e) {
		this.parent.loader.active = false;
		console.error(e);
		this._notify('Error al renombrar: ' + e.message, 'error');
	}
};

// ─────────────────────────────────────────────
//  Nuevo archivo de texto
// ─────────────────────────────────────────────
filemanager.prototype.openNewFile = function () {
	this.modal.newName = '';
	this._openModal('mdNewFile');
	setTimeout(() => {
		const input = document.querySelector('#mdNewFile input');
		if (input) input.focus();
	}, 300);
};

filemanager.prototype.createFile = async function () {
	const newName = (this.modal.newName || '').trim();
	if (!newName) {
		this.modal.error = 'El nombre no puede estar vacío.';
		return;
	}
	if (/[/\\:*?"<>|]/.test(newName)) {
		this.modal.error = 'El nombre contiene caracteres no permitidos.';
		return;
	}
	if (!/\.[a-zA-Z0-9]+$/.test(newName)) {
		this.modal.error = 'El archivo debe tener una extensión válida (ej: notas.txt).';
		return;
	}

	this._closeModal('mdNewFile');
	try {
		const label = this.archive.querySelector('label');
		const i     = btoa(encodeURIComponent(this.fullname));
		const p     = label.getAttribute('data-api-file');

		this.parent.loader.active = true;
		const result = await this.service_file_create(
			{ id: i, path: p },
			JSON.stringify({ id: i, name: newName, content: '' })
		);
		this.parent.loader.active = false;

		if (result && result.error) throw new Error(result.error);

		this._notify('Archivo "' + newName + '" creado.', 'success');
		setTimeout(() => location.reload(), 1200);
	} catch (e) {
		this.parent.loader.active = false;
		console.error(e);
		this._notify('Error al crear archivo: ' + e.message, 'error');
	}
};

// ─────────────────────────────────────────────
//  Nueva carpeta
// ─────────────────────────────────────────────
filemanager.prototype.openNewFolder = function () {
	this.modal.newName = '';
	this._openModal('mdNewFolder');
	setTimeout(() => {
		const input = document.querySelector('#mdNewFolder input');
		if (input) input.focus();
	}, 300);
};

filemanager.prototype.createFolder_ = async function () {
	const newName = (this.modal.newName || '').trim();
	if (!newName) {
		this.modal.error = 'El nombre no puede estar vacío.';
		return;
	}
	if (/[/\\:*?"<>|]/.test(newName)) {
		this.modal.error = 'El nombre contiene caracteres no permitidos.';
		return;
	}

	this._closeModal('mdNewFolder');
	try {
		const label = this.archive.querySelector('label');
		const i     = btoa(encodeURIComponent(this.fullname));
		const p     = label.getAttribute('data-api-folder');

		this.parent.loader.active = true;
		const result = await this.service_folder_create(
			{ id: i, path: p },
			JSON.stringify({ id: i, name: newName })
		);
		this.parent.loader.active = false;

		if (result && result.error) throw new Error(result.error);

		this._notify('Carpeta "' + newName + '" creada.', 'success');
		setTimeout(() => location.reload(), 1200);
	} catch (e) {
		this.parent.loader.active = false;
		console.error(e);
		this._notify('Error al crear carpeta: ' + e.message, 'error');
	}
};

// ─────────────────────────────────────────────
//  Reubicar archivo (mover a otra carpeta)
// ─────────────────────────────────────────────
filemanager.prototype.openRelocate = function () {
	this.modal.relocateTarget = '';
	this.modal.relocatePath   = '';
	this.modal.error          = '';

	// Construir árbol de carpetas para selección
	const ul = document.getElementById('ul_relocate');
	ul.innerHTML = '';
	this._buildRelocateTree(ul, '/', '/api/filemanager/folder/', 0);

	this._openModal('mdRelocate');
};

filemanager.prototype._buildRelocateTree = async function (ulEl, path, folderApi, depth) {
	try {
		const id   = btoa(encodeURIComponent(path));
		const coll = await this.service_folder_collection({ id, path: folderApi });
		if (!coll || !coll.data) return;

		for (let i = 0; i < coll.data.length; i++) {
			const folderName = coll.data[i];
			const folderPath = path + folderName + '/';

			const li    = document.createElement('li');
			li.style.paddingLeft = (depth * 16) + 'px';
			li.style.cursor      = 'pointer';
			li.style.padding     = '4px 8px 4px ' + ((depth * 16) + 8) + 'px';
			li.className         = 'relocate-item rounded';

			li.innerHTML = '<i class="fa fa-folder text-warning me-2"></i>' + folderName;

			li.addEventListener('click', (e) => {
				e.stopPropagation();
				document.querySelectorAll('#ul_relocate .relocate-item').forEach(el => el.classList.remove('bg-primary', 'text-white'));
				li.classList.add('bg-primary', 'text-white');
				this.modal.relocateTarget = folderPath;
				this.modal.relocatePath   = folderApi;
			});

			const subUl = document.createElement('ul');
			subUl.className = 'list-unstyled mb-0';
			li.appendChild(subUl);
			ulEl.appendChild(li);

			// Expandir sub-carpetas al hacer click en el icono de flecha
			const arrow = document.createElement('span');
			arrow.innerHTML = ' <i class="fa fa-chevron-right fa-xs ms-1" style="opacity:.5"></i>';
			arrow.style.float = 'right';
			li.insertBefore(arrow, li.lastChild);

			arrow.addEventListener('click', async (e) => {
				e.stopPropagation();
				if (subUl.children.length > 0) {
					subUl.innerHTML = '';
					arrow.innerHTML = ' <i class="fa fa-chevron-right fa-xs ms-1" style="opacity:.5"></i>';
				} else {
					await this._buildRelocateTree(subUl, folderPath, folderApi, depth + 1);
					arrow.innerHTML = ' <i class="fa fa-chevron-down fa-xs ms-1" style="opacity:.5"></i>';
				}
			});
		}
	} catch (e) {
		console.error('Error construyendo árbol de reubicación:', e);
	}
};

filemanager.prototype.relocate = async function () {
	if (!this.modal.relocateTarget) {
		this.modal.error = 'Selecciona una carpeta destino.';
		return;
	}

	this._closeModal('mdRelocate');
	try {
		// La reubicación usa rename del archivo: lo renombra con path destino + nombre actual
		const label    = this.archive.querySelector('label');
		const i        = btoa(this.fullname);
		const p        = label.getAttribute('data-api-file');
		const destName = this.modal.relocateTarget + this.name;

		this.parent.loader.active = true;
		const result = await this.service_rename_file(
			{ id: i, path: p },
			JSON.stringify({  id: i, name: destName })
		);
		this.parent.loader.active = false;

		if (result && result.error) throw new Error(result.error);

		this._notify('Archivo reubicado en "' + this.modal.relocateTarget + '".', 'success');
		setTimeout(() => location.reload(), 1200);
	} catch (e) {
		this.parent.loader.active = false;
		console.error(e);
		this._notify('Error al reubicar: ' + e.message, 'error');
	}
};

// ─────────────────────────────────────────────
//  Copiar URL limpia
// ─────────────────────────────────────────────
filemanager.prototype.copyCleanURL = async function () {
	try {
		await copyLarge(host + '/assets' + this.cleanURL);
		this._notify('URL copiada al portapapeles.', 'success');
	} catch (e) {
		this._notify('No se pudo copiar la URL.', 'error');
	}
};

// ─────────────────────────────────────────────
//  MD → HTML
// ─────────────────────────────────────────────
filemanager.prototype.mdToHtml = async function () {
	try {
		this.parent.loader.active = true;
		const respuesta = await this.service_convertitmdhtml({}, { markdown: this.fileContent });
		this.parent.loader.active = false;

		if (respuesta && respuesta.error) throw new Error(respuesta.error);

		await copyLarge(respuesta.data);
		this._notify('HTML generado y copiado al portapapeles.', 'success');
	} catch (e) {
		this.parent.loader.active = false;
		console.error(e);
		this._notify('Error al convertir MD: ' + e.message, 'error');
	}
};

// ─────────────────────────────────────────────
//  CSV → JSON
// ─────────────────────────────────────────────
filemanager.prototype.csvToJson = async function () {
	try {
		this.parent.loader.active = true;
		const respuesta = await this.service_convertitcsvjson({}, { csv: this.fileContent });
		this.parent.loader.active = false;

		if (respuesta && respuesta.error) throw new Error(respuesta.error);

		await copyLarge(JSON.stringify(respuesta.data, null, 2));
		this._notify('JSON copiado al portapapeles.', 'success');
	} catch (e) {
		this.parent.loader.active = false;
		console.error(e);
		this._notify('Error al convertir CSV: ' + e.message, 'error');
	}
};

// ─────────────────────────────────────────────
//  Árbol de directorios (sidebar)
// ─────────────────────────────────────────────
filemanager.prototype.createFolderNode = function (ulParent, id, directory) {
	const li    = document.createElement('li');
	const input = document.createElement('input');
	input.type  = 'checkbox';
	input.id    = id;

	input.onchange = async (event) => {
		this.clean();
		if (event.target.checked) {
			this.select(event.target.parentNode);

			const labelParent = event.target.parentNode.querySelector('label');
			const newid = btoa(encodeURIComponent(labelParent.getAttribute('data-api-path')));

			// Sub-carpetas
			let coll = await this.service_folder_collection({
				id:   newid,
				path: labelParent.getAttribute('data-api-folder')
			});

			for (let i = 0; i < coll.data.length; i++) {
				this.createFolderNode(
					event.target.parentNode.lastChild,
					event.target.getAttribute('id') + 'd' + i,
					{
						file:   directory.file,
						folder: directory.folder,
						path:   labelParent.getAttribute('data-api-path') + coll.data[i] + '/',
						name:   coll.data[i]
					}
				);
			}

			// Archivos dentro de la carpeta
			coll = await this.service_file_collection({
				id:   newid,
				path: labelParent.getAttribute('data-api-file')
			});

			for (let i = 0; i < coll.data.length; i++) {
				const label = document.createElement('label');
				label.setAttribute('data-api-file',   labelParent.getAttribute('data-api-file'));
				label.setAttribute('data-api-folder', labelParent.getAttribute('data-api-folder'));
				label.setAttribute('data-api-path',   labelParent.getAttribute('data-api-path') + coll.data[i]);
				label.setAttribute('data-type',       'file');
				label.textContent = coll.data[i];

				const fileLi = document.createElement('li');
				fileLi.appendChild(label);
				fileLi.onclick = (e) => {
					this.clean();
					this.select(e.target.parentNode);
				};
				event.target.parentNode.lastChild.appendChild(fileLi);
			}
		} else {
			event.target.parentNode.lastChild.innerHTML = '';
		}
	};

	li.appendChild(input);

	const label = document.createElement('label');
	label.setAttribute('for',             id);
	label.setAttribute('class',           'folder');
	label.setAttribute('data-api-file',   directory.file);
	label.setAttribute('data-api-folder', directory.folder);
	label.setAttribute('data-api-path',   directory.path);
	label.setAttribute('data-type',       'folder');
	label.textContent = directory.name;

	li.appendChild(label);

	const ul = document.createElement('ul');
	ul.setAttribute('class', 'inside');
	li.appendChild(ul);

	ulParent.appendChild(li);
};


filemanager.prototype.dropzone = function() {
  var dropzone = document.getElementById('dropzone');
  var fileInput = document.querySelector('#fileupload input[type="file"]');

  dropzone.addEventListener('dragover', function(e) {
      e.preventDefault();
      dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', function() {
      dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');

      // Inyecta los archivos dropeados en el input nativo
      var dt = new DataTransfer();
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
          dt.items.add(e.dataTransfer.files[i]);
      }
      fileInput.files = dt.files;
      
      this.uploadFile();
  });
}
//Uploader
filemanager.prototype.uploadFile = async function () {
  try {
    var form = document.getElementById('fileupload');
    var fileInput = form.querySelector('input[type="file"]');
    var files = fileInput.files;
    if (!files.length) return;

    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }
    
    console.log(formData);
    
    this.parent.loader.active = true;
    
    for (var i = 0; i < files.length; i++) {
      var formData = new FormData();
      formData.append('file', files[i]);

      const respuesta = await fetch('/api/filemanager/file/' + this.uploadUrl + '/uploader', {
        method: 'POST',
        body: formData
      });
      const result = await respuesta.json();
      if (result.error) throw new Error(result.error);
    }
    
    form.reset();
    
    this.parent.loader.active = false;    
    this.close();
		this._notify('Archivo subido correctamente.', 'success');
		setTimeout(() => location.reload(), 1200);

  }catch(error) {
    this.parent.loader.active = false;
    this._notify(error, 'error');
    console.log(error);
  }
}

// ─────────────────────────────────────────────
//  Registro en el framework
// ─────────────────────────────────────────────
app.modules.filemanager = filemanager;