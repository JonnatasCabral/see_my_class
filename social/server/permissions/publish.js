
Meteor.publish('posts', function (limit) {
  limit = limit || 3;

  var user = Meteor.users.findOne({_id: this.userId});
  var state = null;

  if (user) {
    state = user.profile.state;
  };

  return Posts.find({
    state: state,
  }, {
    limit: limit,
    sort: {
      publishedAt: -1,
    },
  });
});


Meteor.publish('users', function () {
  return Meteor.users.find();
});

Meteor.publish('comments', function () {
  return Comments.find();
});


Meteor.publish('images', function() {
  return Images.find({});
});
