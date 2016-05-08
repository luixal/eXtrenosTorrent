Template.main.onRendered(function() {
});

Template.main.helpers({
  torrents: function() {
    return Torrents.find();
  }
});

Template.main.events({
});


Template.torrent.helpers({
  date: function(createdAt) {
    return moment(createdAt).fromNow();
  },

  downloadClass: function(downloadLink) {
    if (downloadLink.startsWith('http')) return 'btn btn-success btn-sm';
    if (downloadLink.startsWith('magnet')) return 'btn btn-info btn-sm';
  },

  downloadIcon: function(downloadLink) {
    if (downloadLink.startsWith('http')) return 'fa fa-download';
    if (downloadLink.startsWith('magnet')) return 'fa fa-cloud-download';
  },

  downloadText: function(downloadLink) {
    if (downloadLink.startsWith('http')) return 'Descargar Torrent';
    if (downloadLink.startsWith('magnet')) return 'Magnet Link';
  },

  ratingTextClass: function(rating) {
    rating = rating.replace(',', '.');
    if (rating < 5) return 'text-danger';
    if (rating < 7) return 'text-warning';
    return 'text-success';
  }
});

Template.torrent.events({
  'click #info': function(event) {
    event.preventDefault();
    var torrent = this;
    Modal.show('imdb', function() {
      return torrent;
    });
  }
});
