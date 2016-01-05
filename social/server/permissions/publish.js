
Meteor.publish('posts', function (limit) {
  limit = limit || 3;
  return Posts.find({}, {
    limit: limit,
    sort: {
      publishedAt: -1,
    },
  });
});


Meteor.publish('users', function () {
  return Meteor.users.find();
});


Meteor.publish('images', function() {
  return Images.find({});
});
