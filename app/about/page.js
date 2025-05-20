// app/about/page.jsx
export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-sky-200 to-blue-400">
      <div className="max-w-2xl bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-blue-700">About This Weather App</h1>

        <p className="text-gray-700 text-lg">
          This app provides current weather information for any city, using the
          <a
            href="https://openweathermap.org/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-1"
          >
            OpenWeatherMap API
          </a>.
        </p>

        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Get weather by your geolocation or search any city worldwide.</li>
          <li>See details like temperature, humidity, pressure, wind speed, visibility, and more.</li>
          <li>Data is fetched live from the OpenWeather API using your browser&apos;s fetch API.</li>
          <li>Recent searches are stored in your browser&apos;s localStorage for quick access.</li>
        </ul>

        <p className="text-gray-600 text-sm">
          Built with <strong>Next.js 13+</strong>, <strong>React</strong>, <strong>Tailwind CSS</strong>, and <strong>react-toastify</strong>.
        </p>
      </div>
    </div>
  );
}
