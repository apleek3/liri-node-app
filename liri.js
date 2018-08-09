require("dotenv").config();
var Spotify = require('node-spotify-api'),
  request = require("request"),
  Twitter = require("twitter"),
  keys = require("./keys"); // {twitter: consumer_key..., spotify: id: ...}

// HOMEWORK INSTRUCTION: Add the code required to import the `keys.js` file and store it in a variable.
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];
var name = process.argv[3];


// console.log(
//   client.get('statuses/user_timeline', function (error, tweets, response) {
//     if (error) throw error;
//     console.log(tweets);  // The favorites.
//     //console.log(response);  // Raw response object.
//   })

// );




if (command == 'movieThis') {
  console.log(command);
  movieThis(name);
};

if (command == 'spotifyThis') {
  //console.log(command);
  spotifyThis(name);
};

if (command == 'twitterThis') {
  console.log(command);
  myTweets(name);
};


/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/* function myTweets(user_name) {
  //This will show your last 20 tweets and when they were created at in your terminal/bash window.
  var params = { screen_name: user_name };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets);
      console.log(client.get(path, params, callback));
      console.log(client.post(path, params, callback));
      console.log(client.stream(path, params, callback));
    }
  });
}; */


/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
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
  });
};

/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
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
    };
  });
};//END OF MOVIETHIS FUNCTION





/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */

function doWhatItSays() {

  //* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  //* It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

  //* Feel free to change the text in that document to test out the feature for other commands.
};

/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/************************************************************************************************************** */
/*
Make it so liri.js can take in one of the following commands:

    * `my-tweets`

    * `spotify-this-song`

    * `movie-this`

    * `do-what-it-says`
  

    1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.


4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.
    * 
    * 
  
  
    */
