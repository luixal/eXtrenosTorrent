Template.imdb.onRendered(function() {
});

Template.imdb.helpers({
  trailerURL: function() {
    return this.imdb.trailer.videoURL.replace('VIDEO', '/video') + '/imdb/embed?autoplay=false&width=480';
  },

  showTrailer: function() {
    if (this.imdb.trailer.videoURL) return true;
    return false;
  },

  ratingValue: function() {
    return this.imdb.rating.replace(',', '.') / 2;
  },

  ratingTextClass: function(rating) {
    rating = rating.replace(',', '.');
    if (rating < 5) return 'text-danger';
    if (rating < 7) return 'text-warning';
    return 'text-success';
  },

  formattedDate: function(date) {
    if (typeof date === 'string') date = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
    return moment(date).format('DD/MM/YYYY') + ' (' + moment(date).fromNow() + ')';
  }
});
