'use strict';

const configuracion_especial = function () {
  const apibase = '/api/admin/configuracion-especial';
  
  this.service = {
    total: createService('get', apibase + '/total'),
    collection: createService('get', apibase + '/collection'),
    read: createService('get', apibase + '/:id'),
    create: createService('post', apibase),
    update: createService('put', apibase + '/:id'),
    delete: createService('delete', apibase + '/:id'),
  };
  
  this.collection = [];
  
  this.doc = {
    path: '',
    roles: []
  };
};

configuracion_especial.prototype.start = async function(parent) {
  this.parent = parent;
  //this.getCollection();
}

configuracion_especial.prototype.getCollection = async function(loader) {
  try {
    
    if (loader) this.parent.loader.active = true;
    
    const collection = await this.service.collection();
    
    if (loader) this.parent.loader.active = false;

    if(collection.error) {
      throw new Error(collection);
    }    
    
    this.collection = collection.data;
    
  } catch(error) {
    alert('Error al cargar configuración especial');
    console.error(error);
  }
}

configuracion_especial.prototype.select = function(pathSelected) {
  this.pathSelected = pathSelected;
}

configuracion_especial.prototype.formatRolesToClient = function(rolesArray, rolesGuardados) {
  return rolesArray.map(role => {
    const valor = rolesGuardados[role.nombre];

    if (valor === undefined) {
      return role;
    }

    const digits = String(valor).padStart(3, '0');

    return {
      ...role,
      canCreate: digits[0] === '1',
      canUpdate: digits[1] === '1',
      canDelete: digits[2] === '1',
    };
  });
}

configuracion_especial.prototype.formatRolesToServer = function(roles) {
  return roles.reduce((acc, role) => {
    const canCreate = role.canCreate ? 1 : 0;
    const canUpdate = role.canUpdate ? 1 : 0;
    const canDelete = role.canDelete ? 1 : 0;

    // Solo incluir el rol si al menos un permiso es true
    if (canCreate || canUpdate || canDelete) {
      acc[role.nombre] = parseInt(`${canCreate}${canUpdate}${canDelete}`);
    }

    return acc;
  }, {});
}

configuracion_especial.prototype.open = async function () {
  
  const row = this.collection.filter((row)=>{
    return row.path === this.pathSelected;
  });
  
  if(row.length > 0) {
    this.doc = {...row[0]};
    this.doc.roles = this.formatRolesToClient(this.parent._roles.getToSelect(), this.doc.roles);
  } else {
    this.doc = {
      path: this.pathSelected,
      roles: this.parent._roles.getToSelect()
    }
  }
  
  this.parent.modal.open('mdFolderConfig');
};

configuracion_especial.prototype.save = async function () {
  try {
    
    this.parent.modal.close('mdFolderConfig');
    
    const doc = {...this.doc};
    doc.roles = this.formatRolesToServer(doc.roles);
    
    this.parent.loader.active = true;
    
    const method = (doc._id)?'update':'create';
    const params = (doc._id)?{id: doc.id}:{};

    const saved = await this.service[method](params, {
      path: doc.path,
      roles: doc.roles
    })

    this.parent.loader.active = false;

    if(saved.error != undefined) {
      throw new Error(saved.error);
    }
    
    this.parent.modal.notify('Configuración especial guardada exitosamente');
    
    this.getCollection(true);
    
  }catch(error) {
    this.parent.loader.active = false;
    this.parent.modal.notify(error.message, 'error');
    console.log(error);
  }
}

configuracion_especial.prototype.has = function(roles) {
  if (!this.collection) return false;
  
  const row = this.collection.filter((row)=>{
    return row.path === this.pathSelected;
  });
  
  if(row.length > 0) {
    console.log(row, roles);
    return roles.some(tipo => {
      const valor = row[0].roles[tipo];
      if (valor === undefined) return false;
      const digits = String(valor).padStart(3, '0');
      console.log(tipo,digits);
      return digits[2] === '1';
    });
  }
  
  return false;
}

app.modules.configuracion_especial = configuracion_especial;