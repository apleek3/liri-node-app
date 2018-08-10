/******************************************LIRI-APP************************************************************ */
/************************************************************************************************************** */
/************************************************************************************************************** */
require("dotenv").config(); //env security connection
var Spotify = require('node-spotify-api'), //require variables
  request = require("request"),
  express = require('express'),
  Twitter = require("twitter"),
  fs = require('fs-extra'),
  keys = require("./keys"); // {twitter: consumer_key..., spotify: id: ...}

// HOMEWORK INSTRUCTION: Add the code required to import the `keys.js` file and store it in a variable.
var spotify = new Spotify(keys.spotify); //new object using Spotify constructor
var client = new Twitter(keys.twitter); //new object using Twitter constructor
var command = process.argv[2]; //pulls the commands from the terminal
var name = process.argv[3]; // COMMANDS: movieThis, spotifyThis, twitterThis, doThis

var logger = fs.createWriteStream('./log.txt ', { // used to log commands and data to log.txt
  flags: 'a' // 'a' means appending (old data will be preserved)
});

/****************************************DO WHAT IT SAYS******************************************************* */
/************************************************************************************************************** */
/************************************************************************************************************** */

if (command == 'do-what-it-says') { //calls do-what-it-says command in terminal
  doWhatItSays = function () {
    fs.readFile('./random.txt', 'utf8', function (err, data) {
      if (err) throw err;
      var random = data.split(", ");
      name = random[1]; //Stores the second input from random.txt
      console.log("Your text file's command was '" + random[0] + ".' Your Search Query was '" + random[1] + ".'"); //CONSOLE FEEDBACK
      logger.write("DO-WHAT-IT-SAYS COMMAND. Reads from random.txt" + "\n");//LOGGER
      logger.write("COMMAND: " + random[0] + ", ")
      logger.write("QUERY: " + random[1] + "\n");
      if (random[0] == 'movieThis') { //calls movieThis command in terminal using input from the random.txt
        movieThis(name);
      };

      if (random[0] == 'spotifyThis') { //calls spotifyThis command in terminal using input from the random.txt
        spotifyThis(name);
      };

      if (random[0] == 'twitterThis') { //calls twitterThis command in terminal using input from the random.txt
        myTweets(name);
      };
    });
  }
  doWhatItSays();
} else {

  // Logs all command and search inputs to log.txt
  logger.write("COMMAND: " + command + ", ");
  logger.write("QUERY: " + name + "\n");

  if (command == 'movieThis') { //calls movieThis command in terminal using input from the user
    movieThis(name);
  };

  if (command == 'spotifyThis') { //calls spotifyThis command in terminal using input from the user
    spotifyThis(name);
  };

  if (command == 'twitterThis') { //calls twitterThis command in terminal using input from the user
    myTweets(name);
  };
}

/*********************************************TWITTER THIS***************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
function myTweets(user_name) {
  //This will show your last 20 tweets and when they were created at in your terminal/bash window.
  var params = { screen_name: user_name, count: 21 };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets[0].user.name + "'s Last 20 Tweets are:");
      for (i = 1; i < tweets.length; i++) { //Loops through the tweets to print out a total of 20 from the user's history
        console.log("Tweet #" + i + " of the last 20  :" + tweets[i].text);
        logger.write("Tweet #" + i + " of the last 20  :" + tweets[i].text + "\n"); //adds the results to log.txt
      }
      logger.write("\n");
    }
  });
};

/**********************************************SPOTIFY THIS**************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
function spotifyThis(song_name) {
  //Default Song in case the user doesn't enter anything:
  if (Boolean(name) === false) {
    song_name = "ace of base"; //artists name returns song in search endpoint "The Sign"
    console.log("YOU DIDN'T ENTER ANYTHING. Listen to THIS song:")
  };
  //Uses search endpoint in Spotify API from npm to retrieve song data.
  spotify.search({ type: 'track', query: song_name }, function (err, data) {
    if (err) { //error handling for Spotify API
      return console.log('Error occurred: ' + err);
    }
    console.log("The song you searched for is: " + data.tracks.items[0].name); //Song's NAME
    console.log("This song is performed by: " + data.tracks.items[0].artists[0].name) //ARTISTS
    console.log("The name of the album this song is from is: " + data.tracks.items[0].album.name); //Album NAME
    console.log("A preview of this song can be found at this link:  " + data.tracks.items[0].preview_url); // PREVIEW url

    //LOGGER
    logger.write("The song you searched for is: " + data.tracks.items[0].name + "\n"); //Song's NAME
    logger.write("This song is performed by: " + data.tracks.items[0].artists[0].name + "\n") //ARTISTS
    logger.write("The name of the album this song is from is: " + data.tracks.items[0].album.name + "\n"); //Album NAME
    logger.write("A preview of this song can be found at this link:  " + data.tracks.items[0].preview_url + "\n"); // PREVIEW url
    logger.write("\n");
  });
};

/***********************************************MOVIE THIS***************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */

function movieThis(movie_name) {
  //Default Movie in case the user doesn't enter anything:
  if (Boolean(name) === false) {
    movie_name = "Mr. Nobody";
    console.log("YOU DIDN'T ENTER ANYTHING. Watch THIS movie:")
  };
  // A request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t=" + movie_name + "&plot=short&apikey=trilogy", function (error, response) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      // List of Movie Information per instructions:
      console.log("The movie's Title is: " + JSON.parse(response.body).Title);//* Title of the movie.
      console.log("The movie's Production Year is: " + JSON.parse(response.body).Year);//* Year the movie came out.
      console.log("The movie's IMDB Rating is: " + JSON.parse(response.body).imdbRating);//* IMDB Rating of the movie.
      console.log("The movie's Rotten Tomatoes Score is: " + JSON.parse(response.body).Ratings[1].Value);//* Rotten Tomatoes Rating of the movie.
      console.log("The movie's Production Country is: " + JSON.parse(response.body).Country);//* Country where the movie was produced.
      console.log("The movie's Language is: " + JSON.parse(response.body).Language);//* Language of the movie.
      console.log("The movie's Plot (in summary) is: " + JSON.parse(response.body).Plot);//* Plot of the movie.
      console.log("The movie's Actor(s) is/are: " + JSON.parse(response.body).Actors);//* Actors in the movie.

      //LOGGER
      logger.write("The movie's Title is: " + JSON.parse(response.body).Title + "\n");//* Title of the movie.
      logger.write("The movie's Production Year is: " + JSON.parse(response.body).Year + "\n");//* Year the movie came out.
      logger.write("The movie's IMDB Rating is: " + JSON.parse(response.body).imdbRating + "\n");//* IMDB Rating of the movie.
      logger.write("The movie's Rotten Tomatoes Score is: " + JSON.parse(response.body).Ratings[1].Value + "\n");//* Rotten Tomatoes Rating of the movie.
      logger.write("The movie's Production Country is: " + JSON.parse(response.body).Country);//* Country where the movie was produced.
      logger.write("The movie's Language is: " + JSON.parse(response.body).Language + "\n");//* Language of the movie.
      logger.write("The movie's Plot (in summary) is: " + JSON.parse(response.body).Plot + "\n");//* Plot of the movie.
      logger.write("The movie's Actor(s) is/are: " + JSON.parse(response.body).Actors + "\n");//* Actors in the movie.
      logger.write("\n");
    };
  });
};

