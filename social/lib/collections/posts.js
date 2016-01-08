/**
 * @summary Stores publications
 * @class collections.Posts
 * @instancename post
 * @param {String}    authorId          "ForeignKey" to Users instance
 * @param {Datetime}  publishedAt        Date that was published
 * @param {Datetime}  content            The content of post
 * @param {Datetime}  image              The image of post
 */
Posts = new Mongo.Collection('Posts');


/** Helpers for the collection Posts **/
Posts.helpers({

  author: function () {
    return Meteor.users.findOne({
      _id: this.authorId
    });
  },

  imageUrl: function () {
    var image = Images.findOne({_id: this.image});
    if (image) {
      return image.url();
    }
  },

  comments: function () {
    return Comments.find({postId: this._id});
  },

  commentsQtd: function () {
    return this.comments().count();
  },

});


Posts.before.insert(function (userId, post) {
  post.authorId = userId;
  post.publishedAt = new Date();
  post.state = Meteor.users.findOne({_id: userId}).profile.state;
  return post;
});
