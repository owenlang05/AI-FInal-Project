import { useState, useEffect } from 'react'
import WeatherDisplay from './components/day-card/WeatherDisplay'
import ForecastDisplay from './components/ForecastDisplay/ForecastDisplay';
import axios from 'axios';
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('metric'); // 'metric' or 'imperia
  // I know this is included in the project however there is no way to completely obfuscate it once deployed so it will remain in the codebase :)
  const super_secret_key = "8fc3a8429ea9d40174184f8e1a7b4a55"

 // --- MOCK FETCH FUNCTION --- (Replace with your actual API call)
 
  useEffect(()=> {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      })
  }, [])
// --- END MOCK FETCH ---
  useEffect(() => {

    
    if (location) {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${super_secret_key}&units=${units}`)
      .then(response => {
        setWeatherData(response.data);
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
      })
      
    }
  
      
      // Replace mockFetchWeatherData with your actual API call function
    }, [location, units]); // Re-fetch if units change

  const toggleUnits = () => {
     setUnits(prevUnits => prevUnits === 'metric' ? 'imperial' : 'metric');
  }

  return (
    <div>
      <h1>Weather Dashboard</h1>
      {/* Add controls, like a city search input or unit toggle */}
       <button onClick={toggleUnits} style={{margin: '10px', padding: '8px 12px'}}>
          Switch to {units === 'metric' ? 'Fahrenheit' : 'Celsius'}
       </button>

      {/* Render the WeatherDisplay component */}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {/* Pass loading state implicitly via weatherData being null */}
      {/* Or explicitly pass loading prop if WeatherDisplay handles it */}
      <WeatherDisplay weatherData={weatherData} units={units} />

      {/* You could add more components here, like forecast */}
      <ForecastDisplay
          forecastData={weatherData?.list}
          units={units}
          // Pass isDay if ForecastDisplay.css uses .night selector scoped from parent
       />
    </div>
  );
}

export default App
