
const _roles = function () {
  const apibase = '/api/admin/roles';
  this.services = {
    collection: createService('get', apibase + '/collection')
  };
  this.collection = [];
};

_roles.prototype.start = async function(parent) {
  this.parent = parent;
  try {
    
    if(roles.indexOf('admin') == -1) {
      return;
    }
    
    const collection = await this.services.collection();
    
    if(collection.error) {
      throw new Error(collection);
    }
    
    this.collection = collection.data.filter( row => row.nombre != 'admin');
    
  } catch(error) {
    alert('Error al iniciar roles');
    console.error(error);
  }
}

_roles.prototype.getToSelect = function() {
  return this.collection.map((row)=>{
    row.canCreate = false;
    row.canUpdate = false;
    row.canDelete = false;
    return row;
  });
}

app.modules._roles = _roles;