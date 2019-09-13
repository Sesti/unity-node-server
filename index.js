const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const axios = require('axios');
const fs = require('fs');

const updateTime = 300000;
const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?id=${process.env.WEATHER_CITY_ID}&APPID=${process.env.WEATHER_API_KEY}&units=metric`;

const app = express();

/*************
 * Configure
 *************/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (!fs.existsSync('data')){
    fs.mkdir('data', null, (err) => {
        if (err) throw err;
    });
}

/*************
 * Router
 *************/
app.get('/api/v1/weather', (req, res) => {
    fs.readFileSync('data/weather.json', (err, data) => {
        if (err) throw err;
        res.send('hey');
    });
});

/***********************
 * Fetchers functions
 ***********************/
const fetchWeather = () => {
    axios.get(weatherUrl)
    .then((res) => {
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
        });
        console.log('fetched weather');
    })
    .catch((error) => {
        console.log(error);
    })
};

/*************
 * Fetchers 
 *************/
fetchWeather();
setInterval(() => fetchWeather , updateTime);

/*************
 * Runtime
 *************/
app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);