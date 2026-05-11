'use strict';

const configuracion_especial = function () {
  const apibase = '/api/admin/configuracion-especial';
  this.services = {
    total: createService('get', apibase + '/total'),
    collection: createService('get', apibase + '/collection'),
    read: createService('get', apibase + '/:id'),
    create: createService('post', apibase),
    update: createService('put', apibase + '/:id'),
    delete: createService('delete', apibase + '/:id'),
  };
};

configuracion_especial.prototype.start = async function(parent) {
  this.parent = parent;
  try {
    
    const collection = await this.services.collection();
    
    if(collection.error) {
      throw new Error(collection);
    }
    
    this.collection = collection.data;
    
  } catch(error) {
    alert('Error al iniciar configuración especial');
    console.error(error);
  }
}

configuracion_especial.prototype.findByPath = function(path) {
  const row = this.collection.filter((row)=>{
    return row.path === path;
  });
  if(row.length > 0) {
    return row[0];
  }
  return null;
}

app.modules.configuracion_especial = configuracion_especial;