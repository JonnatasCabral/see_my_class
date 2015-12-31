(function () {

  'use strict';

  angular.module('social')
    .config(Config);

  Config.$inject = [
    '$urlRouterProvider',
    '$stateProvider',
    '$locationProvider'];

  /** Configuration of the main app **/
  function Config ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/postagens');
  
    /** Routes mapping **/
    authRoutes($stateProvider);
    publicationsRoutes($stateProvider);
  }

  function authRoutes ($stateProvider) {
    $stateProvider
      .state('auth', {
        abstract: true,
        template: '<span ui-view></span>',
        onEnter: function(){
          var body = angular.element('body');
          body.addClass('login-content');
        },
        onExit: function(){
          var body = angular.element('body');
          body.removeClass('login-content');
        }
      })
      .state('auth.login', {
        url: '/entrar',
        templateUrl: 'client/components/auth/views/login.ng.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .state('auth.register', {
        url: '/registro',
        templateUrl: 'client/components/auth/views/register.ng.html',
        controller: 'RegisterCtrl',
        controllerAs: 'vm',
      })
      .state('auth.forbidden', {
        url: '/area-restrita',
        templateUrl: 'client/components/auth/views/forbidden.ng.html',
      })
  }

  function publicationsRoutes ($stateProvider) {
    $stateProvider

      .state('posts', {
        abstract: true,
        templateUrl: 'client/components/base.ng.html',
        resolve: {
          'currentUser': function ($meteor) {
            return $meteor.requireUser();
          }
        }
      })
      .state('posts.index', {
        url: '/postagens',
        templateUrl: 'client/components/posts/posts.ng.html',
        controller: 'PostCtrl',
        controllerAs: 'vm',
      });

  }

})();