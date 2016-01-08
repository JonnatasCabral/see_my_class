

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


Comments.allow({

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


Images.allow({
    insert: function (userId) {
      return (userId ? true : false);
    },
    remove: function (userId) {
      return (userId ? true : false);
    },
    download: function (userId) {
      return (userId ? true : false);
    },
    update: function (userId) {
      return (userId ? true : false);
    }
  });
