const key = "8850f11f9ab5ffc3c3cd02191fc2bd07";
var cityMasterData = [];
let stateDropdown = document.getElementById("state");
let cityDropdown = document.getElementById("city");
let displayWeatherCard = document.getElementById("card-temp");
let weatherDataArray = [];

async function fetchData(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  if (response.status === 200) {
    let data = await response.text();
    data = JSON.parse(data);
    return data;
  } else {
    console.log("Error");
  }
}

async function displayWeather(weatherAr) {
  let weather = weatherAr.current;
  displayWeatherCard.innerHTML = "";
  let outputHtml = `<div class="card" style="width:500px">
        <div class="card-body">
          <h4 class="card-title"><b>${weatherAr.location.name}, ${weatherAr.location.region} </b></h4>
          <div class="forecast-container">
            <img
              class="weather-icon"
              src=${weather.weather_icons[0]}
              width="88"
              height="88"
            />
            <div class="temp-container">
              <div class="temp">${weather.temperature}°<span class="after-temp">C</span></div>
              <div class="real-feel">
                RealFeel ${weather.feelslike}°
              </div>
            </div>
            <div class="text-temp">
              ${weather.weather_descriptions[0]}
            </div>
          </div>
          <br />
          <div class="card-text">
            <ul class="list-group">
              <li class="list-group-item">
                Humidity :
                <div class="list-display">
                  ${weather.humidity}%
                </div>
              </li>
              <li class="list-group-item">
                Pressure :
                <div class="list-display">
                  ${weather.pressure} mb
                </div>
              </li>
              <li class="list-group-item">
                Wind Speed :
                <div class="list-display">
                  ${weather.wind_speed} - ${weather.wind_dir} at ${weather.wind_degree}°
                </div>
              </li>
              <li class="list-group-item">
                Time Now :
                <div class="list-display">
                 ${weather.observation_time}°
                </div>
              </li>
              <li class="list-group-item">
                UV Index :
                <div class="list-display">
                  ${weather.uv_index}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>`;
  displayWeatherCard.innerHTML = outputHtml;
}

function dropdownData(element, array) {
  array.forEach((a) => {
    option = document.createElement("option");
    option.text = a;
    option.value = a;
    element.add(option);
  });
}
async function pageLoadData() {
  cityMasterData = await fetchData("./index.json");
  let stateArray = Object.keys(cityMasterData);
  dropdownData(stateDropdown, stateArray);
  dropdownData(cityDropdown, cityMasterData[stateArray[0]]);
  await weatherData(cityMasterData[stateArray[0]][0]);
}

async function stateDropdownSeleted() {
  console.log(stateDropdown.value);
  cityDropdown.innerHTML = "";
  dropdownData(cityDropdown, cityMasterData[stateDropdown.value]);
  await weatherData(cityMasterData[stateDropdown.value][0]);
}

async function weatherData(city) {
  let currentWeatherUrl = `http://api.weatherstack.com/current?access_key=${key}&query=${city}`;
  let ar = await fetchData(currentWeatherUrl);
  await displayWeather(ar);
  console.log(ar);
}
async function cityDropdownSeleted() {
  console.log(cityDropdown.value);
  await weatherData(cityDropdown.value);
}

pageLoadData();
