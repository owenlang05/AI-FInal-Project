import React from 'react';
import PropTypes from 'prop-types';
import './WeatherDisplay.css'; // Import the CSS for styling

const WeatherDisplay = ({ weatherData, units = 'metric' }) => {
  // Handle loading state or missing data
  if (!weatherData) {
    return <div className="weather-display-card loading">Loading weather data...</div>;
  }

  const { city, data } = weatherData;
  //const { condition } = current;

  // Choose units based on prop
  const tempUnit = units === 'imperial' ? '°F' : '°C';
  const speedUnit = units === 'imperial' ? 'mph' : 'kph';
  const displayTemp = weatherData.list[0].main.temp;
  const displayFeelsLike = weatherData.list[0].main.feels_like;
  const displayWindSpeed = weatherData.list[0].wind.speed;

  // Ensure icon URL has protocol (some APIs return //...)
  //const iconUrl = condition.icon.startsWith('http') ? condition.icon : `https:${condition.icon}`;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon.substring(0, 3)}@2x.png`
  // Format the time (optional, relies on localtime if available)


  return (
    <div className={`weather-display-card day`}>
      <div className="location-header">
        <h2>{weatherData.city.name}</h2>
      </div>

      <div className="current-weather-main">
         <div className="temp-icon-wrapper">
            <img
                src={iconUrl}
                className="weather-icon"
            />
            <div className="temperature">
                {displayTemp}{tempUnit}
            </div>
         </div>
         <div className="condition-text"></div>
      </div>

      <div className="weather-details">
        <p>Feels like: {displayFeelsLike}{tempUnit}</p>
       { /*<p>Humidity: {current.humidity}%</p>*/} 
        <p>Wind: {displayWindSpeed} {speedUnit}</p>
      </div>
    </div>
  );
};


export default WeatherDisplay;