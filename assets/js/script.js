var buttonEl = $(".btn");
var cityFormEl = $("#city");
var submitFormEl = $("#submit-form");
var apiKey = "0a63de479cdec3863df7cb1f13d35a15";
var coordinates = [];

submitFormEl.on("submit", function (event) {
  event.preventDefault();

  var city = cityFormEl.val();
  cityToCoordinates(city);
});

function fetchWeather(coords) {
  var lat = coords[0];
  var lon = coords[1];
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function cityToCoordinates(city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      coordinates.push(data[0].lat);
      coordinates.push(data[0].lon);
      fetchWeather(coordinates);
    });
  return coordinates;
}

function displayWeather() {
  
}
