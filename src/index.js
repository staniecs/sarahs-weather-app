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
  h1.innerHTML = `${response.data.name} Weather`;

  document.querySelector(
    "#temp"
  ).innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;

  document.querySelector(
    "#condition"
  ).innerHTML = `${response.data.weather[0].main}`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;

  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
}

//search for a city
function searchCity(city) {
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
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

//function showFahrenheit(event) {
// event.preventDefault();
//  let temp = document.querySelector("#temp");
//  temp.innerHTML = `66°`;
//  fahrenheit.innerHTML = `<strong>F</strong>`;
// celcius.innerHTML = `C`;
//}
//let fahrenheit = document.querySelector(
// "#fahrenheit"
//);
//fahrenheit.addEventListener(
//"click",
// showFahrenheit
//);

// function showCelcius(event) {
//   event.preventDefault();
//    let temp = document.querySelector("#temp");
//    temp.innerHTML = `19°`;
//    celcius.innerHTML = `<strong>C</strong>`;
//     fahrenheit.innerHTML = `F`;
//  };

//let celcius = document.querySelector("#celcius");

// celcius.addEventListener(
//   "click",
//   showCelcius
//  );
