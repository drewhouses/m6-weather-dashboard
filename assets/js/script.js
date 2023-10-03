var apiKey = "0a63de479cdec3863df7cb1f13d35a15";
var buttonEl = $(".btn");
var submitFormEl = $("#submit-form");
var historyListEl = $(".history-sidebar");

loadHistory();

submitFormEl.on("submit", function (event) {
  event.preventDefault();
  var cityFormEl = $("#city");

  var city = cityFormEl.val();
  cityFormEl.val("");
  cityToCoordinates(city);
});

historyListEl.on("click", "section", function (event) {
  event.preventDefault();

  cityToCoordinates($(event.target).text());
});

function fetchWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayCurrentWeather(data);
    });
}

function displayCurrentWeather(data) {
    // console.log("in my display current weather");
    // https://openweathermap.org/weather-conditions
  
  var currentWeatherEl = $(".weather-container");
  var currentTemp = data.main.temp;
  var currentHumidity = data.main.humidity;
  var currentHigh = data.main.temp_max;
  var currentLow = data.main.temp_min;

  currentWeatherEl.append(`<section>Current temp: ${currentTemp}</section>`);
  currentWeatherEl.append(`<section>Humidity: ${currentHumidity}</section>`);
  currentWeatherEl.append(`<section>High: ${currentHigh}</section>`);
  currentWeatherEl.append(`<section>Low: ${currentLow}</section>`);
  currentWeatherEl.css('border', 'solid 1px')
}

function displayForecast() {
  // Do the same as displayCurrentWeather just with the forecast data
  // Need to first see how forecast data comes back from API call
  // Then I can determine how to extract and display it

  // Maybe only save the necessary info in an object or an array
  // then use for loop to generate a card for each day?
  // card container will be flexbox, each card can be spread out using
  // justify-content: spacebetween;
  var forecastEl = $(".forecast-container");
}

function cityToCoordinates(city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length === 0) {
        window.alert(
          "The value you entered is not a valid city name. Please retry"
        );
        return;
      }
      var latitutde = data[0].lat;
      var longitude = data[0].lon;
      saveToHistory(city);
      fetchWeather(latitutde, longitude);
    });
}

function saveToHistory(newCity) {
  var cityHistory = JSON.parse(localStorage.getItem("searched-cities"));
  if (cityHistory === null) {
    console.log("It was null");
    localStorage.setItem("searched-cities", JSON.stringify([newCity]));
    cityHistory = JSON.parse(localStorage.getItem("searched-cities"));
  } else if (cityHistory.includes(newCity)) {
    return;
  } else {
    cityHistory.push(newCity);
  }
  // assigning updated array to local storage
  localStorage.setItem("searched-cities", JSON.stringify(cityHistory));
  // creates entry in history list
  historyListEl.append(`<section>${newCity}</section>`);
}

function loadHistory() {
  var cityHistory = JSON.parse(localStorage.getItem("searched-cities"));
  if (cityHistory === null) return;

  for (var i = 0; i < cityHistory.length; i++) {
    historyListEl.append(`<section>${cityHistory[i]}</section>`);
  }
}

// function displayWeather() {}

// function handleFormSubmit(event) {
//   event.preventDefault();
//   var city = cityFormEl.val();
//   cityToCoordinates(city);
// }
