![BACKBONE-COUCHDB-REALTIME-DEMO]

====================
## I. ENVIRONMENT

  1. CLIENT : BACKBONE.JS (http://backbonejs.org/), 
  backbone.layoutmanager (https://github.com/tbranyen/backbone.layoutmanager)
  backbone-couchdb (https://github.com/janmonschke/backbone-couchdb‎)
  2. DB: COUCHDB (http://couchdb.apache.org/)

## II. TOOL

  1. grunt-bbb (https://github.com/backbone-boilerplate/grunt-bbb)
  2. node.couchapp.js (https://github.com/mikeal/node.couchapp.js/tree/)

## III. DEPLOY COUCHDB

  1. CLOUDANT.COM (https://cloudant.com/)
  2. IRIS COUCH (http://www.iriscouch.com/)
  3. Localhost

## IV. GUIDE

 ## [Database]
 
  1. Download & Install CouchDB: http://couchdb.apache.org/
  2. Open CouchDB/Futon : http://localhost:5984/_utils/index.html
  4. Create Admin for CouchDB by click Fix it link at bottom-right-side 
  5. Create bbc_realtime database


 ## [CouchApp]

  1. Install node.couchapp.js (install global and local)

  npm install couchapp -g
  npm install couchapp

  2. Clone bbc_realtime to your farvorite Directory
  3. Change directory bbc_realtime to (cd bbc_realtime)
  4. couchapp push app.js http://<admin>:<password>@localhost:5984/bbc_realtime

 ## [Config]

  1. Open CouchDB Config : http://localhost:5984/_utils/config.html
  2. Add a new section: 
     section: vhosts  
     option : couch:5984  
     value  : bbc_realtime/_design/app/_rewrite

  3. Add to hosts file: 127.0.0.1   couch
You can follow this link http://readwrite.com/2011/03/08/pretty-urls-couchdb#awesm=~o9WWLWt5qA2WxE
to have pretty URL

 ## [Run]

  1. http://couch:5984/
  2. Login with admin/password to login Admin screen
  3. Open new user browser, goto http://couch:5984/, create new user, make a request.

  Have Fun!
