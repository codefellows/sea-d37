'use strict';

module.exports = function(app) {
  app.factory('auth' , ['$http','$base64', '$cookies', function($http, $base64, $cookies) {
    return {
      signIn: function(user, callback) {
        var encoded = $base64.encode(user.username + ':' + user.password);
        user.email = user.username;
        $http.get('/api/sign_in', {
          headers: {'Authorization': 'Basic ' + encoded}
        })
        .success(function(data) {
          $cookies.put('eat', data.token);
          callback(null);
        })
        .error(function(data) {
          callback(data);
        });
      },

      create: function(user, callback) {
        user.email = user.username;
        $http.post('/api/create_user', user)
          .success(function(data) {
            console.log(data);
            $cookies.put('eat', data.token)
            callback(null);
          }) 
          .error(function(data) {
            callback(data);
          });
      },

      logout: function() {
        $cookies.put('eat', '');
      },

      isSignedIn: function() {
        return !!($cookies.get('eat') && $cookies.get('eat').length);
      }
    };
  }]);
};
