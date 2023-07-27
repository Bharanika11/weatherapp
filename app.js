const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/weather', async (req, res) => {
  const location = req.body.location;

  try {
    const weatherData = await getWeatherData(location);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch weather data.' });
  }
});

async function getWeatherData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return {
    temperature: response.data.main.temp,
    description: response.data.weather[0].description,
    icon: response.data.weather[0].icon,
  };
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
