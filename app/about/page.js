import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            ← Back
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">About Our Weather App</h1>
        </div>

        <div className="mb-8">
          <p className="text-gray-700">
            This app provides current weather information for any city globally, powered by the
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              OpenWeatherMap API
            </a>
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Features</h2>
          <ul className="list-disc pl-5 space-y-2  text-blue-700 mb-4">
            <li>Get weather by your location or search any city</li>
            <li>View temperature, humidity, wind speed and more</li>
            <li>Live data from OpenWeather API</li>
            <li>Recent searches stored for quick access</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="text-blue-700 font-medium mb-2">Built With</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white px-3 py-1 rounded-full text-sm text-blue-700">Next.js</span>
            <span className="bg-white px-3 py-1 rounded-full text-sm text-blue-700">React</span>
            <span className="bg-white px-3 py-1 rounded-full text-sm text-blue-700">Tailwind CSS</span>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm">
          Simple weather app with accurate forecasts
        </footer>
      </div>
    </div>
  );
}