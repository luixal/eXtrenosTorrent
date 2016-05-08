Meteor.publish('torrents', function() {
  return Torrents.find({}, {sort: {createdAt: 1}});
});
