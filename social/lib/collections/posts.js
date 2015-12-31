/**
 * @summary Stores publications
 * @class collections.Posts
 * @instancename post
 * @param {String}    authorId          "ForeignKey" to Users instance
 * @param {Datetime}  publishedAt     Date that was published
 * @param {Datetime}  content            The content of post
 */
Posts = new Mongo.Collection('Posts');


/** Helpers for the collection Posts **/
Posts.helpers({

  author: function () {
    return Meteor.users.findOne({
      _id: this.authorId
    });
  },

});


Posts.before.insert(function (userId, post) {
  post.authorId = userId;
  post.publishedAt = new Date();
  return post;
});
