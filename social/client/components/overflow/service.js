(function () {

  'use strict';

  angular.module('social')
    .service('scrollService', scrollService);

  scrollService.$inject = ['$timeout'];

  function scrollService ($timeout) {
    var ss = {};
    ss.malihuScroll = function scrollBar(selector, theme, mousewheelaxis) {

        $timeout(function () {

          $(selector).mCustomScrollbar({
              theme: theme,
              scrollInertia: 100,
              axis:'yx',
              mouseWheel: {
                  enable: true,
                  axis: mousewheelaxis,
                  preventDefault: true
              }
          });

        })
    }
    return ss;
  }

})();
