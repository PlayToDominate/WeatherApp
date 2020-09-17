import * as ELEMENTS from 'elements.js';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click',searchWeather);

function searchWeather(){
  //console.log('clicked');
  const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
  if(CITY_NAME.length == 0){
    return alert('Please enter a city name');
  }
  alert(CITY_NAME);
}
