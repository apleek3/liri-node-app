require("dotenv").config();

// HOMEWORK INSTRUCTION: Add the code required to import the `keys.js` file and store it in a variable.
var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

var command = process.argv[2];
var request = require("request");
var name = process.argv[3];

if (command == 'movieThis') {
  console.log(command);
  movieThis(name);
};


/* PULLED FROM NPM SPOTIFY
var SpotifyWebApi = require('spotify-web-api-node');
 
// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://www.example.com/callback'
});
*/

function myTweets() {
  //This will show your last 20 tweets and when they were created at in your terminal/bash window.
};

function spotifyThis(song_name) {
/*
  // A request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t=" + movie_name + "&plot=short&apikey=trilogy", function (error, response) {

    // Should I need to check the data:
    // console.log(resonse); 

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      // List of Movie Information per instructions:
      console.log("This song's Artist is: " + JSON.parse(response.body).Title); //* Artist(s)
      console.log("This song's Name is: " + JSON.parse(response.body).Year);  //* The song's name
      console.log("This song's preview can be found at this link: " + JSON.parse(response.body).imdbRating);  //* A preview link of the song from Spotify
      console.log("This song's Album of origin is: " + JSON.parse(response.body).Ratings[1].Value);  //* The album that the song is from
    } else {
      console.log("No song was provided. Here's some information about 'The Sign' by Ace of Base.: " + JSON.parse(response.body).Country);  //* If no song is provided then your program will default to "The Sign" by Ace of Base.
 */
    }
 
  });


}; //END OF SPOTIFYTHIS


function movieThis(movie_name) {

  // A request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t=" + movie_name + "&plot=short&apikey=trilogy", function (error, response) {

    // Should I need to check the data:
    // console.log(resonse); 

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
    }
  });

}; //END OF MOVIETHIS FUNCTION

  /*

  
  
  
  
  
  
  
  

  //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
};

function doWhatItSays() {

  //* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  //* It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

  //* Feel free to change the text in that document to test out the feature for other commands.
};


/*
Make it so liri.js can take in one of the following commands:

    * `my-tweets`

    * `spotify-this-song`

    * `movie-this`

    * `do-what-it-says`
  

    1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
   * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
   * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
     * It's on Netflix!
   
   * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.
    * 
    * 
  
  
    */
