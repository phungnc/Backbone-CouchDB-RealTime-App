 var couchapp = require('couchapp')
  , path = require('path')
  ;

ddoc = 
  { _id:'_design/app'
  , rewrites : 
    [ 
      {
        from:"", 
        to:"index.html"
      }
      ,{
        from:"/request", 
        to:"index.html"
      }
      ,{
        from:"/register", 
        to:"index.html"
      }
      ,{
        from:"/logout", 
        to:"index.html"
      }

      ,{
        from:"/request", 
        to:"index.html"
      }

      ,{
        from:"app/*", 
        to:"app/*"
      }

      ,{
        from:"vendor/*", 
        to:"vendor/*"
      }
      ,{
        from:"dist/*", 
        to:"dist/*"
      }
      ,{
        from: ":user_db", 
        to: "../../../:user_db"
      }

      ,{
        from: ":user_db/*", 
        to: "../../../:user_db/*"
      }

      ,{
        from:"/api/*", 
        to:'../../*'
      }

    ]
  }
  ;

ddoc.views = require('./views');

ddoc.validate_doc_update = function (newDoc, oldDoc, userCtx) {   
  if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -1) {
    throw "Only admin can delete documents on this database.";
  } 
}

ddoc.filters = require('./filters');
ddoc.updates = require('./updates');

couchapp.loadAttachments(ddoc, path.join(__dirname, '_attachments'));

module.exports = ddoc;