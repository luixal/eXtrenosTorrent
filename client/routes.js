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

Router.route(
  '/contact',
  {
    // subscriptions: function() {
    //   return Meteor.subscribe('stats');
    // },

    action: function() {
      if (this.ready()) {
        this.render('contactForm');
      } else {
        console.log('loading contact template...');
      }
    }
  }
);
