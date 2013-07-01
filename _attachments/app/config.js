// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  //deps: ["../vendor/jam/require.config", "main"],
  deps: ["main"],

  paths: {
    jquery: "../vendor/js/libs/jquery.min",
    sha1: "../vendor/js/plugins/sha1",
    underscore: "../vendor/jam/lodash/lodash.min",
    backbone: "../vendor/jam/backbone/backbone.min",
    backbone_layoutmanager: "../vendor/jam/backbone.layoutmanager/backbone.layoutmanager",
    bootstrap: "../vendor/bootstrap/js/bootstrap.min",
    backbone_couchdb: "../vendor/js/plugins/backbone-couchdb",
    jquery_couch: "../vendor/js/plugins/jquery.couch",
    jquery_countdown: "../vendor/js/plugins/jquery.countdown",
    backbone_validation: "../vendor/js/plugins/backbone-validation-amd-min"
  },

  shim: {
    "backbone": {
      "deps": [ "underscore", "jquery" ],
      "exports": "Backbone"  //attaches "Backbone" to the window object
    },
    "backbone_layoutmanager": {
      "deps": ["jquery","backbone","underscore"],
      "exports": "Backbone.LayoutManager"
    }, 
    // jquery.couch.js depends on jQuery.
    "jquery_couch": ["jquery"],
    // jquery_countdown
    "jquery_countdown": ["jquery"],
    // jquery_slider
    "jquery_slider": ["jquery"],    
    // Backbone-couchDd depends on Backbone.
    "backbone_couchdb": ["backbone"], 
    // Twitter Bootstrap depends on jQuery.
    "bootstrap": ["jquery"],    
    // Backbone.Validation depends on backbone, underscore
    "backbone_validation": ["underscore", "backbone"]
  },
  waitSeconds: 30
});