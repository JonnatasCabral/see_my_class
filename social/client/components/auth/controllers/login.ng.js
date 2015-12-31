(function () {

  'use strict';

  angular.module('social')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$meteor', '$state', '$timeout', 'loginErrorConstants'];

  /**
   * @summary Handle's authentication of the operators
   * @class client.auth.controllers.LoginCtrl
   * @instancename loginCtrl
   */
  function LoginCtrl ($meteor, $state, $timeout, loginErrorConstants) {
    var vm = this;

    initialize()


    /** Initialize variables of the controller context **/
    function initialize () {
      vm.error = '';
      vm.credentials = {
        username: '',
        password: ''
      };
    }
  

    /**
     * @summary Authenticate the user with the credentials in vm.credentials
     * @method login
     * @memberOf client.auth.controllers.LoginCtrl
     * @instance
     */
    vm.login = function () {
      $meteor.loginWithPassword(
        vm.credentials.username,
        vm.credentials.password
      ).then(loginSuccess, loginFail);
    }


    /**
     * @summary Sends the current user to the initial page
     * @method loginSuccess
     * @memberOf client.auth.controllers.LoginCtrl
     * @instance
     */
    function loginSuccess () {
      $state.go('posts.index');
    }


    /**
     * @summary Show the error message in template
     * @method loginFail
     * @memberOf client.auth.controllers.LoginCtrl
     * @instance
     */
    function loginFail (err) {
      vm.error = loginErrorConstants[err.reason];
    }

  }

})();