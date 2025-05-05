// ForecastDisplay.js
import React from 'react';
import PropTypes from 'prop-types';
import ForecastDay from './ForecastDay'; // Import the child component
import './ForecastDisplay.css'; // Styling for the container

const ForecastDisplay = ({ forecastData, units = 'metric' }) => {
  // Handle loading or empty states
  if (!forecastData) {
    return <div className="forecast-container loading">Loading forecast...</div>;
  }
  if (forecastData.length === 0) {
     return <div className="forecast-container empty">No forecast data available.</div>;
  }
  // Ensure we only show up to 7 days, even if API returns more
  var daysToShow = []
  for (var i = 0; i < 5; i++) {
      var j = i * 8
      daysToShow.push(forecastData[j])
    }
    return (
    // Add 'day' or 'night' class here if needed, based on current conditions perhaps
    // Example: <div className={`forecast-container ${isDay ? 'day' : 'night'}`}>
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-days-wrapper">
        {daysToShow.map((day, index) => (
          // Use date as key for stability, fallback to index if date isn't unique (unlikely for forecast)
          <ForecastDay key={index} dayData={day} units={units} />
        ))}
      </div>
    </div>
  );
};

// Define PropTypes for type checking and documentation


export default ForecastDisplay;