// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { auth } = require('express-oauth2-jwt-bearer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Auth0 JWT verification middleware (optional - for extra security)
// Uncomment if you want to enforce JWT verification on backend
/*
const checkJwt = auth({
  audience: 'https://your-tenant.us.auth0.com/api/v2/',
  issuerBaseURL: 'https://your-tenant.us.auth0.com/',
});
*/

// Configuration
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Validate required environment variables
if (!OPENWEATHER_API_KEY) {
  console.error('ERROR: OPENWEATHER_API_KEY is not set in .env file');
  process.exit(1);
}

// Cities data
const cities = {
  "List": [
    {"CityCode": "1248991", "CityName": "Colombo", "Temp": "33.0", "Status": "Clouds"},
    {"CityCode": "1850147", "CityName": "Tokyo", "Temp": "8.6", "Status": "Clear"},
    {"CityCode": "2644210", "CityName": "Liverpool", "Temp": "16.5", "Status": "Rain"},
    {"CityCode": "2988507", "CityName": "Paris", "Temp": "22.4", "Status": "Clear"},
    {"CityCode": "2147714", "CityName": "Sydney", "Temp": "27.3", "Status": "Rain"},
    {"CityCode": "4930956", "CityName": "Boston", "Temp": "4.2", "Status": "Mist"},
    {"CityCode": "1796236", "CityName": "Shanghai", "Temp": "10.1", "Status": "Clouds"},
    {"CityCode": "3143244", "CityName": "Oslo", "Temp": "-3.9", "Status": "Clear"}
  ]
};

// In-memory cache
const cache = new Map();

// Cache management
function getCachedData(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Cache hit for ${key}`);
    return cached.data;
  }
  console.log(`Cache miss for ${key}`);
  return null;
}

function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

// Fetch weather data for a single city
async function fetchWeatherForCity(cityCode) {
  const cacheKey = `weather_${cityCode}`;
  
  // Check cache first
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // Fetch from OpenWeatherMap API
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${OPENWEATHER_API_KEY}`;
    const response = await axios.get(url);
    
    // Cache the response
    setCachedData(cacheKey, response.data);
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather for city ${cityCode}:`, error.message);
    throw error;
  }
}

// Routes

// Get weather data for all cities
app.get('/api/weather', async (req, res) => {
  try {
    const cityCodes = cities.List.map(city => city.CityCode);
    
    // Fetch weather data for all cities
    const weatherPromises = cityCodes.map(code => fetchWeatherForCity(code));
    const weatherData = await Promise.all(weatherPromises);
    
    res.json(weatherData);
  } catch (error) {
    console.error('Error in /api/weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get weather data for a specific city
app.get('/api/weather/:cityCode', async (req, res) => {
  try {
    const { cityCode } = req.params;
    const weatherData = await fetchWeatherForCity(cityCode);
    res.json(weatherData);
  } catch (error) {
    console.error(`Error in /api/weather/${req.params.cityCode}:`, error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get cities list
app.get('/api/cities', (req, res) => {
  res.json(cities);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    cacheSize: cache.size,
    timestamp: new Date().toISOString()
  });
});

// Clear cache endpoint (for testing)
app.post('/api/cache/clear', (req, res) => {
  cache.clear();
  res.json({ message: 'Cache cleared successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Weather API server running on http://localhost:${PORT}`);
  console.log(`Cache duration: ${CACHE_DURATION / 1000} seconds`);
});

// Clean up expired cache entries every minute
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp >= CACHE_DURATION) {
      cache.delete(key);
      console.log(`Removed expired cache entry: ${key}`);
    }
  }
}, 60000);