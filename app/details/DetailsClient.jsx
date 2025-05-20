'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiArrowLeft, FiRefreshCw, FiSunrise, FiSunset, FiWind,
  FiThermometer, FiCloud, FiMapPin
} from "react-icons/fi";
import { WiBarometer, WiHumidity } from "react-icons/wi";

export default function DetailsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const weatherData = searchParams.get("data");
  const city = searchParams.get("city");
  const unit = searchParams.get("unit");

  const [weather, setWeather] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (weatherData) {
      setWeather(JSON.parse(weatherData));
    }
  }, [weatherData]);

  const getTemperatureStyle = (temp) => {
    if (temp > 30) return "from-gray-800 to-gray-900";
    if (temp > 20) return "from-gray-800 to-gray-900";
    if (temp > 10) return "from-gray-800 to-gray-900";
    return "from-gray-800 to-gray-900";
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1500);
  };

  if (!weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/30 rounded w-48 mb-6"></div>
          <div className="bg-white/90 rounded-xl shadow p-6 space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200/30 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 bg-gradient-to-br ${getTemperatureStyle(weather.main.temp)} transition-all duration-500`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
          >
            <FiArrowLeft className="text-2xl" />
            <span className="font-semibold">Back</span>
          </button>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`flex items-center gap-2 text-white ${isRefreshing ? "animate-spin" : "hover:text-white/80"} transition-colors`}
          >
            <FiRefreshCw className="text-xl" />
          </button>
        </div>

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-md mb-2">
            {city}
            <FiMapPin className="inline-block ml-2 text-2xl" />
          </h1>
          <p className="text-white/90 text-lg">
            {new Date(weather.dt * 1000).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WeatherCard
            icon={<FiThermometer className="text-4xl text-blue-500" />}
            title="Temperature"
            value={`${Math.round(weather.main.temp)}°${unit === "metric" ? "C" : "F"}`}
            details={[
              `Feels like ${Math.round(weather.main.feels_like)}°`,
              `Min: ${Math.round(weather.main.temp_min)}°`,
              `Max: ${Math.round(weather.main.temp_max)}°`
            ]}
          />

          <WeatherCard
            icon={<FiWind className="text-4xl text-green-500" />}
            title="Wind"
            value={`${weather.wind.speed} ${unit === "metric" ? "m/s" : "mph"}`}
            details={[
              `Direction: ${weather.wind.deg}°`,
              `Gusts: ${weather.wind.gust || 'N/A'}`
            ]}
          />

          <WeatherCard
            icon={<WiHumidity className="text-4xl text-cyan-500" />}
            title="Humidity"
            value={`${weather.main.humidity}%`}
            details={[
              `Dew Point: ${weather.main.dew_point || 'N/A'}`
            ]}
          />

          <WeatherCard
            icon={<WiBarometer className="text-4xl text-purple-500" />}
            title="Pressure"
            value={`${weather.main.pressure} hPa`}
            details={[
              `Sea Level: ${weather.main.sea_level || 'N/A'}`
            ]}
          />

          <WeatherCard
            icon={<FiSunrise className="text-4xl text-orange-400" />}
            title="Sunrise & Sunset"
            value={(
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FiSunrise />
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: 'short' })}
                </div>
                <div className="flex items-center gap-2">
                  <FiSunset />
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: 'short' })}
                </div>
              </div>
            )}
            details={[]}
          />

          <WeatherCard
            icon={<FiCloud className="text-4xl text-gray-500" />}
            title="Atmosphere"
            value={`${(weather.visibility / 1000).toFixed(1)} km`}
            details={[
              `Cloudiness: ${weather.clouds.all}%`,
              weather.rain ? `Rain: ${weather.rain["1h"]}mm` : null,
              weather.snow ? `Snow: ${weather.snow["1h"]}mm` : null
            ].filter(Boolean)}
          />
        </div>

        <footer className="mt-8 text-center text-white/80 text-sm">
          <p>Last updated: {lastUpdated.toLocaleTimeString()}</p>
          <p className="mt-2">Coordinates: {weather.coord.lat.toFixed(2)}, {weather.coord.lon.toFixed(2)}</p>
        </footer>
      </div>
    </div>
  );
}

function WeatherCard({ icon, title, value, details = [] }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-white rounded-lg shadow">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <div className="text-3xl font-bold text-gray-800">{value}</div>
        </div>
      </div>
      {details.length > 0 && (
        <div className="space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="flex justify-between text-sm text-gray-600">
              <span>{detail}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
