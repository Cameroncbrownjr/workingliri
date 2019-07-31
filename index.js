// console.log(process.argv)
require("dotenv").config();
const chalk = require("chalk");
var keys = require("./keys");
var axios = require("axios");
var operation = process.argv[2];
var query = process.argv.slice(3).join(" ");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify); 
// console.log(query)
console.log(keys);

switch (operation) {
  case "movie-this":
    getMovie(query);
    break;
  case "concert-this":
    getConcerts(query);
    break;
  case "spotify-this-song":
    getSong(query);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("Enter valid operation");
}

function getMovie(movie) {
  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie)
    .then(function (response) {
      console.log(response.data);
    });
}

function getConcerts(concert) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
      concert +
      "/events?app_id=" +
      keys.bandsInTown
    )
    .then(function (response) {
      if (!response.data || !Array.isArray(response.data)) return;
      console.log("Dates for ", query, "\n");
      for (var i = 0; i < response.data.length; i++) {
        console.log(
          "Location: ",
          response.data[i].venue.city +
          ", " +
          response.data[i].venue.region +
          ", " +
          response.data[i].venue.country
        );
        console.log(
          "Date: ",
          chalk.red(new Date(response.data[i].datetime).toLocaleString()),
          "\n"
        );
      }
    });
}

function getSong(song) {
  //artist, songname, preview, album
  spotify
    .search({ type: "track", query: song }, function (response) {
      console.log(response);
      var songArr = response.tracks.items

        // console.log('Artist: ' + songArr.artists[0].name)
        // console.log('Song Name: ' + songArr.name)
        // console.log('Album Name: ' + songArr.album.name)
        // console.log('Preview URL: ' + songArr.preview_url)
        // console.log('\n');

    })
    .catch(function (err) {
      console.log(err);
    });
}
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);
    switch (dataArr[0]) {
      case "movie-this":
        getMovie(dataArr[1]);
        break;
      case "concert-this":
        getConcerts(dataArr[1]);
        break;
      case "spotify-this-song":
        getSong(dataArr[1]);
        break;
      case "do-what-it-says":
        doWhatItSays();
        break;
      default:
        console.log("Enter valid operation");
    }
  });
}
