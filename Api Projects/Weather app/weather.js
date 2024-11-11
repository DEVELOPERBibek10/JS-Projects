let query;
let url;

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const units = "metric";
const appId = "d6d6106414099054cc6aea4895fc67a6";

const weather = document.querySelector(".weather");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function updateQuery(city) {
  query = city;
  url = `${baseUrl}?q=${query}&units=${units}&appid=${appId}`;
}

async function checkWeather() {
  const response = await fetch(url);
  let data = await response.json();
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "rain.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "mist.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src = "drizzle.png";
  }
  weather.style.display = "block";
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value === "") {
    weather.style.display = "none";
    return;
  }
  updateQuery(searchBox.value);
  checkWeather(searchBox.value);
});
