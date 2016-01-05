(function () {

  'use strict';

  angular.module('social')
    .directive('cOverflow', cOverflow);

  cOverflow.$inject = ['scrollService'];

  function cOverflow (scrollService) {
    return {
      restrict: 'C',
      link: function(scope, element) {
        if (!$('html').hasClass('ismobile')) {
          scrollService.malihuScroll(element, 'minimal-dark', 'y');
        }
      }
    }
  }

})();
