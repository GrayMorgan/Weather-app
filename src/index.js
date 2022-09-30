let farenheit = document.querySelector("#farenheit");
let celcius = document.querySelector("#celcius");

function getTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = document.querySelector("#day");
  currentDay.innerHTML = days[now.getDay()];

  let hours = [
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11"
  ];
  let time = document.querySelector("#time");
  time.innerHTML = hours[now.getHours()] + ":";

  let minute = document.querySelector("#minutes");
  minute.innerHTML = now.getMinutes();

  if (minute.innerHTML < 10) {
    minute.innerHTML = "0" + now.getMinutes();
  }
}

function showCity(event) {
  event.preventDefault();
  let cityEl = document.querySelector("#city-el");
  let searchBar = document.querySelector("#search");
  let city = searchBar.value;
  cityEl.innerHTML = `${city}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2b6fdad0cbd018949c50c70f72250726&units=imperial`;
  axios.get(`${apiUrl}`).then(getTemp);
  getTime();
}

let form = document.querySelector("#form");
let cityEl = document.querySelector("#city-el");
let searchBar = document.querySelector("#search");
let submitbtn = document.querySelector(".submit-btn");
form.addEventListener("submit", showCity);
submitbtn.addEventListener("click", showCity);

function whereYouAre(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2b6fdad0cbd018949c50c70f72250726&units=imperial`;
  axios.get(`${apiUrl}`).then(getTemp);
}

function getTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempEl = document.querySelector("#temp-el");
  tempEl.innerHTML = temperature + "°";
  let conversion = temperature - (32 * 5) / 9;
  let city = document.querySelector("#city-el");
  city.innerHTML = `${response.data.name}`;

  celcius.addEventListener("click", changeToCelcius);
  function changeToCelcius(event) {
    event.preventDefault();
    tempEl.innerHTML = Math.round(conversion) + "°";
  }

  farenheit.addEventListener("click", changeToFarenheit);
  function changeToFarenheit(event) {
    event.preventDefault();
    tempEl.innerHTML = temperature + "°";
  }
}

let current = document.querySelector(".current-btn");
current.addEventListener("click", getCurrent);

function getCurrent() {
  navigator.geolocation.getCurrentPosition(whereYouAre);
  getTime();
}
