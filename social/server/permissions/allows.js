

Posts.allow({

  insert: function (userId, obj) {
    return true;
  },

  update: function (userId, obj, fields, modifier) {
    return userId && obj.authorId === userId;
  },

  remove: function (userId, obj) {
    return userId && obj.authorId === userId;
  }

});
