var filters = module.exports = exports = {};

// by status ?
filters.byStatus = function(doc, req) {

  if (req.userCtx.roles.indexOf('_admin') != -1 ) { 
    if(doc.status === "replied" || doc._deleted) {
        return true;       
    } else {
      return false;
    }
  } else {
    return false;
  }

};

// filter document changed by collection
filters.by_collection = function(doc, req){
  // is the document part of a collection?
  if(doc.collection && req.query && req.query.collection && doc.collection == req.query.collection) {
  	if (doc.user == req.userCtx.name) { 
  		return true;
  	}
  }
  // has the document been deleted?
  else if (req.query && req.query.collection && doc._deleted)
    return true;
  else
    return false;
}

// filter document changed by collection
filters.byAdminCollection = function(doc, req){
  // is the document part of a collection?
  if(doc.collection && req.query && req.query.collection && doc.collection == req.query.collection) {
    if ( req.userCtx.roles.indexOf('_admin') != -1 ) { 
      return true;
    }
  }
  // has the document been deleted?
  else if (req.query && req.query.collection && doc._deleted)
    return true;
  else
    return false;
}