import * as ELEMENTS from 'elements.js';
import { Http } from 'http.js';
import { WeatherData, WEATHER_PROXY_HANDLER } from 'weather-data.js';

// none of these would work as exports from  element.js, so screw it.
const ELEMENT_LOADING_TEXT = document.querySelector('#load');
const ELEMENT_WEATHER_BOX = document.querySelector('#weather');
const ELEMENT_WEATHER_CITY = document.querySelector('#weatherCity');
const ELEMENT_WEATHER_DESC = document.querySelector('#weatherDescription');
const ELEMENT_WEATHER_TEMP = document.querySelector('#weatherTemperature');

const APP_ID='221637479bdf9720e9ee91f941c2c9cd';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click',searchWeather);

function searchWeather(){
  const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
  if(CITY_NAME.length == 0){
    return alert('Please enter a city name');
  }
  ELEMENT_LOADING_TEXT.style.display = 'block';
  ELEMENT_WEATHER_BOX.style.display = 'block';
  const URL = 'https://api.openweathermap.org/data/2.5/weather?q='+CITY_NAME+'&units=metric&appid='+APP_ID;
  Http.fetchData(URL).then(responseData => {
    const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
    const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
    WEATHER_PROXY.temperature = responseData.main.temp;
    updateWeather(WEATHER_PROXY);
  }).catch(error => alert(error));
}

function updateWeather(weatherData){
  /*
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
  */
  ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENT_WEATHER_DESC.textContent = weatherData.description;
  ELEMENT_WEATHER_TEMP.textContent = weatherData.temperature;

  ELEMENT_LOADING_TEXT.style.display = 'none';
  ELEMENT_WEATHER_BOX.style.display = 'block';
}
