// User module
define([
  // Application.
  "app",
  //jquery.couch.js
  "jquery_couch",
  // Plugins
  "sha1",
  "backbone_validation" 
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var User = app.module();
  User.parent = app;

  // Default Model.
  User.Model = Backbone.Model.extend({
    validation: {
      fullname: {
        required: true,
        msg: 'Please enter a name'
      },
      name: {
        required: true,
        msg: 'Please enter a username'
      },
      password: {
        required: true,  
        msg: 'Please enter a password'
      }
    }
  });

  // Default Collection.
  User.Collection = Backbone.Collection.extend({
    model: User.Model
  });

  // User View / Login
  User.Views.Login = Backbone.LayoutView.extend({
    template: "user/login",
    // handle events
    events: {
      "click .done" : "login"
    },
    // data for login view, for ex. error message
    data: {
      message: ""
    },
    // login function
    login: function(e) {
      e.preventDefault();

      var userCreds = {
        name: $('input[name=username]').val(),
        password: $('input[name=password]').val()
      };

      if (!userCreds.name){
        $('input[name=username]').focus();
        return false;
      }

      if (!userCreds.password){
        $('input[name=password]').focus();
        return false;
      }

      var that = this;
      // use callback to handle response from login
      var callback = {
        success : function(resp) {
          app.router.index();
        },
        error : function(status, error, reason) {
          that.data.message = reason;
          that.render();
        }
      };        
      // create options: userCreds + callback
      var options = _.extend( userCreds, callback );

      $.couch.login(options);
    }

  });

  // User View / Register
  User.Views.Register = Backbone.View.extend({
    template: "user/register",
    //
    events: {
      'click .done': 'register'
    },
    //
    initialize: function(options){

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
    // register
    register: function(e) {
      e.stopPropagation();
      e.preventDefault();
      that = this;
      var formData = this.$('form').serializeObject();
      this.model.set(formData);
      if(this.model.isValid(true)){
        this.model.unset('password');
        this.model.set('date', new Date().getTime());
        $.couch.signup(this.model.attributes, formData.password, {
          success: function(data, status, jqXHR){
            var callback = {
              success : function(resp) {
                app.router.navigate("/", {trigger: true});
              },
              error : function(status, error, reason) {
                that.data.message = reason;
                that.render();
              }
            };        
            // create options: userCreds + callback
            var options = _.extend( {
              name: formData.name,
              password: formData.password
            }, callback );

            $.couch.login(options);
          },
          error: function(jqXHR, status, error){
            console.log(status);
            console.log(error);
          }
        });
      }
    }
  });

  // Return the module for AMD compliance.
  return User;

});
