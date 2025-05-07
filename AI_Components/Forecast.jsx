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
  const daysToShow = forecastData.slice(0, 7);

  return (
    // Add 'day' or 'night' class here if needed, based on current conditions perhaps
    // Example: <div className={`forecast-container ${isDay ? 'day' : 'night'}`}>
    <div className="forecast-container">
      <h3 className="forecast-title">7-Day Forecast</h3>
      <div className="forecast-days-wrapper">
        {daysToShow.map((day, index) => (
          // Use date as key for stability, fallback to index if date isn't unique (unlikely for forecast)
          <ForecastDay key={day.date || index} dayData={day} units={units} />
        ))}
      </div>
    </div>
  );
};

// Define PropTypes for type checking and documentation
ForecastDisplay.propTypes = {
  forecastData: PropTypes.arrayOf(
    // Reuse the shape defined in ForecastDay's propTypes (or define it explicitly again)
    // For simplicity, we define it again here matching the expected input structure.
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      day: PropTypes.shape({
        maxtemp_c: PropTypes.number.isRequired,
        maxtemp_f: PropTypes.number.isRequired,
        mintemp_c: PropTypes.number.isRequired,
        mintemp_f: PropTypes.number.isRequired,
        condition: PropTypes.shape({
          text: PropTypes.string.isRequired,
          icon: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      // astro: PropTypes.object, // Optional
    })
  ), // Can be null or undefined initially
  units: PropTypes.oneOf(['metric', 'imperial']),
  // isDay: PropTypes.bool, // Optional prop to control day/night theme
};

export default ForecastDisplay;