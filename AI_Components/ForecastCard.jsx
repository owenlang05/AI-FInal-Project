// ForecastDay.js
import React from 'react';
import PropTypes from 'prop-types';
import './ForecastDay.css'; // Styling for this specific component

const ForecastDay = ({ dayData, units = 'metric' }) => {
  if (!dayData || !dayData.day) {
    return <div className="forecast-day-card error">Data missing</div>;
  }

  const { date, day } = dayData;
  const { condition } = day;

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

  const dayName = getDayName(date);

  // --- Units Handling ---
  const tempUnit = units === 'imperial' ? '°F' : '°C';
  const displayMaxTemp = Math.round(units === 'imperial' ? day.maxtemp_f : day.maxtemp_c);
  const displayMinTemp = Math.round(units === 'imperial' ? day.mintemp_f : day.mintemp_c);

  // --- Icon URL Handling ---
  const iconUrl = condition.icon.startsWith('http') ? condition.icon : `https:${condition.icon}`;

  return (
    <div className="forecast-day-card">
      <p className="day-name">{dayName}</p>
      <img
        src={iconUrl}
        alt={condition.text}
        className="forecast-icon"
        title={condition.text} // Tooltip showing condition text
      />
      <div className="temp-range">
        <span className="temp-max">{displayMaxTemp}{tempUnit}</span>
        <span className="temp-min">{displayMinTemp}{tempUnit}</span>
      </div>
    </div>
  );
};

ForecastDay.propTypes = {
  dayData: PropTypes.shape({
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
  }).isRequired,
  units: PropTypes.oneOf(['metric', 'imperial']),
};

export default ForecastDay;