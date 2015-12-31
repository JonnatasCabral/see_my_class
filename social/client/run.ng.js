(function () {

  'use strict';

  angular.module('social')
    .run(function (amMoment, momentPTBR, $rootScope, $state) {
      amMoment.changeLocale('pt-br', momentPTBR);

      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

        if (error === 'AUTH_REQUIRED') {
          $state.go('auth.forbidden');
        }

      });
    });

})();