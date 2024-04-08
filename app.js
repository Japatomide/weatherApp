// state
let currentCity = "London";
let units = "metric";

// selectors
const city = document.querySelector(".weather__city");
const dateTime = document.querySelector(".weather__datetime");
const weatherForecast = document.querySelector(".weather__forecast");
const weatherTemp = document.querySelector(".weather__temperature");
const weatherIcon = document.querySelector(".weather__icon");
const weatherMinMax = document.querySelector(".weather__minmax");
const weatherRealFeel = document.querySelector(".weather__realfeel");
const weatherHumidity = document.querySelector(".weather__humidity");
const weatherWind = document.querySelector(".weather__wind");
const weatherPressure = document.querySelector(".weather__pressure");
const inputError = document.querySelector(".input__error");

// search
document.querySelector(".weather__search").addEventListener("submit", (e) => {
  let search = document.querySelector(".weather__searchform");

  // prevent default action
  e.preventDefault();
  if (search.value.trim() === "") {
    inputError.innerHTML = "Please input a city";
    setTimeout(function () {
      inputError.style.display = "none";
    }, 5000);
    return;
  }

  // change current city
  currentCity = search.value;
  // get weather forecast
  getWeather();
  // clear form
  search.value = "";
});

// units
document
  .querySelector(".weather__unit__celcius")
  .addEventListener("click", () => {
    if (units !== "metric") {
      // change to metric
      units = "metric";
      // get weather
      getWeather();
    }
  });

document
  .querySelector(".weather__unit__farenheit")
  .addEventListener("click", () => {
    if (units !== "imperial") {
      // change to imperial
      units = "imperial";
      // get weather
      getWeather();
    }
  });

// console.log(weatherHumidity);

// convert country code to name
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}

// convert timeStamp
function convertTimeStamp(timeStamp, timeZone) {
  const convertTimeZone = timeZone / 3600; // convert seconds to hours

  const date = new Date(timeStamp * 1000);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimeZone >= 0 ? "-" : "+"}${Math.abs(
      convertTimeZone
    )}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

// get weather data
function getWeather() {
  const apiKey = "26edbece049084f0176c642580286ddc";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      dateTime.innerHTML = convertTimeStamp(data.dt, data.timezone);
      weatherForecast.innerHTML = `<p>${data.weather[0].main}</p>`;
      weatherTemp.innerHTML = `${data.main.temp.toFixed()}&#176`;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">`;
      weatherMinMax.innerHTML = `<p>Min:${data.main.temp_min.toFixed()}&#176</p><p>Max:${data.main.temp_max.toFixed()}&#176</p>`;
      weatherRealFeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
      weatherHumidity.innerHTML = `${data.main.humidity}%`;
      weatherWind.innerHTML = `${data.wind.speed} ${
        units === "imperial" ? "mph" : "m/s"
      }`;
      weatherPressure.innerHTML = `${data.main.pressure}hPa`;
    });
}

document.body.addEventListener("load", getWeather());
