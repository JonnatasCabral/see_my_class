(function () {

  'use strict';

  angular.module('social')
    .controller('PostCtrl', PostCtrl);

  PostCtrl.$inject = ['$scope', '$meteor', '$state', '$reactive', '$timeout'];

  function PostCtrl ($scope, $meteor, $state, $reactive, $timeout) {

    $reactive(this).attach($scope);

    this.postsQuantity = 3;
    let lastPostsQuantity = angular.copy(this.postsQuantity);
    this.formData = getNewForm();
    this.updateData = getNewForm();
    this.updatingIdx = false;
    this.storedImage = null;

    this.helpers({

      posts: () => {
        return Posts.find({}, {
          sort: {
            publishedAt: -1,
          }
        });
      },

      images: () => {
        return Images.find({});
      },

    });

    this.subscribe('posts', () => {
      return [this.getReactively('postsQuantity')];
    });
    this.subscribe('comments');
    this.subscribe('images');
    this.subscribe('users');


    this.loadMore = () => {
      lastPostsQuantity = angular.copy(this.postsQuantity);
      this.postsQuantity += 5;

      $timeout(() => {
        if (this.posts.length <= lastPostsQuantity) {
          angular.element('.load-more').addClass('hidden');
        };
      }, 300);
    };


    this.submit = () => {

      if (this.storedImage !== '' && this.storedImage != null) {
        this.formData.image = this.storedImage._id;
      }

      Posts.insert(this.formData);
      this.storedImage = null;
      this.formData = getNewForm();
    };


    this.startUpdate = (post) => {
      var idx = this.posts.indexOf(post);
      this.updatingIdx = idx;
      this.updateData.content = post.content;
      angular.element('#area-' + idx).focus();
    };


    this.cancelUpdate = (post) => {
      this.updatingIdx = false;
    };


    this.isUpdating = (post) => {
      var idx = this.posts.indexOf(post);
      return idx === this.updatingIdx;
    };


    this.update = (post) => {
      Posts.update({_id: post._id}, {
          $set: {
            content: this.updateData.content,
          }
      });

      this.updatingIdx = false;
    };


    this.remove = (post) => {
      Images.remove({_id: post.image});
      Posts.remove({_id: post._id})
    };


    this.addImages = (files) => {
      if (files.length > 0) {
        Images.insert(files[0], function (err, fileObj) {

          if (!err) {
            this.storedImage = fileObj;
          } else {
            console.log(err);
          }
        }.bind(this));
      }
    };


    this.setTypeGood = () => {
      this.formData.type = 'good';
    };


    this.setTypeAverage = () => {
      this.formData.type = 'average';
    };


    this.setTypeBad = () => {
      this.formData.type = 'bad';
    };


    function getNewForm () {
      return {
        content: '',
      }
    };

  }

})();