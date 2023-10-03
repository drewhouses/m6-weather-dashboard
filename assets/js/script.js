var buttonEl = $(".btn");
var submitFormEl = $("#submit-form");
var historyListEl = $(".history-sidebar");
var apiKey = "0a63de479cdec3863df7cb1f13d35a15";

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
      displayCurrentWeather(data);
    });
}

function displayCurrentWeather(data) {
  console.log("in my display current weather");
  console.log(data);
  var currentTemp = 0;
  var currentHumidity = 0;
  var currentHigh = 0;
  var currentLow = 0;
}
function cityToCoordinates(city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  )
    .then(function (response) {
      console.log("Response to City coordinates: ", response);
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
      console.log("This my city: ", city);
      saveToHistory(city);
      fetchWeather(latitutde, longitude);
    });
}

function saveToHistory(newCity) {
  var cityHistory = JSON.parse(localStorage.getItem("searched-cities"));
  if (cityHistory === null) {
    console.log("It was null");
    localStorage.setItem("searched-cities", JSON.stringify([newCity]));
  } else if (cityHistory.includes(newCity)) {
    //do all of the checks with cityHistory as an array
    return;
  } else {
  }
  cityHistory.push(newCity);
  localStorage.setItem("searched-cities", JSON.stringify(cityHistory));

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
