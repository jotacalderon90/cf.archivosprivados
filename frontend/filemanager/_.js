const filemanager = function() {
	this.service_read = createService('GET', ':path:id');
	this.service_folder_collection = createService("GET", ":path:id/collection");
	this.service_file_collection = createService("GET", ":path:id/collection");
	this.service_delete = createService("DELETE", ":path:id");
	this.service_update = createService("PUT", ":path:id");
	
  this.service_convertitmdhtml = createService("POST", "/api/convertitmdhtml");
  this.service_convertitcsvjson = createService("POST", "/api/convertitcsvjson");
  
  this.archive = null;
  this.textFiles = ["txt", "html", "css", "js", "json", "csv", "md", "gitignore", "bowerrc"];
  this.mediaFiles = ["jpg", "gif", "png", "ico", "mp3", "mp4", "pdf"];
  
}

filemanager.prototype.start = async function(parent) {
	
	this.parent = parent;
	
	await this.getUser();

	this.createFolder(document.getElementById("ul_directory"), "d0", {
		name: "/",
		file: "/api/filemanager/file/",
		folder: "/api/filemanager/folder/",
		path: "/"
	});
	
}

filemanager.prototype.getUser = async function() {
	try {
		this.user = await (createService('GET', '/api/account')());
		if(this.user.error){
			throw(this.user.error);
		}
		this.user = this.user.data;
	} catch (e) {
		console.log('Error getUser', e);
	}
}

filemanager.prototype.close = function() {
	document.querySelectorAll("#ul_directory .selected").forEach(el => el.classList.remove("selected"));
    this.archive = null;
};

filemanager.prototype.clean = function() {
	document.querySelectorAll("#ul_directory .selected").forEach(el => el.classList.remove("selected"));
    this.archive = null;
};

filemanager.prototype.delete = async function () {
	try {
		let label = this.archive.querySelector("label");
		if (confirm("Confirme eliminación del archivo")) {
			let p;
			let i;
			if (this.isFile) {
				p = label.getAttribute("data-api-file");
				i = btoa(this.fullname);
			} else if (this.isFolder) {
				p = label.getAttribute("data-api-folder");
				i = btoa(this.fullname.substr(1));
			}

			await this.service_delete({ id: i, path: p });
			alert("Archivo eliminado correctamente");

			let checkbox = this.archive.parentNode.querySelector("checkbox");
			if (checkbox) checkbox.click();

			location.reload();
		}
	} catch (e) {
		console.log(e);
		alert(e);
	}
}

filemanager.prototype.update = async function () {
	try {
		let label = this.archive.querySelector("label");
		if (confirm("Confirme actualización del archivo")) {
			let p;
			let i;
			if (this.isFile) {
				p = label.getAttribute("data-api-file");
				i = btoa(this.fullname);
			}

			await this.service_update(
				{ id: i, path: p },
				JSON.stringify({ content: this.fileContent })
			);

			alert("Archivo actualizado correctamente");

			let checkbox = this.archive.parentNode.querySelector("checkbox");
			if (checkbox) checkbox.click();

			location.reload();
		}
	} catch (e) {
		console.log(e);
		alert(e);
	}
}

filemanager.prototype.select = async function (li) {
	try {
		let label = li.querySelector("label");
		label.classList.add("selected");
		this.archive = li;

		const type = label.getAttribute("data-type");
		this.isFile = type === "file";
		this.isFolder = type === "folder";

		this.name = label.textContent;
		this.fullname = decodeURIComponent(label.getAttribute("data-api-path"));

		if (this.isFile) {
			this.type = this.name.split(".").pop();
			this.isTextFile = this.textFiles.includes(this.type);
			this.isMediaFile = this.mediaFiles.includes(this.type);
      this.isMdFile = (this.type==='md')?true:false;
      this.isCsvFile = (this.type==='csv')?true:false;
			this.fullnameDOWNLOAD = label.getAttribute("data-api-file") + btoa(this.fullname) + "/download";
			this.fullnameGET = label.getAttribute("data-api-file") + btoa(this.fullname) + "/getfile";

			if (this.isTextFile) {
				this.parent.loader.active = true;
				let result = await this.service_read({
					id: btoa(this.fullname),
					path: label.getAttribute("data-api-file")
				});
				this.fileContent = result.data;
				this.parent.loader.active = false;
			} else if (this.isMediaFile) {
				let child = null;
				const src = this.fullnameGET;

				if (["jpg", "png", "gif", "ico"].includes(this.type)) {
					child = document.createElement("img");
					child.src = src;
				} else if (this.type === "mp3") {
					child = document.createElement("audio");
					child.controls = true;
					child.src = src;
				} else if (this.type === "mp4") {
					child = document.createElement("video");
					child.controls = true;
					child.src = src;
				} else if (this.type === "pdf") {
					child = document.createElement("object");
					child.data = src;
					child.type = "application/pdf";
				}

				document.querySelector(".dv-visualcontent").innerHTML = "";
				document.querySelector(".dv-visualcontent").appendChild(child);
			}
		} else {
			const n = label.getAttribute("data-api-file") + btoa(label.getAttribute("data-api-path")) + "/uploader";
			document.getElementById("fileupload").setAttribute("action", n);
		}
	} catch (e) {
		console.log(e);
	}
}

