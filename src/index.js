let now = new Date();
function formatDate(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours().toString();
  let minute = now.getMinutes().toString();

  hour = hour.padStart(2, "0");
  minute = minute.padStart(2, "0");

  let h3 = document.querySelector("h3");
  h3.innerHTML = `${day} ${hour}:${minute}`;
}
formatDate(now);

//show weather in searched city and current location
function showCurrentConditions(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.city} Weather`;

  document.querySelector(
    "#weather-icon"
  ).innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.icon}">`;

  celciusTemperature =
    response.data.temperature.current;

  document.querySelector(
    "#temp"
  ).innerHTML = `${Math.round(
    celciusTemperature
  )}°`;

  document.querySelector(
    "#condition"
  ).innerHTML = `${response.data.condition.description}`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${Math.round(
    response.data.temperature.humidity
  )}%`;

  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
}

//search for a city
function searchCity(city) {
  let apiKey = "b3b36of7f40tfb2fc5ea76728725e80c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(`${apiUrl}`)
    .then(showCurrentConditions);
}
function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector(
    "#change-city"
  ).value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//find current location
function findLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b3b36of7f40tfb2fc5ea76728725e80c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentConditions);
}
function showLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(
    findLocation
  );
}

let locateMeButton =
  document.querySelector("#locate-me");
locateMeButton.addEventListener(
  "click",
  showLocationWeather
);

function showFahrenheit(event) {
  event.preventDefault();
  let tempElement =
    document.querySelector("#temp");

  let tempF = Math.round(
    celciusTemperature * (9 / 5) + 32
  );
  tempElement.innerHTML = `${tempF}°`;

  fahrenheitLink.classList.add("active-unit");
  celciusLink.classList.remove("active-unit");
}

function showCelcius(event) {
  event.preventDefault();
  let tempElement =
    document.querySelector("#temp");
  tempElement.innerHTML = `${Math.round(
    celciusTemperature
  )}°`;
  celciusLink.classList.add("active-unit");
  fahrenheitLink.classList.remove("active-unit");
}
let fahrenheitLink = document.querySelector(
  "#fahrenheit"
);
fahrenheitLink.addEventListener(
  "click",
  showFahrenheit
);
let celciusLink =
  document.querySelector("#celcius");

celciusLink.addEventListener(
  "click",
  showCelcius
);

let celciusTemperature = null;

searchCity("Wroclaw");
