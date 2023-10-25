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

  document.querySelector(
    "#temp"
  ).innerHTML = `${Math.round(
    response.data.temperature.current
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
  function showFahrenheit(event) {
    event.preventDefault();
    let temp = document.querySelector("#temp");
    let tempC = `${Math.round(
      response.data.temperature.current
    )}`;

    let tempF = Math.round(tempC * (9 / 5) + 32);
    temp.innerHTML = `${tempF}°`;

    fahrenheit.innerHTML = `<span id = "current-unit">F</span>`;
    celcius.innerHTML = `C`;
  }
  let fahrenheit = document.querySelector(
    "#fahrenheit"
  );
  fahrenheit.addEventListener(
    "click",
    showFahrenheit
  );

  function showCelcius(event) {
    event.preventDefault();
    let temp = document.querySelector("#temp");
    temp.innerHTML = `${Math.round(
      response.data.temperature.current
    )}°`;
    celcius.innerHTML = `<strong>C</strong>`;
    fahrenheit.innerHTML = `F`;
  }

  let celcius =
    document.querySelector("#celcius");

  celcius.addEventListener("click", showCelcius);
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

searchCity("Wroclaw");
