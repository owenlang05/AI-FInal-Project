import React from 'react';
import PropTypes from 'prop-types';
import './WeatherDisplay.css'; // Import the CSS for styling

const WeatherDisplay = ({ weatherData, units = 'metric' }) => {
  // Handle loading state or missing data
  if (!weatherData || !weatherData.location || !weatherData.current) {
    return <div className="weather-display-card loading">Loading weather data...</div>;
  }

  const { location, current } = weatherData;
  const { condition } = current;

  // Choose units based on prop
  const tempUnit = units === 'imperial' ? '°F' : '°C';
  const speedUnit = units === 'imperial' ? 'mph' : 'kph';
  const displayTemp = Math.round(units === 'imperial' ? current.temp_f : current.temp_c);
  const displayFeelsLike = Math.round(units === 'imperial' ? current.feelslike_f : current.feelslike_c);
  const displayWindSpeed = Math.round(units === 'imperial' ? current.wind_mph : current.wind_kph);

  // Ensure icon URL has protocol (some APIs return //...)
  const iconUrl = condition.icon.startsWith('http') ? condition.icon : `https:${condition.icon}`;

  // Format the time (optional, relies on localtime if available)
  let localTime = 'Current';
  try {
    if (location.localtime) {
       // Extract time part if full date/time string is provided
       const timeString = location.localtime.split(' ')[1] || location.localtime;
       // Basic time formatting (adjust as needed)
       const [hour, minute] = timeString.split(':');
       const hour12 = parseInt(hour, 10) % 12 || 12; // Convert 24hr to 12hr, handle midnight
       const ampm = parseInt(hour, 10) >= 12 ? 'PM' : 'AM';
       localTime = `${hour12}:${minute} ${ampm}`;
    }
  } catch (e) {
      console.error("Error parsing localtime:", e);
      // Keep default 'Current' time
  }


  return (
    <div className={`weather-display-card ${current.is_day ? 'day' : 'night'}`}>
      <div className="location-header">
        <h2>{location.city}, {location.country}</h2>
        <p className="current-time">{localTime}</p>
      </div>

      <div className="current-weather-main">
         <div className="temp-icon-wrapper">
            <img
                src={iconUrl}
                alt={condition.text}
                className="weather-icon"
            />
            <div className="temperature">
                {displayTemp}{tempUnit}
            </div>
         </div>
         <div className="condition-text">{condition.text}</div>
      </div>

      <div className="weather-details">
        <p>Feels like: {displayFeelsLike}{tempUnit}</p>
        <p>Humidity: {current.humidity}%</p>
        <p>Wind: {displayWindSpeed} {speedUnit}</p>
      </div>
    </div>
  );
};

// Define PropTypes for type checking and documentation
WeatherDisplay.propTypes = {
  weatherData: PropTypes.shape({
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      localtime: PropTypes.string, // Optional but useful
    }),
    current: PropTypes.shape({
      temp_c: PropTypes.number.isRequired,
      temp_f: PropTypes.number.isRequired,
      feelslike_c: PropTypes.number.isRequired,
      feelslike_f: PropTypes.number.isRequired,
      condition: PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        // code: PropTypes.number, // Optional
      }).isRequired,
      humidity: PropTypes.number.isRequired,
      wind_kph: PropTypes.number.isRequired,
      wind_mph: PropTypes.number.isRequired,
      is_day: PropTypes.oneOf([0, 1]), // Optional: 1 for day, 0 for night
    }),
  }),
   units: PropTypes.oneOf(['metric', 'imperial']), // Optional prop to control units
};

export default WeatherDisplay;