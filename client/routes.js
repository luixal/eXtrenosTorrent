Router.route(
  '/',
  {
    subscriptions: function() {
      return Meteor.subscribe('torrents');
    },

    action: function() {
      if (this.ready()) {
        this.render('main');
      }
    }
  }
);
