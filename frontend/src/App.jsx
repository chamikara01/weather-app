import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Cloud, CloudRain, Sun, Wind, Eye, Droplets, Gauge, X, ArrowLeft, LogOut, User } from 'lucide-react';
import LoginPage from './components/LoginPage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Main App component that handles authentication
function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center">
        <div className="text-center">
          <Cloud className="w-16 h-16 text-white animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <WeatherApp />;
}

// Weather icon mapping
const getWeatherIcon = (status) => {
  const iconMap = {
    'Clear': Sun,
    'Clouds': Cloud,
    'Rain': CloudRain,
    'Mist': Cloud,
  };
  return iconMap[status] || Cloud;
};

// Color mapping for weather cards
const getCardColor = (index) => {
  const colors = [
    'from-blue-400 to-blue-500',
    'from-purple-500 to-purple-600',
    'from-green-400 to-green-500',
    'from-orange-400 to-orange-500',
    'from-red-400 to-red-500',
    'from-cyan-400 to-cyan-500',
    'from-indigo-400 to-indigo-500',
    'from-pink-400 to-pink-500',
  ];
  return colors[index % colors.length];
};

function WeatherCard({ weather, index, onClick }) {
  const Icon = getWeatherIcon(weather.weather[0].main);
  const temp = Math.round(weather.main.temp - 273.15);
  const tempMin = Math.round(weather.main.temp_min - 273.15);
  const tempMax = Math.round(weather.main.temp_max - 273.15);
  
  // Get current date and time
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105" onClick={onClick}>
      <div className={`bg-gradient-to-br ${getCardColor(index)} p-6 relative`}>
        <button className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full p-1">
          <X size={20} />
        </button>
        
        <div className="text-white">
          <h3 className="text-2xl font-bold">{weather.name}</h3>
          <p className="text-sm opacity-90">{timeString}, {dateString}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Icon size={32} className="text-white" />
            <span className="text-white text-lg">{weather.weather[0].description}</span>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-white">{temp}°C</div>
            <div className="text-sm text-white/90">
              Temp Min: {tempMin}°c<br/>
              Temp Max: {tempMax}°c
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 text-white text-sm grid grid-cols-2 gap-4">
        <div>
          <div><strong>Pressure:</strong> {weather.main.pressure}hPa</div>
          <div><strong>Humidity:</strong> {weather.main.humidity}%</div>
          <div><strong>Visibility:</strong> {(weather.visibility / 1000).toFixed(1)}km</div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Wind size={16} />
            <span>{weather.wind.speed}m/s {weather.wind.deg} Degree</span>
          </div>
          <div><strong>Sunrise:</strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
          <div><strong>Sunset:</strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </div>
    </div>
  );
}

function DetailedView({ weather, onBack }) {
  const Icon = getWeatherIcon(weather.weather[0].main);
  const temp = Math.round(weather.main.temp - 273.15);
  const tempMin = Math.round(weather.main.temp_min - 273.15);
  const tempMax = Math.round(weather.main.temp_max - 273.15);
  
  // Get current date and time
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <img src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png" alt="Weather" className="w-12 h-12 mr-3" />
          <h1 className="text-white text-3xl font-bold">Weather App</h1>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-t-lg p-8 relative">
          <button onClick={onBack} className="absolute top-4 left-4 text-white hover:bg-white/20 rounded-full p-2">
            <ArrowLeft size={24} />
          </button>

          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-2">{weather.name}</h2>
            <p className="text-lg opacity-90 mb-8">{timeString}, {dateString}</p>

            <div className="flex items-center justify-center gap-12">
              <div className="flex flex-col items-center">
                <Icon size={80} className="mb-4" />
                <span className="text-2xl">{weather.weather[0].description}</span>
              </div>
              
              <div className="border-l-2 border-white/30 h-32"></div>
              
              <div className="text-left">
                <div className="text-7xl font-bold mb-2">{temp}°C</div>
                <div className="text-xl">
                  Temp Min: {tempMin}°c<br/>
                  Temp Max: {tempMax}°c
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-b-lg p-8 text-white">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="mb-4">
                <div className="font-semibold">Pressure:</div>
                <div className="text-xl">{weather.main.pressure}hPa</div>
              </div>
              <div>
                <div className="font-semibold">Humidity:</div>
                <div className="text-xl">{weather.main.humidity}%</div>
              </div>
              <div className="mt-4">
                <div className="font-semibold">Visibility:</div>
                <div className="text-xl">{(weather.visibility / 1000).toFixed(1)}km</div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-x border-gray-700">
              <Wind size={48} className="mb-2" />
              <div className="text-2xl font-bold">{weather.wind.speed}m/s {weather.wind.deg} Degree</div>
            </div>

            <div>
              <div className="mb-4">
                <div className="font-semibold">Sunrise:</div>
                <div className="text-xl">{new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <div>
                <div className="font-semibold">Sunset:</div>
                <div className="text-xl">{new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 mt-8">
          2021 Fidenz Technologies
        </div>
      </div>
    </div>
  );
}

function WeatherApp() {
  const { logout, user } = useAuth0();
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/weather`);
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (selectedCity) {
    return <DetailedView weather={selectedCity} onBack={() => setSelectedCity(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png" alt="Weather" className="w-12 h-12 mr-3" />
            <h1 className="text-white text-3xl font-bold">Weather App</h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 text-white">
                <User size={20} />
                <span>{user.name || user.email}</span>
              </div>
            )}
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Enter a city"
            className="bg-gray-800 text-white px-6 py-3 rounded-l-lg w-96 focus:outline-none"
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-r-lg font-semibold">
            Add City
          </button>
        </div>

        {loading && (
          <div className="text-white text-center text-xl">Loading weather data...</div>
        )}

        {error && (
          <div className="text-red-400 text-center text-xl">Error: {error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {weatherData.map((weather, index) => (
            <WeatherCard
              key={weather.id}
              weather={weather}
              index={index}
              onClick={() => setSelectedCity(weather)}
            />
          ))}
        </div>

        <div className="text-center text-gray-400 mt-8">
          2021 Fidenz Technologies
        </div>
      </div>
    </div>
  );
}

export default App;