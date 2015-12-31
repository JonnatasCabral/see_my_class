(function () {

  'use strict';

  angular.module('social')
    .controller('BaseCtrl', BaseCtrl);

  BaseCtrl.$inject = ['$meteor', '$state'];

  function BaseCtrl ($meteor, $state) {
    var vm = this;
    vm.userId = Meteor.userId();

    vm.logout = function () {
      $meteor.logout()
        .then(function () {
          $state.go('auth.login');
        });
    };

  }

})();