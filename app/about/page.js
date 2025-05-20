import Link from 'next/link';
export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-sky-200 to-blue-400">
      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-xl relative">
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <a 
            href="/" 
            className="flex items-center px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors text-white font-medium"
          >
            <span className="mr-1">←</span> Back
          </a>
        </div>
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="text-5xl font-light text-blue-600 mb-2">☀️</div>
          <h1 className="text-4xl font-bold text-blue-700 tracking-tight">About Our Weather App</h1>
        </div>
        
        <div className="border-l-4 border-blue-400 pl-6 py-2 mb-8">
          <p className="text-gray-700 text-lg font-light leading-relaxed">
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

        {/* Features Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FeatureCard 
            emoji="🌎"
            title="Location Based"
            description="Get weather by your geolocation or search any city worldwide."
          />
          <FeatureCard 
            emoji="🌡️"
            title="Detailed Information"
            description="See temperature, humidity, pressure, wind speed, visibility and more."
          />
          <FeatureCard 
            emoji="⚡"
            title="Live Data"
            description="Data is fetched live from the OpenWeather API using your browser's fetch API."
          />
          <FeatureCard 
            emoji="🔍"
            title="Quick Access"
            description="Recent searches are stored in localStorage for quick access."
          />
        </div>

        {/* Tech Stack */}
        <div className="bg-blue-50 rounded-xl p-6 mb-4">
          <h3 className="text-blue-700 font-medium mb-3">Built With</h3>
          <div className="flex flex-wrap gap-2">
            <TechBadge>Next.js 13+</TechBadge>
            <TechBadge>React</TechBadge>
            <TechBadge>Tailwind CSS</TechBadge>
            <TechBadge>react-toastify</TechBadge>
          </div>
        </div>
        
        <footer className="text-center text-gray-500 text-sm mt-8">
          Experience accurate weather forecasts with our beautiful, intuitive interface
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ emoji, title, description }) {
  return (
    <div className="bg-blue-50/70 p-5 rounded-xl transition-all hover:shadow-md hover:bg-blue-50">
      <div className="flex items-center mb-2">
        <span className="text-xl mr-2">{emoji}</span>
        <h3 className="font-semibold text-blue-700">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TechBadge({ children }) {
  return (
    <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-700 shadow-sm">
      {children}
    </span>
  );
}