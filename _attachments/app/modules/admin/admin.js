// Admin module
define([
  // Application.
  "app",
  // Module Admin/Request
  "modules/admin/request",
],

// Map dependencies from above array.
function(app, Request, Match, Member) {

  // Create a new module.
  var Admin = app.module();
  //
  var collections = {
    // set up the requests
    requests: new Request.Collection(), 
  };

  Admin.Views.Layout = Backbone.Layout.extend({
    template: "admin/main",
    //
    el: $("#main"),
    //
  });

  var adminView = new Admin.Views.Layout({

    views: {
      // Requests list view
      ".requests" : new Request.Views.List (collections),
    }

  });
  _.extend(Admin, collections, {"adminView":adminView}); 
  // Return the module for AMD compliance.
  return Admin;

});
