const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
var convert = require('xml-js');
var querystring = require('querystring');
var request = require('request'); // "Request" library
var cookieParser = require('cookie-parser');
var cors = require('cors');

const weatherUpdateTime = 300000;   // 5 minutes
const newsUpdateTime = 3600000; // 1 heure
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?id=${process.env.WEATHER_CITY_ID}&APPID=${process.env.WEATHER_API_KEY}&units=metric`;
const newsUrl = 'https://www.journaldemontreal.com/rss.xml';
const plugUrl = (action) => `https://maker.ifttt.com/trigger/${action}/with/key/${process.env.IFTTT_API_KEY}`;

/* Spotify auth */
const client_id = `${process.env.SPOTIFY_CLIENT_ID}`;
const client_secret = `${process.env.SPOTIFY_CLIENT_SECRET}`;
const redirect_uri =  `${process.env.SPOTIFY_REDIRECT_URI}`;

const app = express();


/*************
 * Configure
 *************/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (!fs.existsSync('data')){
    fs.mkdir('data', null, (err) => {
        if (err) throw err;
        console.log(chalk.magentaBright('[File] Directory data created'));
    });
}

/*************
 * Router
 *************/
app.get('/api/v1/weather', (req, res) => {
    fs.readFile(__dirname+'/data/weather.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.get('/api/v1/news', (req, res) => {
    fs.readFile(__dirname+'/data/news.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.get('/api/v1/domotique/plug/:room/:action', (req,res) => {

    if(req.params.room === "bathroom"){
        const action = req.params.action == "on" ? "start_plug_bathroom" : "stop_plug_bathroom";
        axios.post(plugUrl(action))
        .then((res) => {
            console.log(chalk.magentaBright(res.data));
        })
        .catch((error) => {
            console.log(chalk.red("Error : " + error));
        });
    }
});


// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/sesti25/player/currently-playing',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

/***********************
 * Fetchers functions
 ***********************/
const fetchWeather = () => {
    axios.get(weatherUrl)
    .then((res) => {

        console.log(chalk.yellowBright('[Fetch] Weather data fetched'));

        const data = res.data;

        const weathers = [];
        data.weather.forEach(e => {
            weathers.push({
                id: e.id,
                main: e.main,
                description: e.description,
                icon: e.icon,
            });
        });

        const weather = { 
            weather: weathers,
            main: {
                temp: data.main.temp,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
                humidity: data.main.humidity
            },
            wind: {
                speed: data.wind.speed,
                deg: data.wind.deg,
            },
            sys: {
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
            },
            name: data.name,
        };

        const content = JSON.stringify(weather, null, 4);

        fs.writeFile('data/weather.json', content, (err) => {
            if (err) throw err;
            console.log(chalk.magentaBright("[File] File weather.json written"));
        });
    })
    .catch((error) => {
        console.log(chalk.red(error));
    })
};

const fetchNews = () => {
    axios.get(newsUrl)
    .then((res) => {

        console.log(chalk.yellowBright('[Fetch] News data fetched'));
        const json = JSON.parse(convert.xml2json(res.data, {compact: true, spaces: 4}))
        const data = { data: json.rss.channel.item };

        fs.writeFile('data/news.json', JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log(chalk.magentaBright("[File] File news.json written"));
        });
    })
    .catch((error) => {
        console.log(chalk.red(error));
    })
};

/*************
 * Fetchers 
 *************/
fetchWeather();
fetchNews();
setInterval(() => fetchWeather , weatherUpdateTime);
setInterval(() => fetchNews, newsUpdateTime)

/*************
 * Utility
 *************/
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

/*************
 * Runtime
 *************/
app.listen(process.env.PORT, () =>
    console.log(`Unity server listening on port ${process.env.PORT}!`),
);