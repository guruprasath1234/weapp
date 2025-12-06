"use client";
import Link from "next/link";
import Script from "next/script";

import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [geoLoading, setGeoLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [isDarkMode, setIsDarkMode] = useState(false);



  const API_KEY = "a58ede03533fc91eae362e91092f17c5";



  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              await fetchWeather(latitude, longitude);
              setGeoLoading(false);
            },
            (error) => {
              handleGeolocationError(error);
              setGeoLoading(false);
            }
          );
        } else {
          throw new Error("Geolocation not supported");
        }
      } catch (err) {
        setError(err.message);
        setGeoLoading(false);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const handleGeolocationError = (error) => {
    const errors = {
      1: "Please enable location access for automatic weather detection.",
      2: "Location information is unavailable.",
      3: "Location request timed out."
    };
    setError(errors[error.code] || "Unable to retrieve your location.");
  };

  const fetchWeather = async (lat, lon, cityName = "") => {
    setLoading(true);
    try {
      const url = cityName
        ? `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === 200) {
        handleSuccessfulFetch(data);
      } else {
        throw new Error(data.message || "Unable to fetch weather data");
      }
    } catch (err) {
      handleFetchError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessfulFetch = (data) => {
    setWeather(data);
    setCity(data.name);
    setQuery("");
    updateSearchHistory(data.name);
    toast.success(`Weather data for ${data.name} loaded!`);
  };

  const updateSearchHistory = (cityName) => {
    const updatedHistory = [
      { city: cityName, timestamp: Date.now() },
      ...history.filter((entry) => entry.city !== cityName)
    ].slice(0, 5);

    setHistory(updatedHistory);
    localStorage.setItem("weatherHistory", JSON.stringify(updatedHistory));
  };

  const handleFetchError = (err) => {
    const errorMessage = err.message.includes("404")
      ? "City not found. Please check the spelling."
      : err.message;
    setError(errorMessage);
    toast.error(errorMessage);
  };

  const toggleUnit = () => {
    setUnit(prev => prev === "metric" ? "imperial" : "metric");
    if (weather) {
      fetchWeather(weather.coord.lat, weather.coord.lon);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem("weatherHistory");
    setHistory([]); // ensure UI updates
    toast.info("Search history cleared");
  };
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  // Update background style calculation
  const getBackgroundStyle = useCallback(() => {
    if (isDarkMode) {
      if (!weather) return "from-gray-800 to-gray-900";
      const temp = weather?.main?.temp;
      if (temp > 30) return "from-gray-800 to-gray-900";
      if (temp > 20) return "from-gray-800 to-gray-900";
      if (temp > 10) return "from-gray-800 to-gray-900";
      return "from-cyan-800 to-blue-900 via-cyan-700";
    } else {
      // Existing light mode logic
      if (!weather) return "from-sky-200 to-blue-400";
      const temp = weather?.main?.temp;
      if (temp > 30) return "from-sky-200 to-blue-400";
      if (temp > 20) return "from-sky-200 to-blue-400";
      if (temp > 10) return "from-sky-300 to-blue-400";
      return "from-cyan-200 to-blue-300 via-cyan-100";
    }
  }, [weather, isDarkMode]);


  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2442937298192234"
        crossOrigin="anonymous"
      />

      <div className={`min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br ${getBackgroundStyle()} transition-all duration-500`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <nav className="w-full max-w-xl mb-6 flex justify-between items-center text-white">
  <h1 className="text-2xl font-bold">🌤️ WeatherApp</h1>
  <div className="flex items-center gap-4">
    <button
      onClick={toggleDarkMode}
      className="text-2xl hover:opacity-80 transition-opacity"
    >
      {isDarkMode ? '🌞' : '🌙'}
    </button>
    <Link
      href="/about"
      className="text-sm font-extrabold hover:text-white/80 transition-colors"
    >
      About
    </Link>
  </div>
</nav>


      <div className="w-full max-w-xl px-4 space-y-6">
        <header className="text-center space-y-2">
          
          <h1 className="text-4xl font-bold text-white drop-shadow-md animate-fade-in-down">
            Weather Dashboard
          </h1>
          <button
            onClick={toggleUnit}
            className="text-sm text-white/90 hover:text-white transition-colors"
          >
            Switch to {unit === "metric" ? "°F" : "°C"}
          </button>
        </header>

        <SearchBar
          query={query}
          setQuery={setQuery}
          fetchWeather={fetchWeather}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          history={history}
          clearHistory={clearHistory}
          loading={loading}
        />

        {error && <ErrorDisplay error={error} />}

        {(loading || geoLoading) ? (
          <LoadingSkeleton />
        ) : weather ? (
          <Link href={{
            pathname: "/details",
            query: { data: JSON.stringify(weather), city, unit }
          }}>
            <WeatherCard weather={weather} city={city} unit={unit} />
          </Link>
        ) : null}
      </div>
    </div>
    </>
  );
}

function SearchBar({ query, setQuery, fetchWeather, showHistory, setShowHistory, history, clearHistory, loading }) {
  return (
    <div className="relative animate-fade-in-up">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
          placeholder="Search city..."
          className="w-full px-6 py-4 rounded-2xl border-0 shadow-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg placeholder-gray-600 dark:placeholder-gray-300 backdrop-blur-sm bg-white/90 dark:bg-gray-700/90 pr-16"
          onKeyPress={(e) => e.key === "Enter" && !loading && fetchWeather(null, null, query)}
        />

        <button
          onClick={() => fetchWeather(null, null, query)}
          disabled={loading}
          className="absolute right-3 top-3 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-transform ${loading ? "animate-spin" : "hover:rotate-12"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {showHistory && history?.length > 0 && (

        <div className="absolute z-10 w-full mt-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-2xl shadow-lg p-4 animate-fade-in-up">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-600">Recent Searches</h3>
            <button
              onMouseDown={(e) => {
                e.preventDefault(); // prevent input blur from firing first
                clearHistory();
              }}
              className="text-xs text-red-500 hover:text-red-600 transition-colors"
            >
              Clear All
            </button>

          </div>
          <div className="space-y-2">
            {history.map((entry, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(entry.city);
                  setTimeout(() => fetchWeather(null, null, entry.city), 0);
                }}

className="w-full px-4 py-2 text-left text-white hover:bg-gray-100 hover:text-blue-600 rounded-xl transition-colors flex justify-between items-center"
              >
                <span>{entry.city}</span>
                <span className="text-xs text-gray-400">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WeatherCard({ weather, city, unit }) {
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
            {city}
            <span className="text-lg font-normal text-gray-500">
              ({weather.sys.country})
            </span>
          </h2>
          <p className="text-lg text-gray-500 capitalize mt-1">
            {weather.weather[0].description}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
          className="w-24 h-24 animate-float"
        />
      </div>

      <div className="text-center mb-8 relative">
        <div className="absolute top-0 right-0 text-sm bg-white/80 px-3 py-1 rounded-full shadow">
          {new Date(weather.dt * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </div>
        <p className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
          {Math.round(weather.main.temp)}°{unit === "metric" ? "C" : "F"}
        </p>
        <div className="flex justify-center items-center gap-4 text-gray-500 text-sm">
          <span>Feels like {Math.round(weather.main.feels_like)}°</span>
          <span>Humidity {weather.main.humidity}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <WeatherStat
          icon="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"
          label="Wind Speed"
          value={`${weather.wind.speed} ${unit === "metric" ? "m/s" : "mph"}`}
          description={`Direction: ${weather.wind.deg}°`}
        />
        <WeatherStat
          icon="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          label="Pressure"
          value={`${weather.main.pressure} hPa`}
          description={`Sea Level: ${weather.main.sea_level || "N/A"}`}
        />
        <WeatherStat
          icon="M19 14l-7 7m0 0l-7-7m7 7V3"
          label="Visibility"
          value={`${(weather.visibility / 1000).toFixed(1)} km`}
          description={weather.clouds.all ? `${weather.clouds.all}% Clouds` : ""}
        />
        <WeatherStat
          icon="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
          label="Sun"
          value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { timeStyle: "short" })}
          description={`Sunset: ${new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { timeStyle: "short" })}`}
        />
      </div>
    </div>
  );
}

function WeatherStat({ icon, label, value, description }) {
  return (
    <div className="bg-white/80 p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 group">
      <div className="flex flex-col items-center space-y-2">
        <svg className="h-8 w-8 text-blue-500 group-hover:text-cyan-600 transition-colors"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {description && (
          <p className="text-xs text-gray-400 text-center">{description}</p>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-20 bg-gray-200 rounded mb-8"></div>
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}

function ErrorDisplay({ error }) {
  return (
    <div className="bg-red-100/90 border border-red-300 text-red-700 px-6 py-4 rounded-2xl backdrop-blur-sm flex items-center space-x-3 animate-shake">
      <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>{error}</span>
    </div>
  );
}