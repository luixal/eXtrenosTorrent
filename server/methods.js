Meteor.methods({
  refresh: function() {
    var func = Meteor.wrapAsync(getTorrentsList)
    return func();
  }
});