filemanager.prototype.copyCleanURL = async function() {
  await copyLarge(host + '/assets' + this.cleanURL);
  alert('Url limpia copiada');
}

filemanager.prototype.mdToHtml = async function() {
  try {
    
    const respuesta = await this.service_convertitmdhtml({},{
      markdown: this.fileContent
    });
    
    console.log(respuesta);
    if(respuesta.error){
      throw new Error(respuesta.error);
    }
    
    await copyLarge(respuesta.data);
    alert('Html copiado al portapapeles :D e impreso');
    
  }catch(error) {
    alert(error);
    console.log(error);
  }
},

filemanager.prototype.csvToJson = async function() {
  try {
    
    const respuesta = await this.service_convertitcsvjson({},{
      csv: this.fileContent
    });
    
    console.log(respuesta);
    if(respuesta.error){
      throw new Error(respuesta.error);
    }
    
    await copyLarge(respuesta.data);
    alert('JSON copiado al portapapeles e impreso');
    
  }catch(error) {
    alert(error);
    console.log(error);
  }
}

filemanager.prototype.createFolder = function (ulParent, id, directory) {
	const li = document.createElement("li");
	const input = document.createElement("input");
	input.type = "checkbox";
	input.id = id;

	input.onchange = async (element) => {
		this.clean();
		if (element.target.checked) {
			this.select(element.target.parentNode);

			const labelParent = element.target.parentNode.querySelector("label");
			const newid = btoa(encodeURIComponent(labelParent.getAttribute("data-api-path")));

			let coll = await this.service_folder_collection({
				id: newid,
				path: labelParent.getAttribute("data-api-folder")
			});

			for (let i = 0; i < coll.data.length; i++) {
				this.createFolder(
					element.target.parentNode.lastChild,
					element.target.getAttribute("id") + "d" + i,
					{
						file: directory.file,
						folder: directory.folder,
						path: labelParent.getAttribute("data-api-path") + coll.data[i] + "/",
						name: coll.data[i]
					}
				);
			}

			coll = await this.service_file_collection({
				id: newid,
				path: labelParent.getAttribute("data-api-file")
			});

			for (let i = 0; i < coll.data.length; i++) {
				const label = document.createElement("label");
				label.setAttribute("data-api-file", labelParent.getAttribute("data-api-file"));
				label.setAttribute("data-api-folder", labelParent.getAttribute("data-api-folder"));
				label.setAttribute("data-api-path", labelParent.getAttribute("data-api-path") + coll.data[i]);
				label.setAttribute("data-type", "file");
				label.textContent = coll.data[i];

				const li = document.createElement("li");
				li.appendChild(label);
				li.onclick = (element) => {
					this.clean();
					this.select(element.target.parentNode);
				};
				element.target.parentNode.lastChild.appendChild(li);
			}
		} else {
			element.target.parentNode.lastChild.innerHTML = "";
		}
	};

	li.appendChild(input);

	const label = document.createElement("label");
	label.setAttribute("for", id);
	label.setAttribute("class", "folder");

	label.setAttribute("data-api-file", directory.file);
	label.setAttribute("data-api-folder", directory.folder);
	label.setAttribute("data-api-path", directory.path);
	label.setAttribute("data-type", "folder");
	label.textContent = directory.name;

	li.appendChild(label);

	const ul = document.createElement("ul");
	ul.setAttribute("class", "inside");
	li.appendChild(ul);

	ulParent.appendChild(li);
}

filemanager.prototype.hasRole = function(role) {
	return (this.user && this.user.roles && this.user.roles.indexOf(role) > -1) ? true : false;
}

filemanager.prototype.canAdmin = function() {
	return this.hasRole('root');
};

app.modules.filemanager = filemanager;