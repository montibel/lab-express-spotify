require("dotenv").config();

const express = require("express");
const app = express();

// //<=========Do this for EJS ==============>

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("view engine", "ejs");

//require spotify-web-api-node package here:
// npm i express spotify-web-api-node dotenv ejs express-ejs-layouts

app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// setting the spotify-api goes here:

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));
   
// Our routes go here:

app.get('/artist-search', (req, res, next) => {

  spotifyApi
      .searchArtists(req.query.artist)
      .then(data => {
          res.render('artist-search-results', { result: data.body.artists.items });
          console.log('The received data from the API: ', data.body.artists.items);
      })
      .catch(err => console.log('The error while searching artists occurred: ', err));
});





app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊')
);
