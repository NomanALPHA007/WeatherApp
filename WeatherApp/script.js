const apiKey = "22e57013c4953e44e4af92268a024a82"; // Replace with your OpenWeatherMap API key

document.getElementById("searchBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value;
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        document.getElementById(
          "weatherInfo"
        ).innerHTML = `<div class="alert alert-danger">City not found</div>`;
      }
    })
    .catch((error) => {
      document.getElementById(
        "weatherInfo"
      ).innerHTML = `<div class="alert alert-danger">Error fetching data</div>`;
    });
}

function displayWeather(data) {
  const weatherInfo = `
        <h2 class="text-center">${data.name}, ${data.sys.country}</h2>
        <div class="text-center">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
            <h3>${data.main.temp}°C</h3>
            <p>${data.weather[0].description}</p>
        </div>
        <ul class="list-group">
            <li class="list-group-item">Humidity: ${data.main.humidity}%</li>
            <li class="list-group-item">Pressure: ${data.main.pressure} hPa</li>
            <li class="list-group-item">Wind: ${data.wind.speed} m/s</li>
        </ul>
    `;
  document.getElementById("weatherInfo").innerHTML = weatherInfo;
}
