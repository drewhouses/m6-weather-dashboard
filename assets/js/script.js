var buttonEl = $(".btn");
var cityFormEl = $("#city");
var submitFormEl = $("#submit-form");

submitFormEl.on("submit", function (event) {
  event.preventDefault();

  var city = cityFormEl.val();
  console.log(`${city} is the city \nSubmitted`);
  cityToCoordinates(city);
});

// function fetchWeather() {
//   fetch();
// }

function cityToCoordinates(city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

//
