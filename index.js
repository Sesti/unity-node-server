const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Configure
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/v1/weather', (req, res) => {
  res.send('Hey!');
});


app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);