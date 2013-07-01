define([
  // Application.
  "app",
  // Module user
  "modules/user",
  // Module request
  "modules/request",
  // Plugins
  "jquery_couch"  
],

function(app, User, Request) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "login": "login",
      "logout": "logout",
      "register": "register",
      "request": "createRequest",
      '*path': 'notFound'
    },
    initialize: function() {
      console.log("Route initialize");
      this.user = new User.Model();
      this.request = new Request.Model();
      this.firstPage = true;
    },
    notFound: function(){
      that.navigate("/", {trigger: true});
    },
    // index
    index: function() {
      var that = this;
      // get session info from _session and instruct app what to do.
      $.couch.session({
        success: function(resp) {
          var userCtx = resp.userCtx;
          if(userCtx.name) {
            app.auth.authDb = encodeURIComponent(resp.info.authentication_db);
            app.auth.userName = encodeURIComponent(resp.userCtx.name);
            app.auth.role = userCtx.roles[0];

            var url = app.auth.authDb + '/org.couchdb.user:' + app.auth.userName;
            $.get(url, function(res){
              res = jQuery.parseJSON(res);
              that.user.set(res);
              that.request.set('group', that.user.get('group'));
            });
            
            if (app.auth.role === "_admin") {
              that.admin();
            } else {
              if( app.auth.userName !== "") {
                that.navigate("/request", {trigger: true});
              }         
            }

          } else if (userCtx.roles.indexOf("_admin") != -1) {
            // warning admin party
            alert("<strong>Admin party, everyone is admin!</strong>");
          } else {
            var main = new Backbone.LayoutView({
              template: "main",
              //el: $("#main"),
              views: {
                '.login-form': new User.Views.Login()
              }
            });    
            that.changePage(main);
          }
        },
        error: function(res){
          console.log(res);
        }
      });
    },
    logout: function(){
      var that = this;
      $.couch.logout({
        success: function(){
          that.navigate("/", {trigger: true});
        },
        error: function(){

        }
      });
    },
    register: function(){
        var regView = new User.Views.Register({model: this.user});
        this.changePage(regView);  
    },
    // build request
    createRequest: function() {
      this.requests = new Request.Collection();
      var that = this;
      if(!app.auth.userName){
        that.navigate("/", {trigger: true});
        return false;
      }
      var createRequestView = new Request.Views.CreateRequest({model: this.request});
      this.changePage(createRequestView);
    },

    // for admin
    admin: function() {
      require(["modules/admin/admin"],function(Admin){
        Admin.adminView.render();
        //Request.requests
        Admin.requests.fetch({reset: true});       
      });

    },
    changePage:function (page) {
      //page.$el.attr('data-role', 'page');
      page.render();
      $("#main").html(page.el);
      return;
    }


  });

  return Router;

});
