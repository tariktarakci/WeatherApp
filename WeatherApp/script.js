const apiKey = "343fb2ddae5e1a6be86acf6cd1d9ac9f";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("input-text");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

/*
async function getLatLonFromCity(cityValue){ // lat: lattitude // lon: longtitude
    const geoCodingResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&appid=${apiKey}`);
    const geoCodingData = geoCodingResponse.json();
    
};
*/

async function getWeatherData(cityValue) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  
      const temperature = Math.round(data.main.temp);
  
      const description = data.weather[0].description;
  
      const icon = data.weather[0].icon;
  
      const details = [
        `Feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} m/s`,
      ];
  
      weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
      
      weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

      weatherDataEl.querySelector(".description").textContent = description;
  
      weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");

    } catch (error) {

      weatherDataEl.querySelector(".icon").innerHTML = "";

      weatherDataEl.querySelector(".temperature").textContent = "";

      weatherDataEl.querySelector(".description").textContent = "An error happened, please try again later";
  
      weatherDataEl.querySelector(".details").innerHTML = "";

    }
  };