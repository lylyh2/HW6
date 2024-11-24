const apiKey = "b1b15e88fa797225412429c1c50c122a1"; //OpenWeatherMap API key

// Function to display the weather data
function displayWeather(response) {
  // Display city
  const cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;

  // Display temperature
  const temperatureElement = document.querySelector("#current-temperature");
  const temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature} °C`;

  // Display weather description
  const weatherDescriptionElement = document.querySelector("#weather-description");
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;

  // Display wind speed
  const windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} km/h`;

  // Display humidity
  const humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

  // Display weather icon
  const weatherIconElement = document.querySelector("#weather-icon");
  const iconUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
  weatherIconElement.setAttribute("src", iconUrl);
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}

// Function to fetch weather data based on search input
function search(event) {
  event.preventDefault();
  const city = document.querySelector("#search-input").value.trim();

  if (!city) {
    alert("Please enter a valid city name.");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather).catch(() => alert("City not found! Please try again."));
}

// Event listener for search form submission
document.querySelector("#search-form").addEventListener("submit", search);
