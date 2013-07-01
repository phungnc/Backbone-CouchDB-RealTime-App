// Request module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a Request module.
  var Request = app.module();

  // Request Model.
  Request.Model = Backbone.Model.extend({

    // default request model
    defaults: {
      user : "user",
      message : "message",
      status : ""
    }

  });

  // Request Collection.
  Request.Collection = Backbone.Collection.extend({
    model: Request.Model,
    //
    db :{
      view : "byRequestList",
      changes : true,
      // The filter avoids that private messages appear in the public stream.
      filter : Backbone.couch_connector.config.ddoc_name + "/byAdminCollection"
    },
    //
    url : "/bbc_realtime",
    // The messages should be ordered by date
    comparator : function(request){
      return request.get("date");
    }    
  });

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// VIEWS ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////  
  // Request One
  //
  //
  Request.Views.One = Backbone.View.extend({
    template: "admin/request",
    //
    tagName: "li",
    //
    events: {
      "click .reply" : "reply",
      "click .delete" : "deleteRequest"
    },
    //
    //
    serialize: function() {
      return{
        user: this.model.get("user"),
        message: this.model.get("message"),
        status: this.model.get("status")
      };
    },  
    // delete request
    // 
    // 
    deleteRequest: function(e) {
      e.stopPropagation();
      e.preventDefault();
      var self = this;
      //
      this.model.destroy({
        success: function() {
          self.remove();
        }        
      });
    },
    // input matching request
    // 
    // 
    reply: function(e) {
      e.stopPropagation();
      e.preventDefault();      
      this.model.save("status","replied");
    }

  });

  //Admin Requests List View.
  Request.Views.List = Backbone.View.extend({
    // 
    tagName: "ul",
    //
    initialize: function () {
      _.bindAll(this,"render");

      this.options.requests.bind("add", function(request) {
        this.insertView(new Request.Views.One({
          model: request,
          //prepend
          append: function(root, child) {
            $(root).prepend(child);
          }
        })).render();
      }, this);


      this.options.requests.bind("reset",function() {        
        this.render();
      },this);

      this.options.requests.bind("change",function() {
        this.render();
      },this);
    },
    //
    beforeRender: function() {
      this.options.requests.each(function(request) {
        if (request.get("status") === "waiting") {

          this.insertView( new Request.Views.One({
            model: request
          }));
        } 

      }, this);
    }
    
  }); 
  // Return the module for AMD compliance.
  return Request;

});
