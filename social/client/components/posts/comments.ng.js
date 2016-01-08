
(function () {

  'use strict';

  angular.module('social')
    .controller('CommentsCtrl', CommentsCtrl);

  CommentsCtrl.$inject = ['$scope', '$reactive'];

  function CommentsCtrl ($scope, $reactive) {

    $reactive(this).attach($scope);

    this.formData = getNewForm();
    this.post = null;

    this.helpers({

      comments: () => {

        var post = this.getReactively('post');
        if (post){

          return Comments.find({
              postId: post._id
            },
            {
              sort: {
                publishedAt: -1,
              }
            });
        } else {
          return [];
        }
      },

    });

    this.subscribe('comments');
    this.subscribe('posts');
    this.subscribe('users');

    this.submit = () => {
      if (this.post) {
        this.formData.postId = this.post._id;
        Comments.insert(this.formData);
        this.formData = getNewForm();
      };
    };

    function getNewForm() {
      return {
        'content': ''
      }
    }

  }

})();