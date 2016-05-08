Template.body.onRendered(function() {
  Session.set('isRefreshing', false);
});

Template.body.helpers({
  isRefreshing: function() {
    if (Session.get('isRefreshing')) return 'fa-spin';
    return '';
  }
});


Template.body.events({
  'click #reload': function(event) {
    event.preventDefault();
    Session.set('isRefreshing', true);
    Meteor.call('refresh', function(error, value) {
      Session.set('isRefreshing', false);
    });
    // Session.set('isRefreshing', !Session.get('isRefreshing'));
  }
});
