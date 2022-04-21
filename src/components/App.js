import React, { useState } from 'react';

const api = {
  key: "97450dad334571b26a98d9a66c84565a",
  website: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [zipInput, setZipInput] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.website}weather?zip=${zipInput}&units=imperial&appid=${api.key}`)
       .then((res) => res.json())
       .then((result) => {
         setWeather(result);
         setZipInput('');
       })
  }

  const dateBuilder = (d) => {
    d = new Date();
    return (
      d.toDateString(),
      d.toTimeString()
    ); 
  };

  return (
    <div className="App">
      <main>
        <h1 className="title swirl-in-fwd">WEATHER MACHINE</h1>
        <div className="search">
        <input type="text" className="searchbar" placeholder="Enter Zipcode for weather data" onChange={(e) => setZipInput(e.target.value)}
        value={zipInput} onKeyPress={search} />
          <button><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>
          </button>
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="forecast dummytext">
            <h2 className="today">Today's Forecast</h2>
            <h3 className="location">{weather.name}</h3>
            <h1 className="temp">{Math.round(weather.main.temp)}°F</h1>
            <div className="flex">
              <h3 className="conditions">{weather.weather[0].description}</h3>
              <img className="icon" src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt="Weather Icon" />
            </div>
            <div className="humidity">Humidity: {weather.main.humidity}%</div>
            <div className="hi-temp">High: {Math.round(weather.main.temp_max)}°F</div>
            <div className="low-temp">Low: {Math.round(weather.main.temp_min)}°F</div>
            <div className="feels-like">Feels Like: {Math.round(weather.main.feels_like)}°F</div>
            <div className="wind">{weather.wind.speed} MPH</div>
            <h3 className="time">{dateBuilder()}</h3>
            </div>
          </div>
        ) : ("")
        }
      </main>
    </div>
	);
}
}

export default App;