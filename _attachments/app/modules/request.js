// Request module
define([
  // Application.
  "app",
  // Plugins   
  "jquery_countdown"
],

// Map dependencies from above array.
function(app) {
  
/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// Request Module ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
  var Request = app.module();

  // Request Model.
  Request.Model = Backbone.Model.extend({
    validation: {
      message: {
        required: true,
        msg: 'Please enter your request'
      }
    },
    idAttribute: "_id",
    //
    url: function() {
      var url = "/bbc_realtime";
      if (typeof this.id !== "undefined"){
        url += "/" + this.id;
      }
      return url;
    }

  });

  // Request Collection.
  Request.Collection = Backbone.Collection.extend({
    //
    model: Request.Model,
    //
    db : {
      view : "none__",
      changes : true,
      // The filter avoids that private messages appear in the public stream.
      filter : Backbone.couch_connector.config.ddoc_name + "/by_collection"
    },    
    
    url : "/bbc_realtime"
  });

  // Request Requests View.
  //
  //
  Request.Views.Request = Backbone.View.extend({
    template: "request/request",
    el: $("#main")
  });
  // Create Request View.
  //
  //
  Request.Views.CreateRequest = Backbone.LayoutView.extend({
    template: "request/request",
    initialize: function(){
      Backbone.Validation.bind(this,{
        valid: function(view, attr) {
          $input = view.$('input[name="'+ attr +'"]');
          $input.next('.error').remove();
        },
        invalid: function(view, attr, error) {
          $input = view.$('input[name="'+ attr +'"]');

          if ($input.next('.error').length > 0){
            $input.next('.error').text(error);
          } else{
            $input.parent().append('<div class="error">'+ error +'</div>');
          }
        }
      });
    },
    
    events:{
      "click .request" : "request"
    },

    serialize: function() {
      return this.model.attributes;
    },

    request: function(e) {
      e.stopPropagation();
      e.preventDefault();

      var that = this;

      var req = this.$('form').serializeObject();
      //
      req = _.extend(req, {
        status: "waiting",
        user: app.auth.userName,
        date: new Date().getTime()
      });
      //
      this.model.save(req,{
        success: function(resp) {
          var searchingView = new Request.Views.Waiting({model: that.model});
          searchingView.render();
        },
        error: function() {
          console.log("Create Request error!");
        }
      });

    }
  });
  // Request Waiting View.
  //
  //
  Request.Views.Waiting = Backbone.LayoutView.extend({
    template: "request/waiting",
    el: $("#main"),
    events: {
      "click .re-request" : "reRequest"
    },
    afterRender: function(){
      this.setup();
      var response = new Request.Views.Response({collection: app.router.requests});
    },
    //
    startTimer: function(){
      var that = this;
      var times = 60;
      this.$('.timer').countdown({
        image: 'http://jquery-countdown.googlecode.com/svn/trunk/img/digits.png',
        stepTime: 60,
        startTime: times + ':00',
        digitImages: 6,
        digitWidth: 53,
        digitHeight: 77,
        timerEnd: function(){},
        format: 'mm:ss'
      });
    },
    //
    setup: function(){
      this.startTimer();
    },
    reRequest: function() {
      //this.remove();
      this.unbind();
      app.router.navigate("/", {trigger: true});
    }
    //
  });

  // Request response Found View.
  //
  //
  Request.Views.Response = Backbone.LayoutView.extend({
    template: "request/response",
    el: $("#main"),
    // data for login view, for ex. error message
    initialize: function() {

      this.collection.on("add", function(data){
        console.log("Request.Views.Response add");
        if(data.attributes.status === "replied"){
          this.render();         
        }
      },this);

      this.collection.on("change", function(data){
        console.log("Request.Views.Response change");
        if(data.attributes.status === "replied"){
          this.render();         
        }
      },this);

    }
    //
  });

  // Return the module for AMD compliance.
  return Request;

});
