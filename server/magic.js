getTorrentsList = function(cb) {
  HTTP.get(
    'http://www.estrenotorrent.com/torrents',
    {},
    function(error, response) {
      if (error) {
        console.log('Ops! Something happened while getting torrents list:');
        console.log(error);
      } else {
        var $ = cheerio.load(response.content);
        // var torrents = $('.blogitem').children('a').attr('href');
        var func = Meteor.wrapAsync(getTorrentDetails);
        var torrents = $('.blogitem').map(function(i, el) {
          // get details:
          var details = func($('a', this).attr('href'), $('a', this).attr('title'));
          // creating torrent object:
          var torrent = {
            title: $('a', this).attr('title'),
            description: details.description,
            pic: $('img', this).attr('src'),
            link: 'http://www.estrenotorrent.com' + $('a', this).attr('href'),
            downloadLink: details.downloadLink,
            createdAt: moment($('div .createdate', this).text(), 'DD/MM/YYYY').utc().toDate()
          };
          if (details.imdb) torrent.imdb = details.imdb;
          // inserting torrent info:
          Torrents.upsert({link: torrent.link}, torrent);
        });

        cb(error, response);
      }
    }
  );
}

getTorrentDetails = function(url, title, cb) {
  HTTP.get(
    'http://www.estrenotorrent.com' + url,
    {},
    function(error, response) {
      if (error) {
        console.log('Ops! Something happened while getting torrent details from (' + url + '):');
        console.log(error);
        cb(error, response);
      } else {
        var details = {};

        var $ = cheerio.load(response.content);
        // getting clean description:
        let description = '';
        $('.descargatext p').each(function(index, el) {
          if (!$(this).attr('class')) description += $(this).text();
        });
        details.description = description;

        var func = Meteor.wrapAsync(getTorrentDownloadLink);
        details.downloadLink = func($('.zentorrents_download').children().last().children().first().attr('href'));

        func = Meteor.wrapAsync(getMovieInfoFromIMDB);
        let imdb = func(title);
        if (imdb.data.data && imdb.data.data.movies) details.imdb = imdb.data.data.movies[0];

        cb(
          error,
          details
        );
      }
    }
  );
}

getTorrentDownloadLink = function(url, cb) {
  HTTP.get(
    'http://www.estrenotorrent.com' + url,
    {},
    function(error, response) {
      if (error) {
        console.log('Ops! Something happened while getting torrent download link from (' + url + '):');
        console.log(error);
        cb(error, response);
      } else {
        var $ = cheerio.load(response.content);
        cb(
          error,
          /(href)(.*)(><)/.exec($('script').text())[0].split('"')[1]
        );
      }
    }
  );
}

getMovieInfoFromIMDB = function(title, cb) {
  title = title.split('[')[0].trim();
  HTTP.get(
    'http://www.myapifilms.com/imdb/idIMDB?title=' + title + '&token=4a80b4b5-22a4-4ede-a97f-e05047c3bb46&format=json&language=es-es&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=1&movieTrivia=0&awards=1&moviePhotos=0&movieVideos=0&actors=1&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=1&actorActress=1&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&quotes=0&fullSize=1',
    {},
    function(error, response) {
      if (error) {
        console.log('Ops! Something happened while getting movie info from IMDB (using myApiFilms):');
        console.log(error);
        cb(error, response);
      } else {
        cb(error, response);
      }
    }
  );
}
