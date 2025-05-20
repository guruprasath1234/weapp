# 🌦️ Next.js Weather App

A modern weather application built with Next.js that provides real-time weather forecasts.

---

## Features

### 🌤️ Weather Features
- Real-time weather data for any location
- Current conditions display
- 5-day forecast
- Temperature unit toggle (Celsius/Fahrenheit)

### 🛠️ Technical Features
- Built with Next.js 14 (App Router)
- Server-side rendering
- Responsive Tailwind CSS design
- Optimized Geist fonts
- Fast refresh development

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm v9+

---

## 🔄 Project Flow

### 🧩 Component Flow

```mermaid
flowchart LR
    App --> Layout
    Layout --> Header
    Layout --> Main
    Main --> LocationInput
    Main --> WeatherDisplay
    WeatherDisplay --> CurrentWeather
    WeatherDisplay --> Forecast
    WeatherDisplay --> UnitToggle
    Main --> Footer
