var views = module.exports = exports = {};

views.byCollection = {
  map: function (doc) {
    if (doc.collection && doc.user) {
      emit(doc.collection, doc);
    }
  }
};

views.byRequestList = {
  map: function (doc) {
    if (doc.collection && doc.user) {
      if( doc.status === "waiting" || doc.status === "replied") {
        emit(doc.collection, doc);        
      }
    }
  }
};