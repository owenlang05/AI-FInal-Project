// ForecastDay.js
import React from 'react';
import PropTypes from 'prop-types';
import './ForecastDay.css'; // Styling for this specific component

const ForecastDay = ({ dayData, units = 'metric' }) => {
  if (!dayData) {
    return <div className="forecast-day-card error">Data missing</div>;
  }
 const {main} = dayData

  // --- Date Formatting ---
  const getDayName = (dateString) => {
    // Create date object assuming UTC date from API to avoid timezone shifts
    // Splitting ensures we only take the date part if time is included
    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) return 'Invalid Date'; // Basic validation

    // Constructing as UTC avoids local timezone interpretation affecting the day
    const dateObj = new Date(Date.UTC(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2])));


    // Check if today or tomorrow relative to current time
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Compare using UTC dates

    const tomorrow = new Date(today);
    tomorrow.setUTCDate(today.getUTCDate() + 1);

    if (dateObj.getTime() === today.getTime()) return 'Today';
    if (dateObj.getTime() === tomorrow.getTime()) return 'Tomorrow';

    // Return short day name (e.g., "Thu")
    return dateObj.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
  };

  const dayName = getDayName(dayData.dt_txt);

  // --- Units Handling ---
  const tempUnit = units === 'imperial' ? '°F' : '°C';
  const displayMaxTemp = main.temp_max;
  const displayMinTemp = main.temp_min;

  // --- Icon URL Handling ---
  const iconUrl = `https://openweathermap.org/img/wn/${dayData.weather[0].icon.substring(0, 2)}d@2x.png`;

  return (
    <div className="forecast-day-card">
      <p className="day-name">{dayName}</p>
      <img
        src={iconUrl}
        className="forecast-icon"
      />
      <div className="temp-range">
        <span className="temp-max">{displayMaxTemp}{tempUnit}</span>
        <span className="temp-min">{displayMinTemp}{tempUnit}</span>
      </div>
    </div>
  );
};


export default ForecastDay;