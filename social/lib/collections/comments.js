/**
 * @summary Stores comments
 * @class collections.Comments
 * @instancename comment
 * @param {String}    authorId          "ForeignKey" to Users instance
 * @param {Datetime}  publishedAt        Date that was published
 * @param {Datetime}  content            The content of comment
 */
Comments = new Mongo.Collection('Comments');


/** Helpers for the collection Comments **/
Comments.helpers({

  author: function () {
    return Meteor.users.findOne({
      _id: this.authorId
    });
  },

});


Comments.before.insert(function (userId, comment) {
  comment.authorId = userId;
  comment.publishedAt = new Date();
  return comment;
});
