(function () {

  'use strict';

  angular.module('social')
    .controller('PostCtrl', PostCtrl);

  PostCtrl.$inject = ['$scope', '$meteor', '$state'];

  function PostCtrl ($scope, $meteor, $state) {
    var vm = this;
    vm.formData = getNewForm();
    vm.updateData = getNewForm();
    vm.updatingIdx = false;

    $meteor.subscribe('users');
    $scope.$meteorSubscribe('posts', 3)
      .then(function () {
        vm.posts = $meteor.collection(Posts);
      });

    vm.loadMore = function () {
      var length = vm.posts.length;
      $scope.$meteorSubscribe('posts', length + 5)
        .then(function () {
          vm.posts = $meteor.collection(Posts);
          if (vm.posts.length <= length) {
            angular.element('.load-more').addClass('hidden');
          };
        });
    };

    vm.submit = function () {
      vm.posts.unshift(vm.formData);
      vm.formData = getNewForm();
    };

    vm.startUpdate = function (post) {
      var idx = vm.posts.indexOf(post);
      vm.updatingIdx = idx;
      vm.updateData.content = post.content;
      angular.element('#area-' + idx).focus();
    };

    vm.cancelUpdate = function (post) {
      vm.updatingIdx = false;
    };

    vm.isUpdating = function (post) {
      var idx = vm.posts.indexOf(post);
      return idx === vm.updatingIdx;
    };

    vm.update = function (post) {
      var idx = vm.posts.indexOf(post);
      vm.posts[idx].content = vm.updateData.content;
      vm.updatingIdx = false;
    };

    vm.remove = function (post) {
      var idx = vm.posts.indexOf(post);
      vm.posts.splice(idx, 1);
    };

    function getNewForm() {
      return {
        content: '',
      }
    };

  }

})();